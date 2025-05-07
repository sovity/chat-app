package de.sovity.chatapp.api.model

data class MessageNotificationDto(
    val message: String,
    val senderConnectorEndpoint: String
)
