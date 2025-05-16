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

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'system';
  timestamp: string;
  status?: 'sending' | 'delivered' | 'error';
}

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
  lastMessage: Message | null;
  timestamp: string;
}
