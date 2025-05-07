package de.sovity.chatapp.api

import de.sovity.chatapp.api.model.MessageNotificationDto
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.HeaderParam
import jakarta.ws.rs.POST
import jakarta.ws.rs.core.MediaType

interface CounterpartyNotificationApi {
    /**
     * Will hit [NotificationResource.onReceiveMessage] via EDR
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    fun onReceiveMessage(
        messageNotificationDto: MessageNotificationDto,

        @HeaderParam("Authorization")
        authorizationHeaderValue: String,
    )
}
