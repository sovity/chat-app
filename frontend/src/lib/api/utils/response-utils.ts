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
