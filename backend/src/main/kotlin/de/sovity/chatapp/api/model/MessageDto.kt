package de.sovity.chatapp.api.model

import java.time.OffsetDateTime

data class MessageDto(
    val messageId: String,
    val createdAt: OffsetDateTime,
    val message: String,
    val messageDirection: MessageDirectionDto,
    val status: MessageStatusDto
)
