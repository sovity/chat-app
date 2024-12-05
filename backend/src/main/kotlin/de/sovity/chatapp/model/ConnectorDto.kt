package de.sovity.chatapp.model

data class ConnectorDto(
    val uuid: String,
    val participantId: String,
    val connectorEndpoint: String,
    val status: ConnectorStatusDto
)
