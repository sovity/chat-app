package de.sovity.chatapp.api.model

import java.time.OffsetDateTime

data class CounterpartyDto(
    val participantId: String,
    val connectorEndpoint: String,
    val status: ConnectionStatusDto,
    val lastUpdate: OffsetDateTime
)
