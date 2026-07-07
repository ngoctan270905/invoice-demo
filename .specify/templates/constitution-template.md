# Hiến pháp [TÊN_DỰ_ÁN]
<!-- Ví dụ: Hiến pháp đặc tả, Hiến pháp luồng công việc, v.v. -->

## Nguyên tắc cốt lõi

### [TÊN_NGUYÊN_TẮC_1]
<!-- Ví dụ: I. Ưu tiên thư viện -->
[MÔ_TẢ_NGUYÊN_TẮC_1]
<!-- Ví dụ: Mỗi tính năng bắt đầu như một thư viện độc lập; thư viện phải tự chứa, có thể kiểm thử độc lập và có tài liệu; phải có mục đích rõ ràng - không tạo thư viện chỉ để tổ chức thư mục -->

### [TÊN_NGUYÊN_TẮC_2]
<!-- Ví dụ: II. Giao diện CLI -->
[MÔ_TẢ_NGUYÊN_TẮC_2]
<!-- Ví dụ: Mỗi thư viện cung cấp chức năng qua CLI; giao thức text in/out: stdin/args → stdout, lỗi → stderr; hỗ trợ định dạng JSON và định dạng dễ đọc cho người dùng -->

### [TÊN_NGUYÊN_TẮC_3]
<!-- Ví dụ: III. Viết test trước (KHÔNG THỎA HIỆP) -->
[MÔ_TẢ_NGUYÊN_TẮC_3]
<!-- Ví dụ: Bắt buộc TDD: viết test → người dùng duyệt → test fail → sau đó mới implement; tuân thủ nghiêm ngặt chu trình Red-Green-Refactor -->

### [TÊN_NGUYÊN_TẮC_4]
<!-- Ví dụ: IV. Kiểm thử tích hợp -->
[MÔ_TẢ_NGUYÊN_TẮC_4]
<!-- Ví dụ: Các khu vực cần test tích hợp: contract test cho thư viện mới, thay đổi contract, giao tiếp giữa service, schema dùng chung -->

### [TÊN_NGUYÊN_TẮC_5]
<!-- Ví dụ: V. Quan sát hệ thống, VI. Phiên bản và thay đổi phá vỡ tương thích, VII. Đơn giản -->
[MÔ_TẢ_NGUYÊN_TẮC_5]
<!-- Ví dụ: Text I/O giúp dễ debug; yêu cầu log có cấu trúc; hoặc: định dạng MAJOR.MINOR.BUILD; hoặc: bắt đầu đơn giản, áp dụng nguyên tắc YAGNI -->

## [TÊN_PHẦN_2]
<!-- Ví dụ: Ràng buộc bổ sung, yêu cầu bảo mật, tiêu chuẩn hiệu năng, v.v. -->

[NỘI_DUNG_PHẦN_2]
<!-- Ví dụ: Yêu cầu công nghệ, tiêu chuẩn tuân thủ, chính sách triển khai, v.v. -->

## [TÊN_PHẦN_3]
<!-- Ví dụ: Quy trình phát triển, quy trình review, cổng chất lượng, v.v. -->

[NỘI_DUNG_PHẦN_3]
<!-- Ví dụ: Yêu cầu code review, cổng kiểm thử, quy trình duyệt triển khai, v.v. -->

## Quản trị
<!-- Ví dụ: Hiến pháp có hiệu lực cao hơn các thói quen khác; mọi sửa đổi cần tài liệu, phê duyệt và kế hoạch chuyển đổi -->

[QUY_TẮC_QUẢN_TRỊ]
<!-- Ví dụ: Mọi PR/review phải kiểm tra tuân thủ; độ phức tạp phải được giải thích; dùng [FILE_HƯỚNG_DẪN] cho hướng dẫn phát triển khi chạy thực tế -->

**Phiên bản**: [PHIÊN_BẢN_HIẾN_PHÁP] | **Thông qua**: [NGÀY_THÔNG_QUA] | **Sửa đổi gần nhất**: [NGÀY_SỬA_ĐỔI_GẦN_NHẤT]
<!-- Ví dụ: Phiên bản: 2.1.1 | Thông qua: 2025-06-13 | Sửa đổi gần nhất: 2025-07-16 -->
