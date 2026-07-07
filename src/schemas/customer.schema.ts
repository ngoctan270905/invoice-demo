import { z } from 'zod';

export const createCustomerSchema = z.object({
  companyName: z.string().trim().min(1, 'Tên công ty là bắt buộc'),
  taxCode: z.string().trim().min(1, 'Mã số thuế là bắt buộc'),
  address: z.string().trim().min(1, 'Địa chỉ là bắt buộc'),
  email: z.string().trim().email('Email không hợp lệ'),
  phone: z.string().trim().optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
