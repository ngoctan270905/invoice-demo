---

description: "Template danh sách công việc cho triển khai tính năng"
---

# Công việc: [TÊN TÍNH NĂNG]

**Đầu vào**: Tài liệu thiết kế từ `/specs/[###-ten-tinh-nang]/`

**Điều kiện trước**: plan.md (bắt buộc), spec.md (bắt buộc cho câu chuyện người dùng), research.md, data-model.md, contracts/

**Kiểm thử**: Các ví dụ bên dưới có công việc kiểm thử. Kiểm thử là TÙY CHỌN - chỉ thêm nếu đặc tả tính năng yêu cầu rõ.

**Tổ chức**: Công việc được nhóm theo câu chuyện người dùng để mỗi câu chuyện có thể triển khai và kiểm thử độc lập.

## Định dạng: `[ID] [P?] [Story] Mô tả`

- **[P]**: Có thể chạy song song (khác file, không phụ thuộc nhau)
- **[Story]**: Công việc thuộc câu chuyện người dùng nào (ví dụ: US1, US2, US3)
- Mô tả phải có path file chính xác

## Quy ước path

- **Project đơn**: `src/`, `tests/` ở repository root
- **Web app**: `backend/src/`, `frontend/src/`
- Path bên dưới giả định project đơn - điều chỉnh theo cấu trúc trong plan.md

<!--
  ============================================================================
  QUAN TRỌNG: Các công việc bên dưới chỉ là CÔNG VIỆC MẪU để minh họa.

  Lệnh /speckit-tasks PHẢI thay chúng bằng công việc thật dựa trên:
  - Câu chuyện người dùng từ spec.md (với priority P1, P2, P3...)
  - Yêu cầu tính năng từ plan.md
  - Entity từ data-model.md
  - Endpoint từ contracts/

  Công việc PHẢI được tổ chức theo câu chuyện người dùng để mỗi câu chuyện có thể:
  - Triển khai độc lập
  - Kiểm thử độc lập
  - Bàn giao như một phần tăng trưởng MVP

  KHÔNG giữ lại các công việc mẫu này trong file tasks.md được tạo.
  ============================================================================
-->

## Giai đoạn 1: Thiết lập (Hạ tầng dùng chung)

**Mục đích**: Khởi tạo project và cấu trúc cơ bản

- [ ] T001 Tạo cấu trúc project theo kế hoạch triển khai
- [ ] T002 Khởi tạo project [ngôn ngữ] với dependency [framework/thư viện]
- [ ] T003 [P] Cấu hình linting và formatting tools

---

## Giai đoạn 2: Nền tảng (Điều kiện chặn bắt buộc)

**Mục đích**: Hạ tầng lõi PHẢI hoàn thành trước khi triển khai BẤT KỲ câu chuyện người dùng nào

**⚠️ QUAN TRỌNG**: Không bắt đầu công việc cho câu chuyện người dùng cho tới khi giai đoạn này hoàn tất

Ví dụ công việc nền tảng (điều chỉnh theo project):

- [ ] T004 Thiết lập database schema và migration
- [ ] T005 [P] Triển khai authentication/authorization nếu tính năng yêu cầu
- [ ] T006 [P] Thiết lập cấu trúc API route/controller/service/repository
- [ ] T007 Tạo model/entity nền tảng mà các câu chuyện phụ thuộc
- [ ] T008 Cấu hình helper response JSON và error handling thống nhất
- [ ] T009 Thiết lập quản lý cấu hình môi trường
- [ ] T010 Thêm shared input validation utilities hoặc validation pattern

**Điểm kiểm tra**: Nền tảng sẵn sàng - có thể bắt đầu triển khai câu chuyện người dùng song song

---

## Giai đoạn 3: Câu chuyện người dùng 1 - [Tiêu đề] (Ưu tiên: P1) 🎯 MVP

**Mục tiêu**: [Mô tả ngắn câu chuyện này đem lại gì]

**Kiểm thử độc lập**: [Cách kiểm chứng câu chuyện này hoạt động độc lập]

### Kiểm thử cho Câu chuyện người dùng 1 (TÙY CHỌN - chỉ khi spec yêu cầu) ⚠️

> **GHI CHÚ: Viết các kiểm thử này TRƯỚC, đảm bảo kiểm thử FAIL trước khi triển khai**

- [ ] T011 [P] [US1] Kiểm thử contract cho [endpoint] trong tests/contract/[ten].test.ts
- [ ] T012 [P] [US1] Kiểm thử tích hợp cho [hành trình người dùng] trong tests/integration/[ten].test.ts

### Triển khai cho Câu chuyện người dùng 1

- [ ] T013 [P] [US1] Tạo [Entity1] model trong prisma/schema.prisma hoặc src/models/[entity1].ts
- [ ] T014 [P] [US1] Tạo [Entity2] model trong prisma/schema.prisma hoặc src/models/[entity2].ts
- [ ] T015 [US1] Triển khai repository trong src/repositories/[repository].ts nếu cần database
- [ ] T016 [US1] Triển khai service trong src/services/[service].ts (phụ thuộc T013-T015)
- [ ] T017 [US1] Triển khai controller trong src/controllers/[controller].ts
- [ ] T018 [US1] Map route trong src/routes/[route].ts
- [ ] T019 [US1] Thêm validation và error handling thống nhất

**Điểm kiểm tra**: Câu chuyện người dùng 1 đã hoạt động đầy đủ và kiểm thử độc lập được

---

## Giai đoạn 4: Câu chuyện người dùng 2 - [Tiêu đề] (Ưu tiên: P2)

**Mục tiêu**: [Mô tả ngắn câu chuyện này đem lại gì]

**Kiểm thử độc lập**: [Cách kiểm chứng câu chuyện này hoạt động độc lập]

### Kiểm thử cho Câu chuyện người dùng 2 (TÙY CHỌN - chỉ khi spec yêu cầu) ⚠️

- [ ] T020 [P] [US2] Kiểm thử contract cho [endpoint] trong tests/contract/[ten].test.ts
- [ ] T021 [P] [US2] Kiểm thử tích hợp cho [hành trình người dùng] trong tests/integration/[ten].test.ts

### Triển khai cho Câu chuyện người dùng 2

- [ ] T022 [P] [US2] Tạo [Entity] model trong prisma/schema.prisma hoặc src/models/[entity].ts
- [ ] T023 [US2] Triển khai repository trong src/repositories/[repository].ts nếu cần database
- [ ] T024 [US2] Triển khai service trong src/services/[service].ts
- [ ] T025 [US2] Triển khai controller và route trong src/controllers/ và src/routes/
- [ ] T026 [US2] Tích hợp với component của Câu chuyện người dùng 1 nếu cần

**Điểm kiểm tra**: Câu chuyện người dùng 1 và 2 đều hoạt động độc lập

---

## Giai đoạn 5: Câu chuyện người dùng 3 - [Tiêu đề] (Ưu tiên: P3)

**Mục tiêu**: [Mô tả ngắn câu chuyện này đem lại gì]

**Kiểm thử độc lập**: [Cách kiểm chứng câu chuyện này hoạt động độc lập]

### Kiểm thử cho Câu chuyện người dùng 3 (TÙY CHỌN - chỉ khi spec yêu cầu) ⚠️

- [ ] T027 [P] [US3] Kiểm thử contract cho [endpoint] trong tests/contract/[ten].test.ts
- [ ] T028 [P] [US3] Kiểm thử tích hợp cho [hành trình người dùng] trong tests/integration/[ten].test.ts

### Triển khai cho Câu chuyện người dùng 3

- [ ] T029 [P] [US3] Tạo [Entity] model trong prisma/schema.prisma hoặc src/models/[entity].ts
- [ ] T030 [US3] Triển khai repository/service nếu cần
- [ ] T031 [US3] Triển khai controller và route
- [ ] T032 [US3] Thêm validation và response JSON thống nhất

**Điểm kiểm tra**: Tất cả câu chuyện người dùng đã hoạt động độc lập

---

[Thêm giai đoạn câu chuyện người dùng nếu cần, theo cùng format]

---

## Giai đoạn N: Hoàn thiện & nội dung dùng chung

**Mục đích**: Cải thiện ảnh hưởng nhiều câu chuyện người dùng

- [ ] TXXX [P] Cập nhật tài liệu trong docs/ hoặc README.md
- [ ] TXXX Dọn code và refactor
- [ ] TXXX Tối ưu đơn giản nếu cần
- [ ] TXXX [P] Thêm unit test nếu được yêu cầu trong tests/unit/
- [ ] TXXX Kiểm tra bảo mật cơ bản cho input và lỗi API
- [ ] TXXX Validate quickstart.md
- [ ] TXXX Test luồng chính bằng Postman hoặc Thunder Client

---

## Phụ thuộc & thứ tự thực hiện

### Phụ thuộc giữa giai đoạn

- **Thiết lập (Giai đoạn 1)**: Không có phụ thuộc - có thể bắt đầu ngay
- **Nền tảng (Giai đoạn 2)**: Phụ thuộc Thiết lập hoàn tất - CHẶN tất cả câu chuyện người dùng
- **Câu chuyện người dùng (Giai đoạn 3+)**: Tất cả phụ thuộc Nền tảng hoàn tất
  - Sau đó câu chuyện người dùng có thể chạy song song nếu đủ người
  - Hoặc chạy tuần tự theo priority (P1 → P2 → P3)
- **Hoàn thiện (Giai đoạn cuối)**: Phụ thuộc các câu chuyện người dùng mong muốn đã hoàn tất

### Phụ thuộc giữa câu chuyện người dùng

- **Câu chuyện người dùng 1 (P1)**: Có thể bắt đầu sau Nền tảng - không phụ thuộc câu chuyện khác
- **Câu chuyện người dùng 2 (P2)**: Có thể bắt đầu sau Nền tảng - có thể tích hợp US1 nhưng vẫn phải kiểm thử độc lập
- **Câu chuyện người dùng 3 (P3)**: Có thể bắt đầu sau Nền tảng - có thể tích hợp US1/US2 nhưng vẫn phải kiểm thử độc lập

### Bên trong mỗi câu chuyện người dùng

- Test (nếu có) PHẢI được viết và FAIL trước khi triển khai
- Model trước repository
- Repository trước service khi cần truy cập database
- Service trước controller và route
- Validation và JSON error thống nhất trước khi coi endpoint hoàn tất
- Triển khai lõi trước tích hợp
- Câu chuyện hoàn tất trước khi chuyển sang priority tiếp theo nếu làm tuần tự

### Cơ hội chạy song song

- Các công việc Thiết lập đánh dấu [P] có thể chạy song song
- Các công việc Nền tảng đánh dấu [P] có thể chạy song song trong Giai đoạn 2
- Khi Nền tảng hoàn tất, các câu chuyện người dùng có thể bắt đầu song song nếu đủ người
- Các kiểm thử của cùng câu chuyện người dùng đánh dấu [P] có thể chạy song song
- Các model trong cùng câu chuyện đánh dấu [P] có thể chạy song song
- Các câu chuyện người dùng khác nhau có thể do nhiều người làm song song

---

## Ví dụ chạy song song: Câu chuyện người dùng 1

```bash
# Chạy tất cả kiểm thử của Câu chuyện người dùng 1 cùng lúc (nếu spec yêu cầu kiểm thử):
Task: "Kiểm thử contract cho [endpoint] trong tests/contract/[ten].test.ts"
Task: "Kiểm thử tích hợp cho [hành trình người dùng] trong tests/integration/[ten].test.ts"

# Tạo các model của Câu chuyện người dùng 1 cùng lúc:
Task: "Tạo [Entity1] model trong prisma/schema.prisma hoặc src/models/[entity1].ts"
Task: "Tạo [Entity2] model trong prisma/schema.prisma hoặc src/models/[entity2].ts"
```

---

## Chiến lược triển khai

### MVP trước (chỉ Câu chuyện người dùng 1)

1. Hoàn tất Giai đoạn 1: Thiết lập
2. Hoàn tất Giai đoạn 2: Nền tảng (QUAN TRỌNG - chặn mọi câu chuyện)
3. Hoàn tất Giai đoạn 3: Câu chuyện người dùng 1
4. **DỪNG và VALIDATE**: Test Câu chuyện người dùng 1 độc lập
5. Demo nếu đã sẵn sàng

### Bàn giao tăng dần

1. Hoàn tất Thiết lập + Nền tảng → nền tảng sẵn sàng
2. Thêm Câu chuyện người dùng 1 → kiểm thử độc lập → demo MVP
3. Thêm Câu chuyện người dùng 2 → kiểm thử độc lập → demo
4. Thêm Câu chuyện người dùng 3 → kiểm thử độc lập → demo
5. Mỗi câu chuyện thêm giá trị mà không làm hỏng câu chuyện trước

### Chiến lược team song song

Với nhiều developer:

1. Cả team hoàn tất Thiết lập + Nền tảng
2. Khi Nền tảng xong:
   - Developer A: Câu chuyện người dùng 1
   - Developer B: Câu chuyện người dùng 2
   - Developer C: Câu chuyện người dùng 3
3. Các câu chuyện hoàn tất và tích hợp độc lập

---

## Ghi chú

- [P] công việc = khác file, không phụ thuộc nhau
- Nhãn [Story] map công việc với câu chuyện người dùng để trace dễ hơn
- Mỗi câu chuyện người dùng phải có thể hoàn thành và kiểm thử độc lập
- Kiểm tra kiểm thử fail trước khi triển khai nếu có kiểm thử
- Commit sau mỗi công việc hoặc nhóm công việc hợp lý
- Dừng tại điểm kiểm tra để validate câu chuyện độc lập
- Tránh: công việc mơ hồ, conflict cùng file, phụ thuộc chéo làm mất tính độc lập của câu chuyện
