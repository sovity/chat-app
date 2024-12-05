package de.sovity.chatapp.services.edc

import io.quarkus.runtime.Startup
import jakarta.enterprise.context.ApplicationScoped

@ApplicationScoped
class EdcSetupService(
    private val edcApiService: EdcApiService
) {

    @Startup
    fun setupNotificationReceiver() {
        edcApiService.createNotificationReceiverAssetIfNotExists()
        edcApiService.createNotificationReceiverDataOfferIfNotExists()
    }
}
