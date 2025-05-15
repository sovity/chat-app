import {z} from 'zod';
import {MessageDirectionDto} from '@/lib/api/models/message-direction-dto';
import {MessageStatusDto} from '@/lib/api/models/message-status-dto';

const MessageSchema = z.object({
  messageId: z.string(),
  createdAt: z.date(),
  message: z.string(),
  messageDirection: z.nativeEnum(MessageDirectionDto),
  status: z.nativeEnum(MessageStatusDto),
});

export type MessageDto = z.infer<typeof MessageSchema>;
