package de.sovity.chatapp.services.edc

import de.sovity.edc.client.EdcClient
import de.sovity.edc.client.EdcClientBuilder
import de.sovity.edc.client.oauth2.OAuth2ClientCredentials
import de.sovity.edc.utils.jsonld.vocab.Prop
import jakarta.enterprise.context.ApplicationScoped
import jakarta.ws.rs.Produces
import org.eclipse.microprofile.config.inject.ConfigProperty

@ApplicationScoped
class EdcClientFactory(
    @ConfigProperty(name = "edc.api.url")
    val managementApiUrl: String,

    @ConfigProperty(name = "edc.api.client-id")
    val clientId: String,

    @ConfigProperty(name = "edc.api.client-secret")
    val clientSecret: String,

    @ConfigProperty(name = "edc.api.auth-server-url")
    val tokenEndpoint: String
) {

    @Produces
    @ApplicationScoped
    fun edcClient(): EdcClient {
        return EdcClient.builder()
            .managementApiUrl(managementApiUrl)
            .oauth2ClientCredentials(
                OAuth2ClientCredentials.builder()
                    .tokenUrl(tokenEndpoint)
                    .clientId(clientId)
                    .clientSecret(clientSecret)
                    .build()
            )
            .build()
    }
}
