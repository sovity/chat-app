package de.sovity.chatapp.services.persistence

import de.sovity.chatapp.api.model.MessageDirectionDto
import de.sovity.chatapp.api.model.MessageStatusDto
import java.time.OffsetDateTime

data class MessageDbRow(
    val messageId: String,
    val participantId: String,
    val createdAt: OffsetDateTime,
    val message: String,
    val messageDirection: MessageDirectionDto,
    val status: MessageStatusDto
)
