package de.sovity.chatapp.api.model.edc

data class EdcEventContractNegotiationFinalized(
    val contractNegotiationId: String,
    val counterPartyId: String,
    val counterPartyAddress: String,
    val contractAgreement: EdcEventContractAgreement
)
