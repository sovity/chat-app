package de.sovity.chatapp.api

import de.sovity.chatapp.model.ConnectorCreateDto
import de.sovity.chatapp.model.ConnectorDto
import de.sovity.chatapp.model.NotificationDto
import jakarta.ws.rs.GET
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.QueryParam

@Path("/ui")
class UiResource {
    @GET
    @Path("/connectors")
    fun getConnectors(): List<ConnectorDto> {
        TODO("Implementation")
    }

    @POST
    @Path("/connectors")
    fun createConnector(request: ConnectorCreateDto): ConnectorDto {
        TODO("Implementation")
    }

    @GET
    @Path("/connectors/{connectorId}/messages")
    fun getAllMessages(@QueryParam("connectorId") connectorId: String) {
        TODO("Implementation")
    }

    @POST
    @Path("/connectors/{connectorId}/messages")
    fun sendMessage(@QueryParam("connectorId") connectorId: String) {
        TODO("Implementation")
    }

    @POST
    @Path("/notification/receive")
    fun receiveNotification(notification: NotificationDto3) {
        TODO("Implementation")
    }

    @GET
    @Path("/connectors/{connectorId}/messages/unread")
    fun getAllUnreadMessages(@QueryParam("connectorId") connectorId: String) {
        TODO("Implementation")
    }
}
