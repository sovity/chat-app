/*
 * Copyright (c) 2025 sovity GmbH
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Contributors:
 *      sovity GmbH - initial implementation
 */

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
