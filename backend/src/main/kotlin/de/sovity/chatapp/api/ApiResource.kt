package de.sovity.chatapp.api

import de.sovity.chatapp.model.ConnectorCreateDto
import de.sovity.chatapp.model.ConnectorDto
import de.sovity.chatapp.model.NotificationDto
import jakarta.ws.rs.GET
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.QueryParam

@Path("/")
class ApiResource {
    @GET
    @Path("ui/connectors")
    fun getConnectors(): List<ConnectorDto> {
        TODO("Implementation")
    }

    @POST
    @Path("ui/connectors")
    fun createConnector(request: ConnectorCreateDto): ConnectorDto {
        TODO("Implementation")
    }

    @GET
    @Path("ui/connectors/{connectorId}/messages")
    fun getAllMessages(@QueryParam("connectorId") connectorId: String) {
        TODO("Implementation")
    }

    @POST
    @Path("ui/connectors/{connectorId}/messages")
    fun sendMessage(@QueryParam("connectorId") connectorId: String) {
        TODO("Implementation")
    }

    @POST
    @Path("edc/notification/receive")
    fun receiveNotification(notification: NotificationDto3) {
        TODO("Implementation")
    }

    @GET
    @Path("edc/connectors/{connectorId}/messages/unread")
    fun getAllUnreadMessages(@QueryParam("connectorId") connectorId: String) {
        TODO("Implementation")
    }
}
