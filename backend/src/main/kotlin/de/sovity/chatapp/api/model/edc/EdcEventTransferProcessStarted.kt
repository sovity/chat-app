package de.sovity.chatapp.api.model.edc

data class EdcEventTransferProcessStarted(
    val transferProcessId: String,
    val contractId: String
)
