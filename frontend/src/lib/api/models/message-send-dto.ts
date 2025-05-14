import {z} from "zod";

const MessageSendSchema = z.object({
  message: z.string(),
  username: z.string(),
})

export type MessageSendDto = z.infer<typeof MessageSendSchema>
