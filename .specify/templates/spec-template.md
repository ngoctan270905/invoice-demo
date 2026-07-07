# Đặc tả tính năng: [TÊN TÍNH NĂNG]

**Branch tính năng**: `[###-ten-tinh-nang]`

**Ngày tạo**: [NGÀY]

**Trạng thái**: Nháp

**Đầu vào**: Mô tả từ người dùng: "$ARGUMENTS"

## Kịch bản người dùng & Kiểm thử *(bắt buộc)*

<!--
  QUAN TRỌNG: User story phải được ƯU TIÊN theo hành trình người dùng,
  sắp xếp từ quan trọng nhất tới ít quan trọng hơn.
  Mỗi user story/hành trình phải CÓ THỂ TEST ĐỘC LẬP - nghĩa là nếu chỉ
  triển khai riêng câu chuyện đó, vẫn có một MVP đem lại giá trị.

  Gán priority (P1, P2, P3, v.v.) cho từng story, trong đó P1 là quan trọng nhất.
  Hãy xem mỗi story như một lát cắt chức năng độc lập có thể:
  - Phát triển độc lập
  - Test độc lập
  - Deploy độc lập
  - Demo độc lập cho người dùng
-->

### Câu chuyện người dùng 1 - [Tiêu đề ngắn] (Ưu tiên: P1)

[Mô tả hành trình này bằng ngôn ngữ dễ hiểu]

**Vì sao ưu tiên này**: [Giải thích giá trị và lý do priority này]

**Test độc lập**: [Mô tả cách test độc lập - ví dụ: "Có thể test đầy đủ bằng [hành động cụ thể] và đem lại [giá trị cụ thể]"]

**Kịch bản chấp nhận**:

1. **Given** [trạng thái ban đầu], **When** [hành động], **Then** [kết quả mong đợi]
2. **Given** [trạng thái ban đầu], **When** [hành động], **Then** [kết quả mong đợi]

---

### Câu chuyện người dùng 2 - [Tiêu đề ngắn] (Ưu tiên: P2)

[Mô tả hành trình này bằng ngôn ngữ dễ hiểu]

**Vì sao ưu tiên này**: [Giải thích giá trị và lý do priority này]

**Test độc lập**: [Mô tả cách test độc lập]

**Kịch bản chấp nhận**:

1. **Given** [trạng thái ban đầu], **When** [hành động], **Then** [kết quả mong đợi]

---

### Câu chuyện người dùng 3 - [Tiêu đề ngắn] (Ưu tiên: P3)

[Mô tả hành trình này bằng ngôn ngữ dễ hiểu]

**Vì sao ưu tiên này**: [Giải thích giá trị và lý do priority này]

**Test độc lập**: [Mô tả cách test độc lập]

**Kịch bản chấp nhận**:

1. **Given** [trạng thái ban đầu], **When** [hành động], **Then** [kết quả mong đợi]

---

[Thêm user story nếu cần, mỗi story phải có priority]

### Trường hợp biên

<!--
  CẦN THỰC HIỆN: Nội dung trong phần này là placeholder.
  Hãy điền các trường hợp biên phù hợp.
-->

- Điều gì xảy ra khi [điều kiện biên]?
- Hệ thống xử lý thế nào khi [tình huống lỗi]?

## Yêu cầu *(bắt buộc)*

<!--
  CẦN THỰC HIỆN: Nội dung trong phần này là placeholder.
  Hãy điền các functional requirement phù hợp.
-->

### Yêu cầu chức năng

- **FR-001**: Hệ thống PHẢI [khả năng cụ thể, ví dụ: "cho phép tạo hóa đơn nháp"]
- **FR-002**: Hệ thống PHẢI [rule validate cụ thể, ví dụ: "validate các field bắt buộc của hóa đơn trước khi xử lý"]
- **FR-003**: Người dùng PHẢI có thể [tương tác chính, ví dụ: "xem danh sách hóa đơn"]
- **FR-004**: Hệ thống PHẢI [yêu cầu dữ liệu, ví dụ: "lưu lịch sử thay đổi trạng thái hóa đơn"]
- **FR-005**: Hệ thống PHẢI trả response JSON thống nhất với message success/error rõ ràng

*Ví dụ đánh dấu yêu cầu chưa rõ:*

- **FR-006**: Hệ thống PHẢI xác thực người dùng bằng [CẦN LÀM RÕ: chưa chọn email/password, SSO hay OAuth?]
- **FR-007**: Hệ thống PHẢI lưu dữ liệu người dùng trong [CẦN LÀM RÕ: chưa có thời gian lưu trữ]

### Entity chính *(đưa vào nếu tính năng có dữ liệu)*

- **[Entity 1]**: [Entity này đại diện cho gì, thuộc tính chính là gì, chưa đi vào implementation]
- **[Entity 2]**: [Entity này đại diện cho gì, liên hệ với entity khác thế nào]

## Tiêu chí thành công *(bắt buộc)*

<!--
  CẦN THỰC HIỆN: Định nghĩa tiêu chí thành công đo được.
  Các tiêu chí này phải độc lập công nghệ và có thể đo/kiểm chứng.
-->

### Kết quả đo được

- **SC-001**: [Chỉ số đo được, ví dụ: "Người dùng tạo được hóa đơn nháp trong dưới 2 phút"]
- **SC-002**: [Chỉ số hệ thống, ví dụ: "API trả response đúng schema cho mọi lỗi validate"]
- **SC-003**: [Chỉ số trải nghiệm, ví dụ: "Người dùng test thành công luồng chính bằng Postman ngay lần đầu"]
- **SC-004**: [Chỉ số nghiệp vụ, ví dụ: "Giảm thao tác nhập liệu thủ công cho [X] xuống [Y]"]

## Giả định

<!--
  CẦN THỰC HIỆN: Nội dung trong phần này là placeholder.
  Hãy điền giả định hợp lý được chọn khi mô tả tính năng chưa nêu rõ.
-->

- [Giả định về người dùng mục tiêu, ví dụ: "Người dùng đang học hoặc test demo local"]
- [Giả định về phạm vi, ví dụ: "Ký số, gửi cơ quan thuế, thanh toán và email chỉ là trạng thái mô phỏng"]
- [Giả định về dữ liệu/môi trường, ví dụ: "MySQL chạy local bằng Docker"]
- [Phụ thuộc vào hệ thống/service có sẵn, ví dụ: "Không cần service production bên ngoài cho demo flow"]
