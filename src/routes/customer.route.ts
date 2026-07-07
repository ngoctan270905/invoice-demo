import { customerController } from '../controllers/customer.controller.js';
import { addRoute } from './index.js';

export function registerCustomerRoutes() {
  addRoute('POST', '/customers', (_request, response, _params, body) =>
    customerController.createCustomer(response, body),
  );

  addRoute('GET', '/customers', (_request, response) => customerController.listCustomers(response));
}
