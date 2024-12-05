package de.sovity.chatapp.model

data class MessageNotificationDto(
    val returnAssetId: String,
    val returnConnectorEndpoint: String,
    val returnParticipantId: String,
    val message: String
)
