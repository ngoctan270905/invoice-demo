import { readFile } from 'node:fs/promises';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { resolve } from 'node:path';

import { sendSuccess } from '../utils/api-response.js';
import { registerCustomerRoutes } from './customer.route.js';

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
let registered = false;

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

export function registerRoutes() {
  if (registered) {
    return;
  }

  registerCustomerRoutes();
  registered = true;
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

  if (request.method === 'GET' && pathname === '/api-docs.yaml') {
    const openApiPath = resolve('specs/001-iam-invoice-demo/contracts/openapi.yaml');
    const openApiDocument = await readFile(openApiPath, 'utf-8');

    response.writeHead(200, { 'Content-Type': 'application/yaml; charset=utf-8' });
    response.end(openApiDocument);
    return;
  }

  if (request.method === 'GET' && pathname === '/api-docs') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(getSwaggerHtml());
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

function getSwaggerHtml() {
  return `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8" />
    <title>INVOICE Demo API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          url: '/api-docs.yaml',
          dom_id: '#swagger-ui',
        });
      };
    </script>
  </body>
</html>`;
}
