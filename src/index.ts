import http from 'node:http';

import { openApiDocument } from './config/openapi.js';

const port = Number(process.env.PORT ?? 3000);

function sendJson(response: http.ServerResponse, statusCode: number, data: unknown) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(data));
}

function sendHtml(response: http.ServerResponse, statusCode: number, html: string) {
  response.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
  response.end(html);
}

function getSwaggerHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>IAM Invoice Demo API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          url: '/api-docs.json',
          dom_id: '#swagger-ui',
        });
      };
    </script>
  </body>
</html>`;
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host}`);

  if (request.method === 'GET' && url.pathname === '/health') {
    sendJson(response, 200, {
      status: 'ok',
      service: 'iam-invoice-demo',
    });
    return;
  }

  if (request.method === 'GET' && url.pathname === '/api/demo') {
    sendJson(response, 200, {
      message: 'Hello from pure Node.js + TypeScript API',
      timestamp: new Date().toISOString(),
    });
    return;
  }

  if (request.method === 'GET' && url.pathname === '/api-docs.json') {
    sendJson(response, 200, openApiDocument);
    return;
  }

  if (request.method === 'GET' && url.pathname === '/api-docs') {
    sendHtml(response, 200, getSwaggerHtml());
    return;
  }

  sendJson(response, 404, {
    message: 'Route not found',
  });
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger docs: http://localhost:${port}/api-docs`);
});
