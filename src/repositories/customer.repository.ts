import { prisma } from '../config/database.js';
import type { CreateCustomerInput } from '../schemas/customer.schema.js';

export class CustomerRepository {
  create(data: CreateCustomerInput) {
    return prisma.customer.create({
      data: {
        ...data,
        phone: data.phone ?? null,
      },
    });
  }

  findByTaxCode(taxCode: string) {
    return prisma.customer.findUnique({
      where: {
        taxCode,
      },
    });
  }

  findMany() {
    return prisma.customer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

export const customerRepository = new CustomerRepository();
