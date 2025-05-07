package de.sovity.chatapp.api.model.edc

data class EdcEventContractNegotiationTerminated(
    val contractNegotiationId: String,
    val counterPartyId: String,
    val counterPartyEndpoint: String
)
