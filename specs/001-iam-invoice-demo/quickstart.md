# Quickstart: INVOICE Demo

Tài liệu này mô tả cách chạy và kiểm chứng luồng chính của feature bằng terminal và Postman/Thunder Client.

## Điều kiện trước

- Đã cài Node.js và npm.
- Đã cài Docker và có image MySQL 8.
- File `.env` có `DATABASE_URL` trỏ tới MySQL local.

## 1. Chạy MySQL bằng Docker

```bash
docker start iam-invoice-mysql
```

Nếu chưa có container, tạo mới:

```bash
docker run --name iam-invoice-mysql \
  -e MYSQL_ROOT_PASSWORD=123456789 \
  -e MYSQL_DATABASE=iam_invoice_demo \
  -e MYSQL_USER=admin \
  -e MYSQL_PASSWORD=123456789 \
  -p 3306:3306 \
  -d mysql:8
```

## 2. Cài dependency

```bash
npm install
```

## 3. Cấu hình môi trường

```bash
cp .env.example .env
```

Với local dev, dùng root để Prisma migrate có quyền tạo shadow database:

```env
PORT=3000
DATABASE_URL="mysql://root:123456789@localhost:3306/iam_invoice_demo"
```

## 4. Chạy migration và generate Prisma Client

```bash
npm run prisma:migrate -- --name init-iam-invoice
npm run prisma:generate
```

## 5. Build kiểm tra TypeScript

```bash
npm run build
```

Kỳ vọng: build không báo lỗi TypeScript.

## 6. Chạy server dev

```bash
npm run dev
```

Server mặc định:

```text
http://localhost:3000
```

## 7. Kiểm chứng bằng Postman hoặc Thunder Client

Tham khảo contract tại [contracts/openapi.yaml](contracts/openapi.yaml).

### 7.1 Health check

```http
GET /health
```

Kỳ vọng: response JSON thành công.

### 7.2 Tạo khách hàng

```http
POST /customers
Content-Type: application/json
```

Body:

```json
{
  "companyName": "Công ty TNHH Demo",
  "taxCode": "0101234567",
  "address": "Hà Nội",
  "email": "demo@example.com",
  "phone": "0900000000"
}
```

Kỳ vọng:

- HTTP 201.
- Response JSON `success: true`.
- Có `data.id`.

### 7.3 Kiểm tra trùng mã số thuế

Gửi lại request tạo khách hàng với cùng `taxCode`.

Kỳ vọng:

- Response lỗi rõ ràng.
- Message nói mã số thuế đã tồn tại.

### 7.4 Xem danh sách khách hàng

```http
GET /customers
```

Kỳ vọng: danh sách có khách hàng vừa tạo.

### 7.5 Tạo hóa đơn

```http
POST /invoices
Content-Type: application/json
```

Body:

```json
{
  "customerId": 1,
  "items": [
    {
      "itemName": "Dịch vụ tư vấn",
      "quantity": 2,
      "unitPrice": 1000000,
      "vatRate": 10
    },
    {
      "itemName": "Phí hỗ trợ",
      "quantity": 1,
      "unitPrice": 500000,
      "vatRate": 5
    }
  ]
}
```

Kỳ vọng:

- HTTP 201.
- Hệ thống tự sinh `invoiceCode` dạng `HDYYYYMMDDNNNN`.
- Trạng thái mặc định là `Draft`.
- `subtotal`, `taxTotal`, `grandTotal` được tính từ các dòng hóa đơn.

### 7.6 Từ chối VAT không hợp lệ

Tạo hóa đơn với `vatRate: 8`.

Kỳ vọng:

- Response lỗi rõ ràng.
- Message nói VAT chỉ được là `0`, `5`, hoặc `10`.

### 7.7 Xem danh sách và tìm kiếm hóa đơn

```http
GET /invoices
GET /invoices?search=HD20260707
GET /invoices?search=Công ty TNHH Demo
```

Kỳ vọng: trả về hóa đơn phù hợp.

### 7.8 Xem chi tiết hóa đơn

```http
GET /invoices/1
```

Kỳ vọng: response có thông tin customer, items, subtotal, taxTotal, grandTotal và status.

### 7.9 Cập nhật trạng thái hợp lệ

```http
PATCH /invoices/1/status
Content-Type: application/json
```

Body:

```json
{
  "status": "Signed"
}
```

Sau đó:

```json
{
  "status": "Issued"
}
```

Kỳ vọng: trạng thái được cập nhật đúng luồng.

### 7.10 Từ chối trạng thái sai luồng

Sau khi hóa đơn đã `Issued`, thử chuyển về `Draft` hoặc `Cancelled`.

Kỳ vọng:

- Response lỗi rõ ràng.
- Message nói chuyển trạng thái không hợp lệ.

## Kết quả hoàn tất

Feature được xem là đạt quickstart khi:

- Tạo được khách hàng.
- Chặn được mã số thuế trùng.
- Tạo được hóa đơn với nhiều dòng.
- Tính đúng tiền hàng, VAT, tổng thanh toán.
- Tìm kiếm và xem chi tiết hóa đơn được.
- Cập nhật trạng thái đúng luồng và từ chối sai luồng.
- Tất cả response thành công/lỗi theo JSON thống nhất.
