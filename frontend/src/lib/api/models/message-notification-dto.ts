import {z} from 'zod';

const MessageNotificationSchema = z.object({
  message: z.string(),
  senderConnectorEndpoint: z.string().url(),
});

export type MessageNotificationDto = z.infer<typeof MessageNotificationSchema>;
