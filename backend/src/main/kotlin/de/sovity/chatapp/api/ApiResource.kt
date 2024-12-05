package de.sovity.chatapp.api

import de.sovity.chatapp.model.ConnectorCreateDto
import de.sovity.chatapp.model.ConnectorDto
import de.sovity.chatapp.model.MessageNotificationDto
import jakarta.ws.rs.GET
import jakarta.ws.rs.HeaderParam
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
    @Path("edc/notifications/receive")
    fun receiveNotification(@HeaderParam("Edc-Bpn") edcBpn: String, notification: MessageNotificationDto) {
        TODO("Implementation")
    }
}
