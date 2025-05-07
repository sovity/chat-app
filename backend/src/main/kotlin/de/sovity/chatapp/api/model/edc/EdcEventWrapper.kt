package de.sovity.chatapp.api.model.edc

data class EdcEventWrapper<T>(
    val payload: T,
)
