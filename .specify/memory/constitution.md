<!--
Báo cáo tác động đồng bộ
Thay đổi phiên bản: template → 1.0.0
Nguyên tắc đã sửa:
- Nguyên tắc mẫu 1 → I. Ưu tiên đơn giản để học tập
- Nguyên tắc mẫu 2 → II. Phân lớp backend rõ ràng
- Nguyên tắc mẫu 3 → III. Validate dữ liệu trước khi xử lý
- Nguyên tắc mẫu 4 → IV. Response JSON thống nhất
- Nguyên tắc mẫu 5 → V. Phạm vi demo và khả năng test thực tế
Phần đã thêm:
- Ràng buộc công nghệ và dữ liệu
- Quy trình phát triển
Phần đã xóa: Không có
Template cần cập nhật:
- ✅ đã cập nhật .specify/templates/plan-template.md
- ✅ đã cập nhật .specify/templates/spec-template.md
- ✅ đã cập nhật .specify/templates/tasks-template.md
- ✅ đã kiểm tra .specify/templates/commands/*.md (không có thư mục này)
- ✅ đã kiểm tra README.md
TODO cần xử lý sau: Không có
-->
# Hiến pháp IAM Invoice Demo

## Nguyên tắc cốt lõi

### I. Ưu tiên đơn giản để học tập

Dự án này PHẢI luôn là demo học tập cho nghiệp vụ quản lý hóa đơn điện tử IAM INVOICE.
Code PHẢI đơn giản, dễ đọc và phù hợp với người đang học Node.js và TypeScript. Tính năng
KHÔNG ĐƯỢC thêm abstraction, framework, thư viện hoặc tích hợp production không cần thiết nếu
không được giải thích rõ trong đặc tả tính năng.

Lý do: dự án dùng để học nền tảng backend trước khi thêm độ phức tạp ở mức production.

### II. Phân lớp backend rõ ràng

Code API backend PHẢI tách trách nhiệm route, controller, service và repository khi các lớp đó
được sử dụng. File route CHỈ ĐƯỢC map HTTP request tới controller. Controller được đọc ngữ cảnh
request và trả response, nhưng KHÔNG ĐƯỢC chứa logic nghiệp vụ. Service PHẢI chứa quy tắc nghiệp vụ.
Repository PHẢI chứa logic truy cập database khi cần truy cập database.

Lý do: phân lớp rõ ràng giúp codebase dễ hiểu, dễ test và dễ mở rộng.

### III. Validate dữ liệu trước khi xử lý

Mọi input do người dùng gửi lên PHẢI được validate trước khi chạy logic nghiệp vụ hoặc thao tác
database. Khi validate thất bại, hệ thống PHẢI dừng xử lý và trả message lỗi rõ ràng. Các field
bắt buộc, kiểu dữ liệu, giá trị hợp lệ, định danh và ràng buộc quan hệ PHẢI được kiểm tra tại
biên API.

Lý do: validate giúp tránh lỗi khó hiểu, dữ liệu sai trong database và giả định không an toàn
trong service.

### IV. Response JSON thống nhất

Mọi API endpoint PHẢI trả response JSON theo cấu trúc thống nhất. Response thành công PHẢI có
message rõ ràng hoặc data payload. Response lỗi PHẢI có message dễ hiểu và HTTP status code phù
hợp. KHÔNG ĐƯỢC expose raw stack trace, lỗi database thô hoặc chi tiết implementation nội bộ
trong API response.

Lý do: response thống nhất giúp API dễ test bằng Postman hoặc Thunder Client và dễ tích hợp với
frontend trong tương lai.

### V. Phạm vi demo và khả năng test thực tế

Demo KHÔNG ĐƯỢC tích hợp ký số thật, gửi cơ quan thuế thật, thanh toán thật hoặc gửi email thật.
Các luồng đó PHẢI được biểu diễn bằng trạng thái dữ liệu mô phỏng cho đến khi có sửa đổi hiến
pháp mở rộng phạm vi. Tính năng chính PHẢI test được bằng Postman hoặc Thunder Client mà không
cần service production bên ngoài.

Lý do: mô phỏng hệ thống bên ngoài giúp demo tránh rủi ro không cần thiết và giữ trọng tâm học
backend design.

## Ràng buộc công nghệ và dữ liệu

Ngôn ngữ ưu tiên là TypeScript trên Node.js. Dependency NÊN giới hạn ở các thư viện hỗ trợ trực
tiếp cho demo học tập, ví dụ Prisma cho truy cập database. Framework hoặc thư viện nặng mới
PHẢI được giải thích trong kế hoạch triển khai trước khi dùng.

Khi dùng database, bảng PHẢI có tên rõ ràng, cột dễ hiểu, khóa chính và khóa ngoại cho các quan
hệ có ý nghĩa. Thiết kế database PHẢI ưu tiên sự rõ ràng hơn tối ưu hóa quá sớm.

## Quy trình phát triển

Mỗi đặc tả tính năng PHẢI định nghĩa cách kiểm chứng tính năng độc lập. Tính năng backend NÊN có
bước kiểm thử thủ công bằng Postman hoặc Thunder Client. Kế hoạch triển khai PHẢI kiểm tra rằng
ranh giới route, controller, service và repository được tuân thủ khi có API backend.

Công việc PHẢI nằm trong phạm vi demo. Nếu tính năng được yêu cầu liên quan tới ký số, tích hợp
cơ quan thuế, thanh toán hoặc gửi email, implementation PHẢI mô hình hóa bằng trạng thái mô
phỏng hoặc mock behavior trừ khi hiến pháp được sửa đổi trước.

## Quản trị

Hiến pháp này có hiệu lực cao hơn các thói quen dự án và template được sinh tự động nếu có xung
đột. Đặc tả tính năng, kế hoạch triển khai, task và thay đổi code PHẢI được review để kiểm tra
tuân thủ các nguyên tắc này.

Mọi sửa đổi PHẢI ghi rõ lý do thay đổi, cập nhật template phụ thuộc khi cần và bump version theo
semantic versioning:

- MAJOR: xóa nguyên tắc hoặc định nghĩa lại theo cách không tương thích ngược.
- MINOR: thêm nguyên tắc mới hoặc mở rộng đáng kể governance.
- PATCH: chỉnh câu chữ, sửa typo hoặc thay đổi không làm đổi nghĩa.

Review tuân thủ PHẢI diễn ra trong giai đoạn planning và một lần nữa trước khi xem implementation
là hoàn tất. Vi phạm có chủ ý PHẢI được ghi trong plan cùng phương án đơn giản hơn và lý do từ
chối phương án đó.

**Phiên bản**: 1.0.0 | **Thông qua**: 2026-07-07 | **Sửa đổi gần nhất**: 2026-07-07
