package de.sovity.chatapp

import de.sovity.chatapp.services.edc.NotificationReceiverAsset
import io.quarkus.runtime.Startup
import jakarta.enterprise.context.ApplicationScoped

@ApplicationScoped
class AppStartup(
    private val notificationReceiverAsset: NotificationReceiverAsset
) {

    @Startup
    fun setupNotificationReceiver() {
        notificationReceiverAsset.ensureAssetExists()
        notificationReceiverAsset.ensureDataOfferExists()
    }
}
