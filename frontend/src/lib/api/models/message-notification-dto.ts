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

const MessageNotificationSchema = z.object({
  message: z.string(),
  senderConnectorEndpoint: z.string().url(),
});

export type MessageNotificationDto = z.infer<typeof MessageNotificationSchema>;
