package de.sovity.chatapp.api

import jakarta.ws.rs.GET
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.QueryParam

@Path("/edc")
class Edc {
    @POST
    @Path("/notification/receive")
    fun receiveNotification(notification: NotificationDto) {
        TODO("Implementation")
    }

    @GET
    @Path("/connectors/{connectorId}/messages/unread")
    fun getAllUnreadMessages(@QueryParam("connectorId") connectorId: String) {
        TODO("Implementation")
    }
}
