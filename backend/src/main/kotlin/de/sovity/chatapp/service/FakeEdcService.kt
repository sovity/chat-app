package de.sovity.chatapp.service

import de.sovity.chatapp.model.ConnectorCreateDto
import de.sovity.chatapp.model.ConnectorDto
import de.sovity.chatapp.model.ConnectorStatusDto
import de.sovity.chatapp.model.MessageDirectionDto
import de.sovity.chatapp.model.MessageDto
import de.sovity.chatapp.model.MessageNotificationDto
import de.sovity.chatapp.model.MessageSendDto
import de.sovity.chatapp.model.MessageStatusDto
import jakarta.enterprise.context.ApplicationScoped
import java.time.ZoneOffset
import java.time.ZonedDateTime
import java.util.UUID

@ApplicationScoped
class FakeEdcService : EdcService {

    val connectors = mutableSetOf<ConnectorDto>()
    val messages = mutableMapOf<String, MutableList<MessageDto>>()

    override fun getConnectors(): List<ConnectorDto> {
        return connectors.toList()
    }

    override fun createConnector(connectorCreateDto: ConnectorCreateDto): ConnectorDto {
        val connector = ConnectorDto(
            UUID.randomUUID().toString(),
            connectorCreateDto.participantId,
            connectorCreateDto.connectorEndpoint,
            ConnectorStatusDto.ONLINE
        )

        connectors.add(connector)

        return connector
    }

    override fun getMessages(connectorId: String): List<MessageDto> {
        return messages[connectorId] ?: listOf()
    }

    override fun sendMessage(
        recievingConnectorId: String,
        messageSendDto: MessageSendDto
    ): MessageDto {
        val message = MessageDto(
            UUID.randomUUID().toString(),
            ZonedDateTime.now(ZoneOffset.UTC).toString(),
            messageSendDto.message,
            MessageDirectionDto.INCOMING,
            MessageStatusDto.OK
        )

        val messages = messages.computeIfAbsent(recievingConnectorId) { mutableListOf() }
        messages.add(message)

        return message
    }

    override fun receiveNotification(edcBpn: String, notification: MessageNotificationDto) {
        TODO("Not yet implemented")
    }
}
