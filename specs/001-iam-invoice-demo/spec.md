# Đặc tả tính năng: IAM INVOICE Demo - Quản Lý Hóa Đơn Điện Tử

**Branch tính năng**: `[001-iam-invoice-demo]`

**Ngày tạo**: 2026-07-07

**Trạng thái**: Nháp

**Đầu vào**: Mô tả từ người dùng: "Xây dựng ứng dụng demo có tên IAM INVOICE Demo - Quản Lý Hóa Đơn Điện Tử, hỗ trợ quản lý khách hàng, tạo hóa đơn, tính VAT, tra cứu hóa đơn và quản lý trạng thái hóa đơn ở phạm vi mô phỏng."

## Clarifications

### Session 2026-07-07

- Q: Hóa đơn được phép chuyển trạng thái theo quy tắc nào? → A: Theo luồng cố định Draft → Signed → Issued; Cancelled chỉ được chuyển từ Draft hoặc Signed.
- Q: Mã hóa đơn nên được tạo như thế nào? → A: Hệ thống tự sinh mã hóa đơn duy nhất khi tạo hóa đơn.
- Q: VAT nên được áp dụng như thế nào trong demo? → A: Hỗ trợ các mức VAT cố định 0%, 5%, 10%.
- Q: Khi thêm khách hàng, hệ thống cần chặn trùng theo trường nào? → A: Chỉ chặn trùng mã số thuế.
- Q: Bản demo này có cần chức năng đăng nhập/phân quyền không? → A: Không cần đăng nhập/phân quyền trong demo này.

## Kịch bản người dùng & Kiểm thử *(bắt buộc)*

### Câu chuyện người dùng 1 - Quản lý khách hàng (Ưu tiên: P1)

Nhân viên kế toán, nhân viên kinh doanh hoặc quản trị viên có thể thêm khách hàng mới và xem danh sách khách hàng đã lưu để dùng khi lập hóa đơn.

**Vì sao ưu tiên này**: Khách hàng là dữ liệu nền tảng để tạo hóa đơn. Không có khách hàng thì không thể hoàn thành luồng lập hóa đơn cơ bản.

**Test độc lập**: Có thể test bằng cách thêm một khách hàng với đầy đủ thông tin công ty, mã số thuế, địa chỉ, email, số điện thoại và kiểm tra khách hàng xuất hiện trong danh sách.

**Kịch bản chấp nhận**:

1. **Given** nhân viên có thông tin khách hàng hợp lệ, **When** nhân viên thêm khách hàng mới, **Then** hệ thống lưu khách hàng và trả thông báo tạo khách hàng thành công.
2. **Given** đã có khách hàng trong hệ thống, **When** nhân viên xem danh sách khách hàng, **Then** hệ thống hiển thị toàn bộ khách hàng đã lưu cùng các thông tin chính.
3. **Given** nhân viên nhập thiếu tên công ty hoặc mã số thuế, **When** nhân viên gửi yêu cầu thêm khách hàng, **Then** hệ thống từ chối và trả thông báo lỗi rõ ràng.
4. **Given** mã số thuế đã thuộc về một khách hàng đã lưu, **When** nhân viên thêm khách hàng mới với mã số thuế đó, **Then** hệ thống từ chối và trả thông báo mã số thuế đã tồn tại.

---

### Câu chuyện người dùng 2 - Tạo hóa đơn và tự động tính tiền (Ưu tiên: P1)

Nhân viên có thể tạo hóa đơn mới bằng cách chọn khách hàng có sẵn, thêm một hoặc nhiều sản phẩm hoặc dịch vụ, sau đó hệ thống tự động tính tiền hàng, tiền VAT và tổng tiền thanh toán.

**Vì sao ưu tiên này**: Đây là luồng nghiệp vụ chính của ứng dụng hóa đơn điện tử demo.

**Test độc lập**: Có thể test bằng cách chọn một khách hàng, nhập nhiều dòng sản phẩm/dịch vụ với số lượng, đơn giá và một trong các mức VAT 0%, 5%, 10%, sau đó kiểm tra các tổng tiền được tính đúng.

**Kịch bản chấp nhận**:

1. **Given** đã có khách hàng hợp lệ và danh sách sản phẩm/dịch vụ hợp lệ, **When** nhân viên tạo hóa đơn, **Then** hệ thống tạo hóa đơn ở trạng thái Draft và tính đúng tiền hàng, tiền VAT, tổng thanh toán.
2. **Given** hóa đơn có nhiều dòng sản phẩm/dịch vụ, **When** hệ thống tính tổng, **Then** tiền hàng bằng tổng giá trị trước thuế của tất cả dòng và tổng thanh toán bằng tiền hàng cộng tiền VAT.
3. **Given** nhân viên tạo hóa đơn không có dòng sản phẩm/dịch vụ, **When** gửi yêu cầu tạo hóa đơn, **Then** hệ thống từ chối và trả thông báo lỗi rõ ràng.

---

### Câu chuyện người dùng 3 - Tra cứu và xem chi tiết hóa đơn (Ưu tiên: P2)

Nhân viên có thể xem danh sách hóa đơn đã tạo, tìm kiếm hóa đơn theo mã hóa đơn hoặc tên khách hàng, và xem chi tiết từng hóa đơn.

**Vì sao ưu tiên này**: Sau khi hóa đơn được tạo, người dùng cần tra cứu lại để kiểm tra thông tin, đối soát và theo dõi xử lý.

**Test độc lập**: Có thể test bằng cách tạo một số hóa đơn, tìm kiếm theo mã hóa đơn hoặc tên khách hàng, sau đó mở chi tiết một hóa đơn và đối chiếu thông tin.

**Kịch bản chấp nhận**:

1. **Given** đã có nhiều hóa đơn trong hệ thống, **When** nhân viên xem danh sách hóa đơn, **Then** hệ thống hiển thị các hóa đơn với mã hóa đơn, tên khách hàng, tổng tiền và trạng thái.
2. **Given** nhân viên nhập mã hóa đơn hoặc tên khách hàng có tồn tại, **When** nhân viên tìm kiếm, **Then** hệ thống trả về các hóa đơn phù hợp.
3. **Given** nhân viên chọn một hóa đơn cụ thể, **When** xem chi tiết, **Then** hệ thống hiển thị thông tin khách hàng, các dòng sản phẩm/dịch vụ, tiền hàng, VAT, tổng tiền và trạng thái.

---

### Câu chuyện người dùng 4 - Quản lý trạng thái hóa đơn mô phỏng (Ưu tiên: P3)

Nhân viên có thể theo dõi và cập nhật trạng thái xử lý của hóa đơn theo luồng Draft → Signed → Issued; trạng thái Cancelled chỉ được chuyển từ Draft hoặc Signed.

**Vì sao ưu tiên này**: Trạng thái giúp mô phỏng vòng đời hóa đơn, nhưng không cần tích hợp chữ ký số thật hoặc cơ quan thuế thật trong bản demo.

**Test độc lập**: Có thể test bằng cách tạo hóa đơn mới, kiểm tra trạng thái mặc định là Draft, cập nhật theo luồng hợp lệ, và kiểm tra hệ thống từ chối chuyển trạng thái không hợp lệ.

**Kịch bản chấp nhận**:

1. **Given** nhân viên tạo hóa đơn mới, **When** hóa đơn được lưu, **Then** trạng thái mặc định của hóa đơn là Draft.
2. **Given** hóa đơn đang ở trạng thái Draft, **When** nhân viên cập nhật trạng thái thành Signed hoặc Cancelled, **Then** hệ thống lưu trạng thái mới và trả thông báo cập nhật thành công.
3. **Given** hóa đơn đang ở trạng thái Signed, **When** nhân viên cập nhật trạng thái thành Issued hoặc Cancelled, **Then** hệ thống lưu trạng thái mới và trả thông báo cập nhật thành công.
4. **Given** hóa đơn đang ở trạng thái Issued hoặc Cancelled, **When** nhân viên yêu cầu đổi sang trạng thái khác, **Then** hệ thống từ chối và trả thông báo lỗi rõ ràng.
5. **Given** nhân viên gửi trạng thái không thuộc Draft, Signed, Issued hoặc Cancelled, **When** cập nhật trạng thái, **Then** hệ thống từ chối và trả thông báo lỗi rõ ràng.

---

### Trường hợp biên

- Điều gì xảy ra khi mã số thuế khách hàng bị trùng với khách hàng đã tồn tại?
- Điều gì xảy ra khi email khách hàng không đúng định dạng?
- Điều gì xảy ra khi số lượng sản phẩm/dịch vụ bằng 0 hoặc đơn giá nhỏ hơn 0?
- Điều gì xảy ra khi hóa đơn tham chiếu tới khách hàng không tồn tại?
- Điều gì xảy ra khi tìm kiếm hóa đơn không có kết quả phù hợp?
- Điều gì xảy ra khi người dùng yêu cầu xem chi tiết hóa đơn không tồn tại?
- Điều gì xảy ra khi tính tiền VAT cho nhiều dòng hóa đơn có giá trị khác nhau?
- Điều gì xảy ra khi người dùng yêu cầu chuyển trạng thái hóa đơn không đúng luồng Draft → Signed → Issued hoặc hủy hóa đơn sau khi đã Issued?

## Yêu cầu *(bắt buộc)*

### Yêu cầu chức năng

- **FR-001**: Hệ thống PHẢI cho phép thêm mới khách hàng với tên công ty, mã số thuế, địa chỉ, email và số điện thoại.
- **FR-002**: Hệ thống PHẢI validate dữ liệu khách hàng trước khi lưu, bao gồm tối thiểu tên công ty, mã số thuế, email hợp lệ và số điện thoại nếu được nhập.
- **FR-003**: Hệ thống PHẢI không cho phép tạo khách hàng mới nếu mã số thuế đã tồn tại.
- **FR-004**: Hệ thống PHẢI cho phép xem danh sách toàn bộ khách hàng đã lưu.
- **FR-005**: Hệ thống PHẢI cho phép tạo hóa đơn mới bằng cách chọn một khách hàng đã tồn tại.
- **FR-006**: Hệ thống PHẢI tự sinh mã hóa đơn duy nhất khi tạo hóa đơn mới.
- **FR-007**: Hệ thống PHẢI cho phép thêm một hoặc nhiều dòng sản phẩm/dịch vụ vào hóa đơn.
- **FR-008**: Mỗi dòng sản phẩm/dịch vụ PHẢI có tên, số lượng, đơn giá và một mức VAT thuộc 0%, 5% hoặc 10%.
- **FR-009**: Hệ thống PHẢI từ chối dòng sản phẩm/dịch vụ có mức VAT ngoài 0%, 5% hoặc 10%.
- **FR-010**: Hệ thống PHẢI tự động tính tiền hàng trước thuế bằng tổng giá trị các dòng sản phẩm/dịch vụ.
- **FR-011**: Hệ thống PHẢI tự động tính tiền VAT dựa trên giá trị từng dòng và thuế suất VAT tương ứng.
- **FR-012**: Hệ thống PHẢI tự động tính tổng thanh toán bằng tiền hàng trước thuế cộng tiền VAT.
- **FR-013**: Hóa đơn mới được tạo PHẢI có trạng thái mặc định là Draft.
- **FR-014**: Hệ thống PHẢI cho phép xem danh sách toàn bộ hóa đơn đã tạo.
- **FR-015**: Hệ thống PHẢI cho phép xem chi tiết một hóa đơn, bao gồm thông tin khách hàng, danh sách dòng hàng, tiền hàng, VAT, tổng tiền và trạng thái.
- **FR-016**: Hệ thống PHẢI cho phép tìm kiếm hóa đơn theo mã hóa đơn hoặc theo tên khách hàng.
- **FR-017**: Hệ thống PHẢI hỗ trợ đúng bốn trạng thái hóa đơn: Draft, Signed, Issued và Cancelled.
- **FR-018**: Hệ thống PHẢI cho phép chuyển trạng thái hóa đơn theo luồng Draft → Signed → Issued; trạng thái Cancelled chỉ được chuyển từ Draft hoặc Signed.
- **FR-019**: Hệ thống PHẢI từ chối mọi yêu cầu chuyển trạng thái không hợp lệ, bao gồm hủy hóa đơn đã Issued hoặc đổi trạng thái sau khi đã Cancelled.
- **FR-020**: Hệ thống PHẢI mô phỏng ký số, phát hành, hủy hóa đơn, thanh toán và gửi email bằng trạng thái dữ liệu, không tích hợp dịch vụ thật.
- **FR-021**: Hệ thống PHẢI trả response JSON thống nhất cho cả thành công và lỗi, với message rõ ràng.
- **FR-022**: Hệ thống PHẢI từ chối thao tác tạo hoặc cập nhật nếu dữ liệu đầu vào không hợp lệ và PHẢI trả lý do lỗi cụ thể.
- **FR-023**: Bản demo KHÔNG bao gồm chức năng đăng nhập hoặc phân quyền người dùng.

### Entity chính *(đưa vào nếu tính năng có dữ liệu)*

- **Khách hàng**: Đại diện cho doanh nghiệp hoặc đơn vị mua hàng, gồm tên công ty, mã số thuế, địa chỉ, email và số điện thoại.
- **Hóa đơn**: Đại diện cho chứng từ bán hàng được tạo cho một khách hàng, gồm mã hóa đơn, khách hàng liên quan, ngày tạo, tiền hàng, tiền VAT, tổng thanh toán và trạng thái.
- **Dòng hóa đơn**: Đại diện cho một sản phẩm hoặc dịch vụ trong hóa đơn, gồm tên hàng/dịch vụ, số lượng, đơn giá, thuế suất VAT, thành tiền trước thuế và tiền thuế của dòng.
- **Trạng thái hóa đơn**: Giá trị mô tả vòng đời xử lý hiện tại của hóa đơn, gồm Draft, Signed, Issued và Cancelled. Trạng thái hợp lệ đi theo luồng Draft → Signed → Issued; Cancelled chỉ được chuyển từ Draft hoặc Signed.

## Tiêu chí thành công *(bắt buộc)*

### Kết quả đo được

- **SC-001**: Người dùng có thể thêm khách hàng mới với đầy đủ thông tin bắt buộc trong dưới 2 phút.
- **SC-002**: Người dùng có thể tạo hóa đơn có ít nhất 2 dòng sản phẩm/dịch vụ và nhìn thấy tiền hàng, VAT, tổng thanh toán được tính chính xác theo dữ liệu nhập.
- **SC-003**: 100% hóa đơn mới được tạo có trạng thái mặc định là Draft.
- **SC-004**: Người dùng có thể tìm thấy hóa đơn đã tạo bằng mã hóa đơn hoặc tên khách hàng trong danh sách kết quả phù hợp.
- **SC-005**: Người dùng có thể xem đầy đủ chi tiết hóa đơn, bao gồm khách hàng, dòng hàng, tổng tiền và trạng thái, trong một lần tra cứu.
- **SC-006**: 100% thao tác nhập dữ liệu không hợp lệ trong các luồng chính trả về message lỗi rõ ràng để người dùng biết cần sửa gì.
- **SC-007**: Người dùng có thể kiểm thử các luồng chính bằng Postman hoặc Thunder Client mà không cần kết nối chữ ký số thật, cơ quan thuế thật, thanh toán thật hoặc email thật.
- **SC-008**: 100% yêu cầu chuyển trạng thái không đúng luồng bị từ chối với message lỗi rõ ràng.

## Giả định

- Người dùng của demo là nhân viên kế toán, nhân viên kinh doanh hoặc quản trị viên doanh nghiệp dùng hệ thống ở mức cơ bản.
- Bản demo không yêu cầu đăng nhập; mọi thao tác được xem như thực hiện bởi một người dùng demo.
- Mỗi hóa đơn gắn với đúng một khách hàng đã tồn tại.
- Mỗi hóa đơn phải có ít nhất một dòng sản phẩm hoặc dịch vụ.
- Mã hóa đơn là định danh duy nhất dùng để tra cứu hóa đơn.
- Các giá trị tiền được tính từ dữ liệu dòng hóa đơn và được lưu để phục vụ tra cứu.
- Ký số, phát hành, hủy, thanh toán và gửi email chỉ là trạng thái hoặc hành vi mô phỏng trong phạm vi demo.
- Không yêu cầu tích hợp service production bên ngoài trong bản demo này.
