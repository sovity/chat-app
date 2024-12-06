package de.sovity.chatapp.service

import de.sovity.chatapp.model.ConnectorCreateDto
import de.sovity.chatapp.model.ConnectorDto
import de.sovity.chatapp.model.MessageDto
import de.sovity.chatapp.model.MessageNotificationDto
import de.sovity.chatapp.model.MessageSendDto

interface EdcService {
    fun getConnectors(): List<ConnectorDto>
    fun createConnector(dto: ConnectorCreateDto): ConnectorDto
    fun getMessages(connectorId: String): List<MessageDto>
    fun sendMessage(string: String, dto: MessageSendDto): MessageDto
    fun receiveNotification(string: String, dto: MessageNotificationDto)
}
