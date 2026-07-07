# Kế hoạch triển khai: [TÍNH NĂNG]

**Branch**: `[###-ten-tinh-nang]` | **Ngày**: [NGÀY] | **Spec**: [liên kết]

**Đầu vào**: Đặc tả tính năng từ `/specs/[###-ten-tinh-nang]/spec.md`

**Ghi chú**: Template này được điền bởi lệnh `/speckit-plan`. Xem `.specify/templates/plan-template.md` để biết workflow thực thi.

## Tóm tắt

[Trích từ đặc tả tính năng: yêu cầu chính + hướng tiếp cận kỹ thuật từ research]

## Ngữ cảnh kỹ thuật

<!--
  CẦN THỰC HIỆN: Thay nội dung trong phần này bằng thông tin kỹ thuật
  của dự án. Cấu trúc bên dưới chỉ mang tính gợi ý để hỗ trợ quá trình lặp.
-->

**Ngôn ngữ/Phiên bản**: [ví dụ: Node.js 22, TypeScript 6 hoặc CẦN LÀM RÕ]

**Dependency chính**: [ví dụ: Prisma, thư viện validate nhẹ hoặc CẦN LÀM RÕ]

**Lưu trữ**: [nếu có, ví dụ: MySQL, file hoặc N/A]

**Kiểm thử**: [ví dụ: Postman, Thunder Client, test script hoặc CẦN LÀM RÕ]

**Nền tảng mục tiêu**: [ví dụ: Linux server, local Docker hoặc CẦN LÀM RÕ]

**Loại dự án**: [ví dụ: backend API, web-service, CLI hoặc CẦN LÀM RÕ]

**Mục tiêu hiệu năng**: [theo domain, ví dụ: đủ cho demo local hoặc CẦN LÀM RÕ]

**Ràng buộc**: [theo domain, ví dụ: code đơn giản, hạn chế thư viện, không tích hợp service thật hoặc CẦN LÀM RÕ]

**Quy mô/Phạm vi**: [theo domain, ví dụ: demo học tập, số lượng user nhỏ hoặc CẦN LÀM RÕ]

## Kiểm tra hiến pháp

*CỔNG KIỂM TRA: Phải đạt trước Giai đoạn 0 nghiên cứu. Kiểm tra lại sau Giai đoạn 1 thiết kế.*

- Ưu tiên học tập và đơn giản: implementation dễ hiểu cho người mới học Node.js + TypeScript và tránh thư viện/framework không có lý do.
- Phân lớp backend rõ ràng: API backend tách route, controller, service và repository khi phù hợp.
- Validate input: mọi dữ liệu người dùng gửi lên được validate trước khi vào service hoặc database.
- Response JSON thống nhất: API trả JSON success/error thống nhất với message rõ ràng.
- Phạm vi demo: ký số, gửi cơ quan thuế, thanh toán và email chỉ mô phỏng trừ khi hiến pháp được sửa đổi.
- Dữ liệu rõ ràng: bảng database có tên rõ ràng, khóa chính và khóa ngoại cho quan hệ có ý nghĩa.
- Test thủ công được: hành vi chính test được bằng Postman hoặc Thunder Client.

## Cấu trúc dự án

### Tài liệu cho tính năng này

```text
specs/[###-tinh-nang]/
├── plan.md              # File này (output của /speckit-plan)
├── research.md          # Output Giai đoạn 0 (/speckit-plan)
├── data-model.md        # Output Giai đoạn 1 (/speckit-plan)
├── quickstart.md        # Output Giai đoạn 1 (/speckit-plan)
├── contracts/           # Output Giai đoạn 1 (/speckit-plan)
└── tasks.md             # Output Giai đoạn 2 (/speckit-tasks - KHÔNG tạo bởi /speckit-plan)
```

### Source code (repository root)

<!--
  CẦN THỰC HIỆN: Thay cây thư mục placeholder bên dưới bằng layout thật
  cho tính năng này. Xóa các option không dùng và mở rộng cấu trúc đã chọn
  bằng path thật. Plan cuối cùng không được giữ nhãn Option.
-->

```text
# [XÓA NẾU KHÔNG DÙNG] Option 1: Project đơn
src/
├── config/
├── controllers/
├── middlewares/
├── repositories/
├── routes/
├── services/
├── utils/
└── index.ts

prisma/
└── schema.prisma

tests/
├── integration/
└── unit/

# [XÓA NẾU KHÔNG DÙNG] Option 2: Web app có frontend + backend
backend/
├── src/
│   ├── controllers/
│   ├── repositories/
│   ├── routes/
│   └── services/
└── tests/

frontend/
├── src/
│   ├── app/
│   ├── components/
│   └── services/
└── tests/
```

**Quyết định cấu trúc**: [Ghi cấu trúc được chọn và tham chiếu các thư mục thật ở trên]

## Theo dõi độ phức tạp

> **Chỉ điền nếu có vi phạm Kiểm tra hiến pháp cần giải thích**

| Vi phạm | Vì sao cần | Phương án đơn giản hơn bị từ chối vì |
|---------|------------|--------------------------------------|
| [ví dụ: thêm framework mới] | [nhu cầu hiện tại] | [vì sao Node.js thuần không đủ] |
| [ví dụ: repository pattern] | [vấn đề cụ thể] | [vì sao truy cập DB trực tiếp không phù hợp] |
