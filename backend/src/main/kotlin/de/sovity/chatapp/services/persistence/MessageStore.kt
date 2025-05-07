package de.sovity.chatapp.services.persistence

import jakarta.enterprise.context.ApplicationScoped

@ApplicationScoped
class MessageStore {
    /**
     * In-Memory store is sufficient for this demo
     */
    private val messages = mutableMapOf<String, MutableList<MessageDbRow>>()

    fun findByParticipantId(participantId: String): List<MessageDbRow> =
        messages[participantId]?.toList() ?: emptyList()

    fun create(
        message: MessageDbRow
    ) {
        messages.computeIfAbsent(message.participantId) { mutableListOf() }
            .add(message)
    }

    fun update(
        participantId: String,
        messageId: String,
        updateFn: (MessageDbRow) -> MessageDbRow
    ): MessageDbRow {
        val old = findByParticipantId(participantId)
            .firstOrNull { it.messageId == messageId }
            ?: error("Message with ID $messageId not found for participant $participantId")
        messages[participantId]?.remove(old)

        val new = updateFn(old)
        messages[participantId]?.add(new)
        return new
    }
}
