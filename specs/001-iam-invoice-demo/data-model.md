# Data Model: INVOICE Demo

## Customer

**Bảng**: `customers`

Đại diện cho khách hàng/doanh nghiệp mua hàng.

### Fields

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | Int | Yes | Primary key, auto increment |
| `companyName` | String | Yes | Tên công ty, không rỗng |
| `taxCode` | String | Yes | Unique, không rỗng |
| `address` | String | Yes | Không rỗng |
| `email` | String | Yes | Đúng định dạng email |
| `phone` | String | No | Nếu nhập thì không rỗng |
| `createdAt` | DateTime | Yes | Tự sinh khi tạo |
| `updatedAt` | DateTime | Yes | Tự cập nhật khi sửa |

### Relationships

- Một `Customer` có nhiều `Invoice`.
- Không được xóa hoặc thay đổi customer theo cách làm mất liên kết hóa đơn trong demo này.

### Validation Rules

- `taxCode` là duy nhất.
- `companyName`, `taxCode`, `address`, `email` bắt buộc.
- `email` phải đúng định dạng email.

## Invoice

**Bảng**: `invoices`

Đại diện cho hóa đơn bán hàng được tạo cho một khách hàng.

### Fields

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | Int | Yes | Primary key, auto increment |
| `invoiceCode` | String | Yes | Unique, hệ thống tự sinh dạng `HDYYYYMMDDNNNN` |
| `customerId` | Int | Yes | Foreign key tới `customers.id` |
| `status` | InvoiceStatus | Yes | Default `Draft` |
| `subtotal` | Decimal | Yes | Tổng tiền hàng trước thuế |
| `taxTotal` | Decimal | Yes | Tổng tiền VAT |
| `grandTotal` | Decimal | Yes | `subtotal + taxTotal` |
| `createdAt` | DateTime | Yes | Tự sinh khi tạo |
| `updatedAt` | DateTime | Yes | Tự cập nhật khi sửa |

### Relationships

- Một `Invoice` thuộc về một `Customer`.
- Một `Invoice` có nhiều `InvoiceItem`.

### State Transitions

| Current | Allowed Next |
|---------|--------------|
| Draft | Signed, Cancelled |
| Signed | Issued, Cancelled |
| Issued | Không có |
| Cancelled | Không có |

### Validation Rules

- `invoiceCode` là duy nhất và do hệ thống tự sinh.
- `customerId` phải tham chiếu khách hàng tồn tại.
- Hóa đơn phải có ít nhất một dòng hóa đơn.
- Chuyển trạng thái sai luồng phải bị từ chối.

## InvoiceItem

**Bảng**: `invoice_items`

Đại diện cho một dòng sản phẩm hoặc dịch vụ trong hóa đơn.

### Fields

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | Int | Yes | Primary key, auto increment |
| `invoiceId` | Int | Yes | Foreign key tới `invoices.id` |
| `itemName` | String | Yes | Tên sản phẩm/dịch vụ, không rỗng |
| `quantity` | Decimal | Yes | Lớn hơn 0 |
| `unitPrice` | Decimal | Yes | Lớn hơn hoặc bằng 0 |
| `vatRate` | Int | Yes | Chỉ nhận 0, 5, 10 |
| `lineSubtotal` | Decimal | Yes | `quantity * unitPrice` |
| `lineTax` | Decimal | Yes | `lineSubtotal * vatRate / 100` |
| `lineTotal` | Decimal | Yes | `lineSubtotal + lineTax` |

### Relationships

- Một `InvoiceItem` thuộc về một `Invoice`.

### Validation Rules

- `quantity` phải lớn hơn 0.
- `unitPrice` phải lớn hơn hoặc bằng 0.
- `vatRate` chỉ được là 0, 5 hoặc 10.

## InvoiceStatus

**Enum values**:

- `Draft`
- `Signed`
- `Issued`
- `Cancelled`

## Derived Calculations

Với mỗi dòng hóa đơn:

```text
lineSubtotal = quantity * unitPrice
lineTax = lineSubtotal * vatRate / 100
lineTotal = lineSubtotal + lineTax
```

Với toàn bộ hóa đơn:

```text
subtotal = sum(lineSubtotal)
taxTotal = sum(lineTax)
grandTotal = subtotal + taxTotal
```
