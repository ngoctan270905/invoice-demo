# Kế hoạch triển khai: INVOICE Demo - Quản Lý Hóa Đơn Điện Tử

**Branch**: `[001-iam-invoice-demo]` | **Ngày**: 2026-07-07 | **Spec**: [spec.md](spec.md)

**Đầu vào**: Đặc tả tính năng từ `/specs/001-iam-invoice-demo/spec.md` và yêu cầu kỹ thuật bổ sung từ người dùng.

## Tóm tắt

Triển khai backend demo quản lý hóa đơn điện tử INVOICE bằng Node.js + TypeScript. Hệ thống cung cấp API quản lý khách hàng, tạo hóa đơn, tính tiền hàng/VAT/tổng thanh toán, tra cứu hóa đơn và cập nhật trạng thái hóa đơn mô phỏng. Kiến trúc tuân theo phân lớp route → controller → service → repository, dùng MySQL + Prisma ORM cho dữ liệu, zod để validate input tại controller, và middleware lỗi tập trung để trả JSON thống nhất.

## Ngữ cảnh kỹ thuật

**Ngôn ngữ/Phiên bản**: Node.js + TypeScript theo cấu hình hiện tại của project

**Dependency chính**: Prisma ORM, @prisma/client, zod, tsx, TypeScript

**Lưu trữ**: MySQL chạy local bằng Docker; truy cập dữ liệu qua Prisma ORM

**Kiểm thử**: Postman hoặc Thunder Client cho luồng API chính; `npm run build` để kiểm tra TypeScript; Prisma Studio để kiểm tra dữ liệu nếu cần

**Nền tảng mục tiêu**: Backend API chạy local trên Linux/dev machine; MySQL local qua Docker

**Loại dự án**: Backend API demo Node.js thuần + TypeScript

**Mục tiêu hiệu năng**: Đủ cho demo học tập local; thao tác danh sách/chi tiết phản hồi nhanh với dữ liệu mẫu nhỏ

**Ràng buộc**: Không thêm framework backend nặng; không dùng Express/NestJS; validate input bằng zod; giữ code đơn giản, dễ đọc, tách lớp rõ ràng; không tích hợp ký số/cơ quan thuế/thanh toán/email thật

**Quy mô/Phạm vi**: Demo học tập quản lý khách hàng và hóa đơn cơ bản, một người dùng demo, không đăng nhập/phân quyền

## Kiểm tra hiến pháp

*CỔNG KIỂM TRA: Phải đạt trước Giai đoạn 0 nghiên cứu. Kiểm tra lại sau Giai đoạn 1 thiết kế.*

- Ưu tiên học tập và đơn giản: PASS — dùng Node.js thuần + TypeScript, tránh framework backend nặng, chỉ thêm zod để validate input theo yêu cầu.
- Phân lớp backend rõ ràng: PASS — route chỉ map request, controller validate và gọi service, service chứa nghiệp vụ, repository chứa truy cập Prisma.
- Validate input: PASS — zod được dùng tại controller trước khi truyền dữ liệu xuống service.
- Response JSON thống nhất: PASS — thiết kế có helper response và middleware lỗi tập trung.
- Phạm vi demo: PASS — ký số, cơ quan thuế, thanh toán, email chỉ mô phỏng bằng trạng thái dữ liệu.
- Dữ liệu rõ ràng: PASS — Prisma schema có customers, invoices, invoice_items với khóa chính/khóa ngoại/unique rõ ràng.
- Test thủ công được: PASS — quickstart và contract hỗ trợ test bằng Postman/Thunder Client.

## Cấu trúc dự án

### Tài liệu cho tính năng này

```text
specs/001-iam-invoice-demo/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── openapi.yaml
└── checklists/
    └── requirements.md
```

### Source code (repository root)

```text
src/
├── config/
│   └── database.ts
├── controllers/
│   ├── customer.controller.ts
│   └── invoice.controller.ts
├── middlewares/
│   └── error.middleware.ts
├── repositories/
│   ├── customer.repository.ts
│   └── invoice.repository.ts
├── routes/
│   ├── customer.route.ts
│   ├── invoice.route.ts
│   └── index.ts
├── schemas/
│   ├── customer.schema.ts
│   └── invoice.schema.ts
├── services/
│   ├── customer.service.ts
│   └── invoice.service.ts
├── utils/
│   ├── api-response.ts
│   ├── app-error.ts
│   └── invoice-code.ts
└── index.ts

prisma/
└── schema.prisma
```

**Quyết định cấu trúc**: Project đơn backend Node.js thuần. Cấu trúc giữ đúng route/controller/service/repository; thêm `schemas/` cho zod schema và `utils/` cho response/error/helper sinh mã hóa đơn.

## Theo dõi độ phức tạp

Không có vi phạm hiến pháp cần giải thích. Zod là dependency nhỏ, trực tiếp phục vụ yêu cầu validate input và giúp code dễ hiểu hơn so với tự viết validate thủ công rải rác.

## Kiểm tra hiến pháp sau thiết kế

- Phân lớp route/controller/service/repository được phản ánh trong cấu trúc source và contracts.
- Prisma schema dự kiến có tên bảng rõ ràng, unique cho mã số thuế và mã hóa đơn, foreign key cho hóa đơn và dòng hóa đơn.
- Luồng trạng thái và quy tắc tính tiền nằm trong service, không nằm trong route/controller.
- Contract API trả JSON thống nhất và lỗi rõ ràng.
- Quickstart test được toàn bộ luồng chính bằng Postman/Thunder Client.

Kết luận: PASS, sẵn sàng chuyển sang `/speckit-tasks`.
