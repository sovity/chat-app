package de.sovity.chatapp.model

data class MessageDto(
    val uuid: String,
    val createdAt: String,
    val message: String,
    val username: String,
    val messageDirection: String,
    val status: String
)
