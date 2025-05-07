package de.sovity.chatapp.services

import de.sovity.chatapp.api.model.ConnectionStatusDto
import de.sovity.chatapp.api.model.edc.EdcEventContractNegotiationFinalized
import de.sovity.chatapp.api.model.edc.EdcEventContractNegotiationTerminated
import de.sovity.chatapp.api.model.edc.EdcEventTransferProcessStarted
import de.sovity.chatapp.services.edc.EdcService
import de.sovity.chatapp.services.persistence.CounterpartyStore
import io.quarkus.logging.Log
import jakarta.enterprise.context.ApplicationScoped
import java.time.OffsetDateTime

@ApplicationScoped
class EventService(
    val counterpartyStore: CounterpartyStore,
    val edcService: EdcService
) {
    fun onContractNegotiationTerminated(event: EdcEventContractNegotiationTerminated) {
        Log.info("Contract negotiation terminated for participant ${event.counterPartyId}")
        counterpartyStore.update(event.counterPartyId) {
            it.copy(
                status = ConnectionStatusDto.ERROR,
                lastUpdate = OffsetDateTime.now()
            )
        }
    }

    fun onContractNegotiationFinalized(event: EdcEventContractNegotiationFinalized) {
        Log.info("Contract negotiation finalized for participant ${event.counterPartyId}, agreement ID ${event.contractAgreement.id}. Starting transfer.")

        // Update Contract Agreement ID
        counterpartyStore.update(event.counterPartyId) {
            it.copy(
                contractAgreementId = event.contractAgreement.id,
                lastUpdate = OffsetDateTime.now()
            )
        }

        // Initiate transfer process
        try {
            edcService.initiateTransfer(event.counterPartyId)
        } catch (e: Exception) {
            Log.error("Failed to initiate transfer for participant ${event.counterPartyId}", e)
            counterpartyStore.update(event.counterPartyId) {
                it.copy(
                    status = ConnectionStatusDto.ERROR,
                    lastUpdate = OffsetDateTime.now()
                )
            }
        }
    }

    fun onTransferStarted(event: EdcEventTransferProcessStarted) {
        Log.info("Transfer process started event received for transfer ${event.transferProcessId}")
        val counterpartyId = counterpartyStore.findByContractAgreementIdOrThrow(event.contractId).participantId

        // Use Transfer Process, Mark Connection as online
        counterpartyStore.update(counterpartyId) {
            it.copy(
                status = ConnectionStatusDto.ONLINE,
                transferProcessId = event.transferProcessId,
                lastUpdate = OffsetDateTime.now()
            )
        }
    }
}
