import http from 'node:http';

import { handleError } from './middlewares/error.middleware.js';
import { handleRoutes, registerRoutes } from './routes/index.js';

const port = Number(process.env.PORT ?? 3000);

registerRoutes();

async function parseJsonBody(request: http.IncomingMessage) {
  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return undefined;
  }

  const rawBody = Buffer.concat(chunks).toString('utf-8').trim();

  if (!rawBody) {
    return undefined;
  }

  return JSON.parse(rawBody) as unknown;
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', `http://${request.headers.host}`);
    const body = request.method === 'GET' ? undefined : await parseJsonBody(request);

    await handleRoutes(request, response, url.pathname, body);
  } catch (error) {
    handleError(error, response);
  }
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
