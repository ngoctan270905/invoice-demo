import { customerRepository } from '../repositories/customer.repository.js';
import type { CreateCustomerInput } from '../schemas/customer.schema.js';
import { AppError } from '../utils/app-error.js';

export class CustomerService {
  async createCustomer(data: CreateCustomerInput) {
    const existingCustomer = await customerRepository.findByTaxCode(data.taxCode);

    if (existingCustomer) {
      throw new AppError(409, 'Mã số thuế đã tồn tại');
    }

    return customerRepository.create(data);
  }

  getCustomers() {
    return customerRepository.findMany();
  }
}

export const customerService = new CustomerService();
