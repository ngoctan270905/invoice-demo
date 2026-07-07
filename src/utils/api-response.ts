import type { ServerResponse } from 'node:http';

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
};

export function sendSuccess<T>(
  response: ServerResponse,
  statusCode: number,
  message: string,
  data?: T,
) {
  sendJson(response, statusCode, {
    success: true,
    message,
    data,
  });
}

export function sendError(
  response: ServerResponse,
  statusCode: number,
  message: string,
  errors?: unknown,
) {
  sendJson(response, statusCode, {
    success: false,
    message,
    errors,
  });
}

export function sendJson<T>(response: ServerResponse, statusCode: number, body: ApiResponse<T>) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(body));
}
