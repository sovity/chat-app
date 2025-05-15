import {FetchAPI} from '@/lib/api/utils/client-utils';
import {
  getBody,
  getMethod,
  getQueryParams,
  getUrl,
} from '@/lib/api/utils/request-utils';
import {UrlInterceptor} from '@/lib/api/utils/url-interceptor';
import {notFound, ok} from '@/lib/api/utils/response-utils';
import {
  addCounterparty,
  deleteCounterparty,
  fakeCounterparties,
} from '@/lib/api/fake-backend/data/fake-counterparties';
import {CounterpartyAddDto} from '@/lib/api/models/counterparty-add-dto';
import {
  addMessageToConnector,
  getMessagesByConnectorId,
} from '@/lib/api/fake-backend/data/fake-messages';
import {MessageSendDto} from '@/lib/api/models/message-send-dto';

export const FAKE_BACKEND: FetchAPI = async (
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> => {
  const url = getUrl(input, 'http://fake-backend/api/');
  const method = getMethod(init);
  const body: unknown = getBody(init);
  const params = getQueryParams(input);

  console.log(
    ...[
      'Fake Backend:',
      method,
      url,
      params?.get('size') ? params : null,
      body,
    ].filter((it) => !!it),
  );

  return new UrlInterceptor(url, method)
    .url('counterparties')
    .on('GET', () => {
      return ok(JSON.stringify(fakeCounterparties));
    })

    .url('counterparties')
    .on('POST', () => {
      const counterpartyAddRequest = body as CounterpartyAddDto;
      return ok(addCounterparty(counterpartyAddRequest));
    })

    .url('counterparties/*')
    .on('DELETE', (participantId: string) => {
      if (deleteCounterparty(participantId)) {
        return ok({});
      } else {
        return notFound();
      }
    })

    .url('connectors/*/messages')
    .on('GET', (connectorId: string) => {
      return ok(getMessagesByConnectorId(connectorId));
    })

    .url('connectors/*/messages')
    .on('POST', (connectorId: string) => {
      const messageSendRequest = body as MessageSendDto;
      return ok(addMessageToConnector(connectorId, messageSendRequest));
    })

    .tryMatch();
};
