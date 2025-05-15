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

export function ok(body: any): Promise<Response> {
  console.log('Fake Backend returns: ', body);
  return new Promise((resolve) => {
    const response = new Response(JSON.stringify(body), {status: 200});
    setTimeout(() => resolve(response), 400);
  });
}

export function notFound(): Promise<Response> {
  return new Promise((resolve) => {
    const response = new Response('Not Found', {status: 404});
    setTimeout(() => resolve(response), 400);
  });
}

export function noContent(): Promise<Response> {
  return new Promise((resolve) => {
    const response = new Response(null, {status: 204});
    setTimeout(() => resolve(response), 400);
  });
}
