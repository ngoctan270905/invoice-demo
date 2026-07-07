import type { ServerResponse } from 'node:http';

import { createCustomerSchema } from '../schemas/customer.schema.js';
import { customerService } from '../services/customer.service.js';
import { sendSuccess } from '../utils/api-response.js';
import { validate } from '../utils/validate.js';

export class CustomerController {
  async createCustomer(response: ServerResponse, body: unknown) {
    const data = validate(createCustomerSchema, body);
    const customer = await customerService.createCustomer(data);

    sendSuccess(response, 201, 'Tạo khách hàng thành công', customer);
  }

  async listCustomers(response: ServerResponse) {
    const customers = await customerService.getCustomers();

    sendSuccess(response, 200, 'Lấy danh sách khách hàng thành công', customers);
  }
}

export const customerController = new CustomerController();
