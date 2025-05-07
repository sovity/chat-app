package de.sovity.chatapp.services

import de.sovity.chatapp.api.model.ConnectionStatusDto
import de.sovity.chatapp.api.model.CounterpartyAddDto
import de.sovity.chatapp.api.model.CounterpartyDto
import de.sovity.chatapp.services.edc.EdcService
import de.sovity.chatapp.services.persistence.CounterpartyDbRow
import de.sovity.chatapp.services.persistence.CounterpartyStore
import de.sovity.chatapp.services.persistence.MessageStore
import io.quarkus.logging.Log
import jakarta.enterprise.context.ApplicationScoped
import java.time.OffsetDateTime

@ApplicationScoped
class CounterpartyService(
    val counterpartyStore: CounterpartyStore,
    val edcService: EdcService
) {
    fun listCounterparties(): List<CounterpartyDto> {
        return counterpartyStore.findAll()
            .sortedByDescending { it.lastUpdate }
            .map { buildDto(it) }
    }

    fun remove(participantId: String) {
        TODO("Not yet implemented")
    }

    fun create(dto: CounterpartyAddDto): CounterpartyDto {
        require(counterpartyStore.findByIdOrNull(dto.participantId) == null) {
            "Participant with ID ${dto.participantId} already exists"
        }
        Log.info("Establishing connection with ${dto.participantId}")

        // save participant in-memory
        counterpartyStore.create(
            CounterpartyDbRow(
                participantId = dto.participantId,
                connectorEndpoint = dto.connectorEndpoint,
                status = ConnectionStatusDto.CONNECTING,
                lastUpdate = OffsetDateTime.now(),
                contractNegotiationId = null,
                contractAgreementId = null,
                transferProcessId = null,
                edr = null
            )
        )

        try {
            // connect via EDC
            // callback will continue the connection establishment process
            edcService.negotiateContract(
                participantId = dto.participantId,
                connectorEndpoint = dto.connectorEndpoint,
            )
        } catch (ex: Exception) {
            Log.error("Failed establishing connection", ex)

            // failed to connect
            counterpartyStore.update(dto.participantId) {
                it.copy(
                    status = ConnectionStatusDto.ERROR,
                    lastUpdate = OffsetDateTime.now()
                )
            }
        }

        return buildDto(counterpartyStore.findByIdOrThrow(dto.participantId))
    }

    private fun buildDto(dbRow: CounterpartyDbRow) =
        CounterpartyDto(
            participantId = dbRow.participantId,
            connectorEndpoint = dbRow.connectorEndpoint,
            status = dbRow.status,
            lastUpdate = dbRow.lastUpdate
        )
}
