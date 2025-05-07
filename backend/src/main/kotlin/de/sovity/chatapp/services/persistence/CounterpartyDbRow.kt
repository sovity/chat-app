package de.sovity.chatapp.services.persistence

import de.sovity.chatapp.api.model.ConnectionStatusDto
import de.sovity.edc.client.gen.model.EdrDto
import java.time.OffsetDateTime

data class CounterpartyDbRow(
    val participantId: String,
    val connectorEndpoint: String,
    val status: ConnectionStatusDto,
    val lastUpdate: OffsetDateTime,
    val contractNegotiationId: String?,
    val contractAgreementId: String?,
    val transferProcessId: String?,
    val edr: EdrDto?
)
