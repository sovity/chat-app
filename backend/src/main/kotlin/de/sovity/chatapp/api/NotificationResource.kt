package de.sovity.chatapp.api

import de.sovity.chatapp.api.model.MessageNotificationDto
import de.sovity.chatapp.api.model.edc.EdcEventContractNegotiationFinalized
import de.sovity.chatapp.api.model.edc.EdcEventContractNegotiationTerminated
import de.sovity.chatapp.api.model.edc.EdcEventTransferProcessStarted
import de.sovity.chatapp.api.model.edc.EdcEventWrapper
import de.sovity.chatapp.services.EventService
import de.sovity.chatapp.services.MessageService
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.HeaderParam
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.core.MediaType

@Path("api/notifications")
class NotificationResource(
    private val eventService: EventService,
    private val messageService: MessageService,
) {
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("receive-message")
    fun onReceiveMessage(
        @HeaderParam("Edc-Bpn") edcBpn: String,
        notification: MessageNotificationDto
    ) {
        messageService.onMessageReceived(edcBpn, notification)
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("negotiation-finalized")
    fun onNegotiationFinalized(
        event: EdcEventWrapper<EdcEventContractNegotiationFinalized>
    ) {
        eventService.onContractNegotiationFinalized(event.payload)
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("negotiation-terminated")
    fun onNegotiationTerminated(
        event: EdcEventWrapper<EdcEventContractNegotiationTerminated>
    ) {
        eventService.onContractNegotiationTerminated(event.payload)
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("transfer-started")
    fun onTransferStarted(
        event: EdcEventWrapper<EdcEventTransferProcessStarted>
    ) {
        eventService.onTransferStarted(event.payload)
    }
}
