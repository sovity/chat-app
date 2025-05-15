import {CounterpartyDto} from '@/lib/api/models/counterparty-dto';
import {ConnectionStatusDto} from '@/lib/api/models/connection-status-dto';
import {CounterpartyAddDto} from '@/lib/api/models/counterparty-add-dto';

export const fakeCounterparties: CounterpartyDto[] = [
  {
    participantId: 'BPNL00000001',
    connectorEndpoint: 'https//connector1.example.com/control/dsp',
    status: ConnectionStatusDto.ONLINE,
    lastUpdate: new Date(),
  },
  {
    participantId: 'BPNL00000002',
    connectorEndpoint: 'https//connector2.example.com/control/dsp',
    status: ConnectionStatusDto.ERROR,
    lastUpdate: new Date(),
  },
];

export const addCounterparty = (toAdd: CounterpartyAddDto): CounterpartyDto => {
  const created: CounterpartyDto = {
    participantId: toAdd.participantId,
    connectorEndpoint: toAdd.connectorEndpoint,
    status: ConnectionStatusDto.CONNECTING,
    lastUpdate: new Date(),
  };

  const index = fakeCounterparties.push(created) - 1;

  setTimeout(() => {
    fakeCounterparties[index].status = ConnectionStatusDto.ONLINE;
    fakeCounterparties[index].lastUpdate = new Date();
  }, 5000);

  return created;
};

export const deleteCounterparty = (participantId: string): boolean => {
  const index = fakeCounterparties.findIndex(
    (it) => it.participantId === participantId,
  );
  if (index >= 0) {
    fakeCounterparties.splice(index, 1);
    return true;
  } else {
    return false;
  }
};
