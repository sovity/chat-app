"use client"

import {CounterpartyDto} from "@/lib/api/models/counterparty-dto";
import {request} from "@/lib/api/utils/client-utils";
import {CounterpartyAddDto} from "@/lib/api/models/counterparty-add-dto";
import {MessageDto} from "@/lib/api/models/message-dto";
import {MessageSendDto} from "@/lib/api/models/message-send-dto";

export const listCounterparties = async (): Promise<CounterpartyDto[]> => {
  return await request("GET", "counterparties");
}

export const addCounterparty = async (requestBody: CounterpartyAddDto): Promise<CounterpartyDto> => {
  return await request("POST", "counterparties", requestBody);
}

export const deleteCounterparty = async (participantId: string): Promise<void> => {
  return await request("DELETE", `counterparties/${participantId}`);
}

export const getAllMessages = async (connectorId: string): Promise<MessageDto[]> => {
  return await request("GET", `connectors/${connectorId}/messages`);
}

export const sendMessage = async (connectorId: string, messageSendRequest: MessageSendDto): Promise<MessageDto> => {
  return await request("POST", `connectors/${connectorId}/messages`, messageSendRequest);
}
