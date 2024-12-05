package de.sovity.chatapp.api

import de.sovity.chatapp.model.ConnectorCreateDto
import de.sovity.chatapp.model.ConnectorDto
import jakarta.ws.rs.GET
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.QueryParam

@Path("/ui")
class Ui {
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
}
