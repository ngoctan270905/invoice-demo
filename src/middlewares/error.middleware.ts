import type { ServerResponse } from 'node:http';
import { ZodError } from 'zod';

import { isAppError } from '../utils/app-error.js';
import { sendError } from '../utils/api-response.js';

export function handleError(error: unknown, response: ServerResponse) {
  if (isAppError(error)) {
    sendError(response, error.statusCode, error.message, error.errors);
    return;
  }

  if (error instanceof ZodError) {
    sendError(response, 400, 'Dữ liệu không hợp lệ', error.flatten());
    return;
  }

  console.error(error);
  sendError(response, 500, 'Lỗi hệ thống');
}
