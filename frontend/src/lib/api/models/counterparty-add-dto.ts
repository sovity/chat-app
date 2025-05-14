import {z} from "zod";

const CounterpartyAddSchema = z.object({
  participantId: z.string(),
  connectorEndpoint: z.string().url(),
})

export type CounterpartyAddDto = z.infer<typeof CounterpartyAddSchema>
