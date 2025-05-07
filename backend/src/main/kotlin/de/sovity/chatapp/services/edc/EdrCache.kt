package de.sovity.chatapp.services.edc

import de.sovity.chatapp.services.persistence.CounterpartyStore
import de.sovity.edc.client.EdcClient
import de.sovity.edc.client.gen.model.EdrDto
import io.quarkus.logging.Log
import jakarta.enterprise.context.ApplicationScoped
import java.time.OffsetDateTime

@ApplicationScoped
class EdrCache(
    val counterpartyStore: CounterpartyStore,
    val edcClient: EdcClient
) {
    fun getEdr(participantId: String): EdrDto {
        val counterparty = counterpartyStore.findByIdOrThrow(participantId)
        val transferProcessId = counterparty.transferProcessId
        require(transferProcessId != null) {
            "Participant is not online. No running transfer process for participant $participantId"
        }

        val oldEdr = counterparty.edr
        if (oldEdr != null) {
            val isExpired = oldEdr.expiresAt?.isAfter(OffsetDateTime.now()) ?: false
            if (!isExpired) {
                return oldEdr
            }
        }

        // Re-fetch EDR
        Log.info("Requesting new EDR for $participantId")
        val newEdr = edcClient.useCaseApi().getTransferProcessEdr(transferProcessId)

        // Save EDR for re-use
        Log.info("Got EDR for $participantId: ${newEdr.baseUrl} ${newEdr.authorizationHeaderValue}")
        counterpartyStore.update(participantId) {
            it.copy(edr = newEdr)
        }
        return newEdr
    }
}
