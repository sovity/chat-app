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
import {ConnectionStatusDto} from '@/lib/api/models/connection-status-dto';

const CounterpartySchema = z.object({
  participantId: z.string(),
  connectorEndpoint: z.string().url(),
  status: z.nativeEnum(ConnectionStatusDto),
  lastUpdate: z.date(),
});

export type CounterpartyDto = z.infer<typeof CounterpartySchema>;
