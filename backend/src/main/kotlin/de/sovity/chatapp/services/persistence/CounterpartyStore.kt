package de.sovity.chatapp.services.persistence

import jakarta.enterprise.context.ApplicationScoped

@ApplicationScoped
class CounterpartyStore {
    /**
     * In-Memory store is sufficient for this demo
     */
    private val participants = mutableMapOf<String, CounterpartyDbRow>()

    fun findByIdOrNull(participantId: String): CounterpartyDbRow? =
        participants[participantId]

    fun findByIdOrThrow(participantId: String): CounterpartyDbRow =
        findByIdOrNull(participantId) ?: error("Participant with ID $participantId not found")

    fun findByContractAgreementIdOrThrow(contractAgreementId: String): CounterpartyDbRow =
        participants.values.find { it.contractAgreementId == contractAgreementId }
            ?: error("Participant with contract agreement ID $contractAgreementId not found")

    fun findAll(): List<CounterpartyDbRow> =
        participants.values.toList()

    fun create(dto: CounterpartyDbRow) {
        participants[dto.participantId] = dto
    }

    fun update(
        participantId: String,
        updateFn: (CounterpartyDbRow) -> CounterpartyDbRow
    ): CounterpartyDbRow {
        val old = findByIdOrThrow(participantId)
        val new = updateFn(old)
        participants[participantId] = new
        return new
    }
}
