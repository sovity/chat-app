import {z} from "zod";
import {ConnectionStatusDto} from "@/lib/api/models/connection-status-dto";

const CounterpartySchema = z.object({
  participantId: z.string(),
  connectorEndpoint: z.string().url(),
  status: z.nativeEnum(ConnectionStatusDto),
  lastUpdate: z.date(),
})

export type CounterpartyDto = z.infer<typeof CounterpartySchema>
