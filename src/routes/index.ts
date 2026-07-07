import type { IncomingMessage, ServerResponse } from 'node:http';

import { sendSuccess } from '../utils/api-response.js';

export type RouteHandler = (
  request: IncomingMessage,
  response: ServerResponse,
  params: Record<string, string>,
  body?: unknown,
) => Promise<void> | void;

type Route = {
  method: string;
  pattern: RegExp;
  paramNames: string[];
  handler: RouteHandler;
};

const routes: Route[] = [];

export function addRoute(method: string, path: string, handler: RouteHandler) {
  const paramNames: string[] = [];
  const patternText = path
    .replace(/:([^/]+)/g, (_match, paramName: string) => {
      paramNames.push(paramName);
      return '([^/]+)';
    })
    .replace(/\//g, '\\/');

  routes.push({
    method,
    pattern: new RegExp(`^${patternText}$`),
    paramNames,
    handler,
  });
}

export async function handleRoutes(
  request: IncomingMessage,
  response: ServerResponse,
  pathname: string,
  body?: unknown,
) {
  if (request.method === 'GET' && pathname === '/health') {
    sendSuccess(response, 200, 'OK', {
      status: 'ok',
      service: 'iam-invoice-demo',
    });
    return;
  }

  const route = routes.find((item) => item.method === request.method && item.pattern.test(pathname));

  if (!route) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ success: false, message: 'Route không tồn tại' }));
    return;
  }

  const match = pathname.match(route.pattern);
  const params = route.paramNames.reduce<Record<string, string>>((result, name, index) => {
    result[name] = match?.[index + 1] ?? '';
    return result;
  }, {});

  await route.handler(request, response, params, body);
}
