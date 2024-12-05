package de.sovity.chatapp.services.edc

import de.sovity.edc.client.EdcClient
import de.sovity.edc.client.gen.model.ContractDefinitionEntry
import de.sovity.edc.client.gen.model.ContractDefinitionRequest
import de.sovity.edc.client.gen.model.DataSourceType
import de.sovity.edc.client.gen.model.UiAsset
import de.sovity.edc.client.gen.model.UiAssetCreateRequest
import de.sovity.edc.client.gen.model.UiCriterion
import de.sovity.edc.client.gen.model.UiCriterionLiteral
import de.sovity.edc.client.gen.model.UiCriterionLiteralType
import de.sovity.edc.client.gen.model.UiCriterionOperator
import de.sovity.edc.client.gen.model.UiDataSource
import de.sovity.edc.client.gen.model.UiDataSourceHttpData
import de.sovity.edc.client.gen.model.UiDataSourceHttpDataMethod
import jakarta.enterprise.context.ApplicationScoped
import org.eclipse.microprofile.config.inject.ConfigProperty

@ApplicationScoped
class NotificationReceiverAsset(
    private val edcClient: EdcClient,

    @ConfigProperty(name = "chatapp.url")
    private val localUrl: String
) {

    companion object {
        private const val NOTIFICATION_RECEIVER_ASSET_ID = "notification-receiver"
        private const val NOTIFICATION_RECEIVER_ASSET_NAME = "Notification Receiver"
        private const val NOTIFICATION_RECEIVER_ASSET_DESCRIPTION = "Notification Reception Asset"
        private const val NOTIFICATION_RECEIVER_DATA_OFFER_ID = "notification-receiver-data-offer"
        private const val UNRESTRICTED_POLICY_ID = "always-true"
    }

    fun ensureAssetExists() {
        if (getNotificationAsset() == null) {
            createAsset()
        }
    }

    private fun getNotificationAsset(): UiAsset? {
        return edcClient.uiApi().assetPage.assets.firstOrNull { it.assetId == NOTIFICATION_RECEIVER_ASSET_ID }
    }

    private fun createAsset() {
        edcClient.uiApi().createAsset(
            UiAssetCreateRequest.builder()
                .id(NOTIFICATION_RECEIVER_ASSET_ID)
                .title(NOTIFICATION_RECEIVER_ASSET_NAME)
                .description(NOTIFICATION_RECEIVER_ASSET_DESCRIPTION)
                .dataSource(
                    UiDataSource.builder()
                        .type(DataSourceType.HTTP_DATA)
                        .httpData(
                            UiDataSourceHttpData.builder()
                                .baseUrl("$localUrl/ui/notification/receive")
                                .method(UiDataSourceHttpDataMethod.POST)
                                .build()
                        )
                        .build()
                )
                .build()
        )
    }

    fun ensureDataOfferExists() {
        if (getNotificationDataOffer() == null) {
            createDataOffer()
        }
    }

    private fun getNotificationDataOffer(): ContractDefinitionEntry? {
        return edcClient.uiApi().contractDefinitionPage.contractDefinitions.firstOrNull { it.contractDefinitionId == NOTIFICATION_RECEIVER_ASSET_ID }
    }

    private fun createDataOffer() {
        edcClient.uiApi().createContractDefinition(
            ContractDefinitionRequest.builder()
                .contractDefinitionId(NOTIFICATION_RECEIVER_DATA_OFFER_ID)
                .accessPolicyId(UNRESTRICTED_POLICY_ID)
                .assetSelector(
                    listOf(
                        UiCriterion.builder()
                            .operandLeft(UiCriterion.SERIALIZED_NAME_OPERAND_LEFT)
                            .operator(UiCriterionOperator.EQ)
                            .operandRight(
                                UiCriterionLiteral.builder()
                                    .type(UiCriterionLiteralType.VALUE)
                                    .value(NOTIFICATION_RECEIVER_ASSET_ID)
                                    .build()
                            )
                            .build()
                    )
                )
                .build()
        )
    }
}
