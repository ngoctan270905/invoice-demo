# Công việc: IAM INVOICE Demo - Quản Lý Hóa Đơn Điện Tử

**Đầu vào**: Tài liệu thiết kế từ `/specs/001-iam-invoice-demo/`

**Điều kiện trước**: plan.md, spec.md, research.md, data-model.md, contracts/openapi.yaml, quickstart.md

**Kiểm thử**: Spec không yêu cầu TDD hoặc test tự động, nên không tạo task test tự động. Việc kiểm chứng chính dùng Postman/Thunder Client theo quickstart.md và `npm run build`.

**Tổ chức**: Công việc được nhóm theo câu chuyện người dùng để mỗi câu chuyện có thể triển khai và kiểm thử độc lập.

## Định dạng: `[ID] [P?] [Story] Mô tả`

- **[P]**: Có thể chạy song song (khác file, không phụ thuộc nhau)
- **[Story]**: Công việc thuộc câu chuyện người dùng nào (US1, US2, US3, US4)
- Mô tả có path file chính xác

## Quy ước path

- Source code: `src/`
- Prisma schema: `prisma/schema.prisma`
- Feature docs: `specs/001-iam-invoice-demo/`

---

## Giai đoạn 1: Thiết lập (Hạ tầng dùng chung)

**Mục đích**: Chuẩn bị dependency và cấu trúc thư mục theo plan.

- [X] T001 Cài dependency zod bằng npm và cập nhật package.json
- [X] T002 [P] Tạo thư mục schemas trong src/schemas/
- [X] T003 [P] Tạo thư mục repositories trong src/repositories/
- [X] T004 [P] Tạo file barrel routes trong src/routes/index.ts
- [X] T005 [P] Tạo file helper response rỗng theo plan trong src/utils/api-response.ts
- [X] T006 [P] Tạo file AppError rỗng theo plan trong src/utils/app-error.ts

---

## Giai đoạn 2: Nền tảng (Điều kiện chặn bắt buộc)

**Mục đích**: Hạ tầng lõi PHẢI hoàn thành trước khi triển khai BẤT KỲ câu chuyện người dùng nào.

**⚠️ QUAN TRỌNG**: Không bắt đầu work cho user story cho tới khi giai đoạn này hoàn tất.

- [X] T007 Cập nhật Prisma schema cho Customer, Invoice, InvoiceItem và InvoiceStatus trong prisma/schema.prisma
- [X] T008 Chạy Prisma generate để cập nhật Prisma Client sau khi sửa prisma/schema.prisma
- [X] T009 Implement AppError class và error helper trong src/utils/app-error.ts
- [X] T010 Implement response JSON helper success/error trong src/utils/api-response.ts
- [X] T011 Implement middleware xử lý lỗi tập trung trong src/middlewares/error.middleware.ts
- [X] T012 Cập nhật HTTP server để parse JSON body và gắn error middleware trong src/index.ts
- [X] T013 Implement router tổng hợp và cơ chế mount route prefix trong src/routes/index.ts
- [X] T014 [P] Tạo zod schema dùng chung cho id path param trong src/schemas/common.schema.ts
- [X] T015 [P] Tạo helper validate request body/query/params trong src/utils/validate.ts

**Checkpoint**: Nền tảng response, error handling, routing, validation và Prisma schema đã sẵn sàng.

---

## Giai đoạn 3: Câu chuyện người dùng 1 - Quản lý khách hàng (Ưu tiên: P1) 🎯 MVP

**Mục tiêu**: Thêm khách hàng mới, chặn trùng mã số thuế, xem danh sách khách hàng.

**Kiểm thử độc lập**: Dùng Postman/Thunder Client tạo khách hàng hợp lệ, tạo trùng mã số thuế để nhận lỗi, và gọi danh sách khách hàng để thấy dữ liệu đã lưu.

### Triển khai cho Câu chuyện người dùng 1

- [ ] T016 [P] [US1] Tạo customer zod schemas cho create customer trong src/schemas/customer.schema.ts
- [ ] T017 [P] [US1] Implement CustomerRepository create/findByTaxCode/findMany trong src/repositories/customer.repository.ts
- [ ] T018 [US1] Implement CustomerService createCustomer với validate trùng mã số thuế trong src/services/customer.service.ts
- [ ] T019 [US1] Implement CustomerService getCustomers trong src/services/customer.service.ts
- [ ] T020 [US1] Implement CustomerController createCustomer/listCustomers trong src/controllers/customer.controller.ts
- [ ] T021 [US1] Map POST /customers và GET /customers trong src/routes/customer.route.ts
- [ ] T022 [US1] Mount customer routes vào router tổng trong src/routes/index.ts
- [ ] T023 [US1] Kiểm chứng US1 theo quickstart mục 7.2, 7.3, 7.4 trong specs/001-iam-invoice-demo/quickstart.md

**Checkpoint**: Có thể tạo khách hàng, chặn trùng mã số thuế và xem danh sách khách hàng độc lập.

---

## Giai đoạn 4: Câu chuyện người dùng 2 - Tạo hóa đơn và tự động tính tiền (Ưu tiên: P1)

**Mục tiêu**: Tạo hóa đơn cho khách hàng có sẵn, tự sinh mã hóa đơn, validate VAT, tính subtotal/taxTotal/grandTotal.

**Kiểm thử độc lập**: Dùng khách hàng đã tạo từ US1 để tạo hóa đơn nhiều dòng, kiểm tra invoiceCode, trạng thái Draft, subtotal, taxTotal và grandTotal.

### Triển khai cho Câu chuyện người dùng 2

- [ ] T024 [P] [US2] Tạo invoice zod schemas cho create invoice và invoice item trong src/schemas/invoice.schema.ts
- [ ] T025 [P] [US2] Implement helper sinh invoice code HDYYYYMMDDNNNN trong src/utils/invoice-code.ts
- [ ] T026 [P] [US2] Implement InvoiceRepository findLatestByCodePrefix/create trong src/repositories/invoice.repository.ts
- [ ] T027 [US2] Implement InvoiceService createInvoice kiểm tra customer tồn tại trong src/services/invoice.service.ts
- [ ] T028 [US2] Implement InvoiceService createInvoice validate VAT 0/5/10 và ít nhất một item trong src/services/invoice.service.ts
- [ ] T029 [US2] Implement InvoiceService createInvoice tính lineSubtotal, lineTax, lineTotal, subtotal, taxTotal, grandTotal trong src/services/invoice.service.ts
- [ ] T030 [US2] Implement InvoiceController createInvoice trong src/controllers/invoice.controller.ts
- [ ] T031 [US2] Map POST /invoices trong src/routes/invoice.route.ts
- [ ] T032 [US2] Mount invoice routes vào router tổng trong src/routes/index.ts
- [ ] T033 [US2] Kiểm chứng US2 theo quickstart mục 7.5 và 7.6 trong specs/001-iam-invoice-demo/quickstart.md

**Checkpoint**: Có thể tạo hóa đơn có nhiều dòng, tự sinh mã, tính tiền đúng và từ chối VAT không hợp lệ.

---

## Giai đoạn 5: Câu chuyện người dùng 3 - Tra cứu và xem chi tiết hóa đơn (Ưu tiên: P2)

**Mục tiêu**: Xem danh sách hóa đơn, tìm kiếm theo mã hóa đơn hoặc tên khách hàng, xem chi tiết hóa đơn.

**Kiểm thử độc lập**: Dùng hóa đơn từ US2 để gọi danh sách, tìm kiếm theo mã/tên khách hàng và xem chi tiết hóa đơn.

### Triển khai cho Câu chuyện người dùng 3

- [ ] T034 [P] [US3] Bổ sung invoice zod schema cho search query trong src/schemas/invoice.schema.ts
- [ ] T035 [US3] Implement InvoiceRepository findManyWithSearch trong src/repositories/invoice.repository.ts
- [ ] T036 [US3] Implement InvoiceRepository findByIdWithDetails trong src/repositories/invoice.repository.ts
- [ ] T037 [US3] Implement InvoiceService getInvoices với search theo invoiceCode/customerName trong src/services/invoice.service.ts
- [ ] T038 [US3] Implement InvoiceService getInvoiceDetail và lỗi not found trong src/services/invoice.service.ts
- [ ] T039 [US3] Implement InvoiceController listInvoices/getInvoiceDetail trong src/controllers/invoice.controller.ts
- [ ] T040 [US3] Map GET /invoices và GET /invoices/:id trong src/routes/invoice.route.ts
- [ ] T041 [US3] Kiểm chứng US3 theo quickstart mục 7.7 và 7.8 trong specs/001-iam-invoice-demo/quickstart.md

**Checkpoint**: Có thể xem danh sách, tìm kiếm và xem chi tiết hóa đơn độc lập.

---

## Giai đoạn 6: Câu chuyện người dùng 4 - Quản lý trạng thái hóa đơn mô phỏng (Ưu tiên: P3)

**Mục tiêu**: Cập nhật trạng thái theo luồng Draft → Signed → Issued; Cancelled chỉ từ Draft hoặc Signed; từ chối sai luồng.

**Kiểm thử độc lập**: Dùng hóa đơn từ US2 để chuyển Draft → Signed → Issued, sau đó thử chuyển sai luồng để nhận lỗi rõ ràng.

### Triển khai cho Câu chuyện người dùng 4

- [ ] T042 [P] [US4] Bổ sung invoice zod schema cho update status trong src/schemas/invoice.schema.ts
- [ ] T043 [US4] Implement InvoiceRepository updateStatus trong src/repositories/invoice.repository.ts
- [ ] T044 [US4] Implement InvoiceService validateStatusTransition trong src/services/invoice.service.ts
- [ ] T045 [US4] Implement InvoiceService updateInvoiceStatus với lỗi sai luồng trong src/services/invoice.service.ts
- [ ] T046 [US4] Implement InvoiceController updateInvoiceStatus trong src/controllers/invoice.controller.ts
- [ ] T047 [US4] Map PATCH /invoices/:id/status trong src/routes/invoice.route.ts
- [ ] T048 [US4] Kiểm chứng US4 theo quickstart mục 7.9 và 7.10 trong specs/001-iam-invoice-demo/quickstart.md

**Checkpoint**: Có thể cập nhật trạng thái đúng luồng và từ chối trạng thái sai luồng.

---

## Giai đoạn 7: Hoàn thiện & nội dung dùng chung

**Mục đích**: Hoàn thiện tài liệu, contract, build và kiểm chứng toàn bộ luồng.

- [ ] T049 [P] Cập nhật README với endpoint chính và flow test IAM Invoice trong README.md
- [ ] T050 [P] Đồng bộ OpenAPI contract nếu endpoint/response thay đổi trong specs/001-iam-invoice-demo/contracts/openapi.yaml
- [ ] T051 Chạy npm run build và sửa lỗi TypeScript nếu có trong src/
- [ ] T052 Chạy Prisma migration cho schema IAM Invoice bằng npm run prisma:migrate trong prisma/migrations/
- [ ] T053 Validate quickstart end-to-end theo specs/001-iam-invoice-demo/quickstart.md
- [ ] T054 Review lại checklist API và đánh dấu các mục đã được spec/plan bao phủ trong specs/001-iam-invoice-demo/checklists/api.md

---

## Phụ thuộc & thứ tự thực hiện

### Phụ thuộc giữa giai đoạn

- **Thiết lập (Giai đoạn 1)**: Không có phụ thuộc - có thể bắt đầu ngay.
- **Nền tảng (Giai đoạn 2)**: Phụ thuộc Giai đoạn 1 - CHẶN mọi câu chuyện người dùng.
- **US1 Quản lý khách hàng (Giai đoạn 3)**: Phụ thuộc Giai đoạn 2.
- **US2 Tạo hóa đơn (Giai đoạn 4)**: Phụ thuộc Giai đoạn 2 và cần có khách hàng từ US1 để kiểm chứng thực tế.
- **US3 Tra cứu hóa đơn (Giai đoạn 5)**: Phụ thuộc US2 vì cần hóa đơn đã tạo.
- **US4 Trạng thái hóa đơn (Giai đoạn 6)**: Phụ thuộc US2 vì cần hóa đơn đã tạo.
- **Hoàn thiện (Giai đoạn 7)**: Phụ thuộc các câu chuyện mong muốn đã hoàn tất.

### Phụ thuộc giữa câu chuyện người dùng

- **US1 (P1)**: MVP dữ liệu khách hàng, có thể test độc lập sau nền tảng.
- **US2 (P1)**: Nghiệp vụ hóa đơn chính, cần customer tồn tại để kiểm chứng.
- **US3 (P2)**: Cần invoice tồn tại từ US2 để test danh sách/chi tiết/search.
- **US4 (P3)**: Cần invoice tồn tại từ US2 để test cập nhật trạng thái.

### Bên trong mỗi câu chuyện người dùng

- Schema validation trước controller.
- Repository trước service khi cần database.
- Service trước controller và route.
- Route hoàn tất trước quickstart validation.
- Story phải pass checkpoint trước khi chuyển story phụ thuộc.

### Cơ hội chạy song song

- T002, T003, T004, T005, T006 có thể chạy song song sau T001.
- T014, T015 có thể chạy song song với T009-T013 nếu không sửa cùng file.
- T016 và T017 có thể chạy song song trong US1.
- T024, T025, T026 có thể chạy song song trong US2.
- T034 có thể chạy song song với T035 nếu phối hợp thay đổi file khác nhau.
- T049 và T050 có thể chạy song song trong phase hoàn thiện.

---

## Ví dụ chạy song song

### US1

```bash
Task: "Tạo customer zod schemas trong src/schemas/customer.schema.ts"
Task: "Implement CustomerRepository trong src/repositories/customer.repository.ts"
```

### US2

```bash
Task: "Tạo invoice zod schemas trong src/schemas/invoice.schema.ts"
Task: "Implement helper sinh invoice code trong src/utils/invoice-code.ts"
Task: "Implement InvoiceRepository create trong src/repositories/invoice.repository.ts"
```

### Hoàn thiện

```bash
Task: "Cập nhật README với endpoint chính trong README.md"
Task: "Đồng bộ OpenAPI contract trong specs/001-iam-invoice-demo/contracts/openapi.yaml"
```

---

## Chiến lược triển khai

### MVP trước

1. Hoàn tất Giai đoạn 1 và 2.
2. Hoàn tất US1 để quản lý khách hàng.
3. Hoàn tất US2 để tạo hóa đơn và tính tiền.
4. Dừng để validate nhanh bằng Postman/Thunder Client: tạo customer → tạo invoice → kiểm tra tổng tiền.

### Bàn giao tăng dần

1. US1: customer CRUD tối thiểu gồm create/list.
2. US2: invoice create với tính tiền.
3. US3: invoice list/search/detail.
4. US4: status transition.
5. Polish: README, OpenAPI, build, migration, quickstart.

### Lưu ý cho implement

- Không thêm đăng nhập/phân quyền.
- Không thêm Express/NestJS.
- Không đặt business logic trong route hoặc controller.
- Không tích hợp ký số/cơ quan thuế/thanh toán/email thật.
- Dùng JSON response thống nhất cho mọi endpoint.
