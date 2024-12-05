package de.sovity.chatapp.api

import de.sovity.chatapp.model.ConnectorCreateDto
import de.sovity.chatapp.model.ConnectorDto
import de.sovity.chatapp.model.MessageDto
import de.sovity.chatapp.model.MessageNotificationDto
import de.sovity.chatapp.model.MessageSendDto
import de.sovity.chatapp.service.EdcService
import jakarta.ws.rs.GET
import jakarta.ws.rs.HeaderParam
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.QueryParam

@Path("/")
class ApiResource(
    val edcService: EdcService
) {

    @GET
    @Path("ui/connectors")
    fun getConnectors(): List<ConnectorDto> {
        return edcService.getConnectors()
    }

    @POST
    @Path("ui/connectors")
    fun createConnector(request: ConnectorCreateDto): ConnectorDto {
        return edcService.createConnector(request)
    }

    @GET
    @Path("ui/connectors/{connectorId}/messages")
    fun getAllMessages(@QueryParam("connectorId") connectorId: String): List<MessageDto> {
        return edcService.getMessages(connectorId)
    }

    @POST
    @Path("ui/connectors/{connectorId}/messages")
    fun sendMessage(@QueryParam("connectorId") connectorId: String, message: MessageSendDto): MessageDto {
        return edcService.sendMessage(connectorId, message)
    }

    @POST
    @Path("edc/notifications/receive")
    fun receiveNotification(@HeaderParam("Edc-Bpn") edcBpn: String, notification: MessageNotificationDto) {
        edcService.receiveNotification(edcBpn, notification)
    }
}
