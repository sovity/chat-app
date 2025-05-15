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

export const getUrl = (input: Request | string, baseUrl: string): string => {
  const url = new URL(typeof input === 'string' ? input : input.url);
  const urlNoQuery = url.origin + url.pathname;
  return urlNoQuery.startsWith(baseUrl)
    ? urlNoQuery.substring(baseUrl.length)
    : urlNoQuery;
};

export const getMethod = (init: RequestInit | undefined): string =>
  init?.method ?? 'GET';

export const getBody = (input: RequestInit | undefined): unknown => {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const body = input?.body?.toString();
  return body ? JSON.parse(body) : null;
};

export const getQueryParams = (input: Request | string): URLSearchParams => {
  const url = new URL(typeof input === 'string' ? input : input.url);
  return url.searchParams;
};
