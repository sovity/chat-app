package de.sovity.chatapp.model

data class MessageDto(
    val uuid: String,
    val createdAt: String,
    val message: String,
    val messageDirection: MessageDirectionDto,
    val status: MessageStatusDto
)
