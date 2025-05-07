package de.sovity.chatapp

import de.sovity.chatapp.services.edc.EdcService
import de.sovity.chatapp.services.persistence.CounterpartyStore
import io.quarkus.runtime.StartupEvent
import jakarta.enterprise.context.ApplicationScoped
import jakarta.enterprise.event.Observes

@ApplicationScoped
class ChatApplication(
    private val edcService: EdcService,
    private val counterpartyStore: CounterpartyStore
) {

    fun onStartupRecoverCounterparties(
        @Observes startupEvent: StartupEvent
    ) {
        // Recreate asset correctly
        edcService.configureAsset()

        // Recover existing contracts
        // edcService.queryActiveContracts().forEach {
        //     counterpartyStore.create(
        //         CounterpartyDbRow(
        //             participantId = it.participantId,
        //             connectorEndpoint = it.connectorEndpoint,
        //             status = ConnectionStatusDto.ONLINE,
        //             lastUpdate = OffsetDateTime.now(),
        //             contractNegotiationId = it.contractNegotiationId,
        //             contractAgreementId = it.contractAgreementId,
        //             transferProcessId = it.transferProcessId,
        //             edr = null
        //         )
        //     )
        // }
    }
}
