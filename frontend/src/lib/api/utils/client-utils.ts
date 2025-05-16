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

import {env} from '@/env';
import {FAKE_BACKEND} from '@/lib/api/fake-backend/fake-backend';

export type FetchAPI = WindowOrWorkerGlobalScope['fetch'];

const shouldUseFakeBackend = env.NEXT_PUBLIC_USE_FAKE_BACKEND;
const backendBaseUrl = env.NEXT_PUBLIC_BACKEND_URL;

export const request = async <T, R>(
  method: string,
  url: string,
  body?: T,
): Promise<R> => {
  const fetchApi: FetchAPI = shouldUseFakeBackend ? FAKE_BACKEND : fetch;

  const response = await fetchApi(`${backendBaseUrl}/${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  if (response.body === null) {
    return {} as R;
  }

  return (await response.json()) as R;
};
