package de.sovity.chatapp.api

import de.sovity.chatapp.api.model.MessageNotificationDto
import de.sovity.edc.client.gen.model.EdrDto
import io.quarkus.rest.client.reactive.QuarkusRestClientBuilder
import jakarta.enterprise.context.ApplicationScoped
import java.net.URI

@ApplicationScoped
class CounterpartyNotificationApiClient {
    fun sendMessage(
        edrDto: EdrDto,
        messageNotificationDto: MessageNotificationDto,
    ) {
        val client = getClientForEdr(edrDto)
        client.onReceiveMessage(
            messageNotificationDto,
            edrDto.authorizationHeaderValue
        )
    }

    private fun getClientForEdr(edrDto: EdrDto): CounterpartyNotificationApi =
        QuarkusRestClientBuilder.newBuilder()
            .baseUri(URI(edrDto.baseUrl))
            .build(CounterpartyNotificationApi::class.java)
}

