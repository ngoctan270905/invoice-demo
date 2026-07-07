# Research: IAM INVOICE Demo - Quản Lý Hóa Đơn Điện Tử

## Decision: Backend Node.js thuần + TypeScript, không dùng Express/NestJS

**Rationale**: Project là demo học tập Node.js, constitution yêu cầu code đơn giản và hạn chế thư viện không cần thiết. Node.js thuần giúp người học hiểu rõ request/response, routing cơ bản, middleware lỗi và phân lớp code mà không bị che bởi framework.

**Alternatives considered**:

- Express: dễ làm routing hơn nhưng là framework/thư viện HTTP ngoài phạm vi mong muốn của người dùng.
- NestJS: cấu trúc mạnh nhưng quá nặng cho demo học Node.js thuần.

## Decision: Kiến trúc route → controller → service → repository

**Rationale**: Constitution yêu cầu tách lớp rõ ràng. Route chỉ định tuyến. Controller validate input bằng zod và gọi service. Service xử lý nghiệp vụ như sinh mã hóa đơn, tính tiền, validate chuyển trạng thái. Repository thao tác Prisma.

**Alternatives considered**:

- Đặt logic trực tiếp trong route: bị loại vì vi phạm constitution và khó mở rộng.
- Controller gọi Prisma trực tiếp: bị loại vì làm lẫn nghiệp vụ với truy cập dữ liệu.

## Decision: MySQL + Prisma ORM

**Rationale**: Project đã cấu hình Prisma và MySQL. Prisma giúp định nghĩa schema rõ ràng, sinh client type-safe và quản lý migration dễ cho người mới học.

**Alternatives considered**:

- Raw SQL: giúp hiểu SQL nhưng dễ lặp code và kém type-safe hơn.
- ORM khác: không cần thiết vì Prisma đã được setup và phù hợp demo.

## Decision: Zod validate tại controller

**Rationale**: Người dùng yêu cầu validate input bằng zod tại controller trước khi xuống service. Zod giúp schema validate rõ ràng, dễ test và dễ trả lỗi cụ thể.

**Alternatives considered**:

- Validate thủ công: ít dependency hơn nhưng dễ rải rác và khó nhất quán.
- Validate trong service: service vẫn có thể bảo vệ rule nghiệp vụ, nhưng input shape nên được chặn sớm ở controller.

## Decision: Định dạng tiền dùng Decimal trong Prisma

**Rationale**: Tiền hàng, thuế và tổng thanh toán cần tính chính xác. Prisma Decimal phù hợp hơn Float cho dữ liệu tiền.

**Alternatives considered**:

- Float/Double: đơn giản nhưng có rủi ro sai số số thực.
- Int lưu đơn vị nhỏ nhất: chính xác nhưng tăng độ phức tạp cho demo.

## Decision: Mã hóa đơn tự sinh dạng HDYYYYMMDDNNNN

**Rationale**: Người dùng yêu cầu tiền tố, năm tháng ngày và số thứ tự tăng dần, ví dụ HD202607070001. Service sẽ sinh mã bằng ngày hiện tại và số thứ tự tăng dần trong ngày dựa trên số hóa đơn đã có cùng prefix ngày.

**Alternatives considered**:

- UUID: dễ unique nhưng không thân thiện nghiệp vụ hóa đơn.
- Người dùng tự nhập: rủi ro trùng và tăng validate.

## Decision: Trạng thái hóa đơn dùng enum

**Rationale**: Chỉ có bốn trạng thái Draft, Signed, Issued, Cancelled. Enum giúp giới hạn giá trị rõ ràng trong schema và service.

**Alternatives considered**:

- String tự do: dễ nhập sai và khó validate.
- Bảng trạng thái riêng: quá phức tạp cho demo nhỏ.

## Decision: API contract dùng OpenAPI YAML

**Rationale**: Dự án là backend API và cần test bằng Postman/Thunder Client. OpenAPI giúp mô tả endpoint, request, response và lỗi rõ ràng mà không gắn với implementation.

**Alternatives considered**:

- Chỉ viết README: dễ đọc nhưng thiếu cấu trúc contract chuẩn.
- Swagger UI runtime: chưa cần trong giai đoạn plan; có thể thêm sau nếu cần.
