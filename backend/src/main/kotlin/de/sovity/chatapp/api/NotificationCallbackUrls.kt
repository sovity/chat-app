package de.sovity.chatapp.api

import jakarta.enterprise.context.ApplicationScoped
import org.eclipse.microprofile.config.inject.ConfigProperty

@ApplicationScoped
class NotificationCallbackUrls(
    @ConfigProperty(name = "chat-app.base-url-for-notification-callbacks")
    private val notificationCallbackBaseUrl: String,
) {
    fun getContractNegotiationFinalizedUrl(): String =
        getNotificationCallbackUrl("negotiation-finalized")

    fun getContractNegotiationTerminatedUrl(): String =
        getNotificationCallbackUrl("negotiation-terminated")

    fun getTransferStartedUrl(): String =
        getNotificationCallbackUrl("transfer-started")

    fun getOnMessageReceivedUrl(): String =
        getNotificationCallbackUrl("receive-message")

    private fun getNotificationCallbackUrl(url: String): String =
        "$notificationCallbackBaseUrl/api/notifications/$url"
}
