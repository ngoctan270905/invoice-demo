# Checklist chất lượng yêu cầu API: INVOICE Demo

**Mục đích**: Validate độ rõ ràng, đầy đủ và nhất quán của yêu cầu API/backend trước khi tạo task triển khai
**Ngày tạo**: 2026-07-07
**Tính năng**: [spec.md](../spec.md)

## Độ đầy đủ của yêu cầu API

- [ ] CHK001 Are all customer management requirements mapped to clear API-facing capabilities? [Completeness, Spec §FR-001-FR-004]
- [ ] CHK002 Are all invoice creation requirements mapped to clear API-facing capabilities? [Completeness, Spec §FR-005-FR-012]
- [ ] CHK003 Are invoice search and detail requirements fully documented for both invoice code and customer name lookup? [Completeness, Spec §FR-014-FR-016]
- [ ] CHK004 Are invoice status update requirements documented for every allowed and rejected transition? [Completeness, Spec §FR-017-FR-019]
- [ ] CHK005 Does the spec define whether customer list and invoice list responses require sorting or pagination? [Gap, Spec §FR-004, Spec §FR-014]
- [ ] CHK006 Does the spec define what fields are returned in list responses versus detail responses? [Gap, Spec §FR-004, Spec §FR-014-FR-015]

## Độ rõ ràng của validation

- [ ] CHK007 Are required customer fields explicitly identified and aligned between spec, plan, and contract? [Clarity, Spec §FR-001-FR-002]
- [ ] CHK008 Is the tax code uniqueness rule clearly scoped to customer creation? [Clarity, Spec §FR-003]
- [ ] CHK009 Are invoice item validation rules specific for quantity, unit price, and VAT rate? [Clarity, Spec §FR-008-FR-009]
- [ ] CHK010 Does the spec define how invalid customer references during invoice creation are reported? [Gap, Spec §FR-005]
- [ ] CHK011 Does the spec define how empty invoice item arrays are handled in requirements, not only in examples? [Completeness, Spec §FR-007]
- [ ] CHK012 Are validation error response requirements specific enough to distinguish field errors from business rule errors? [Clarity, Spec §FR-021-FR-022]

## Tính nhất quán giữa spec, plan, data model và contract

- [ ] CHK013 Are entity names and table concepts consistent between spec entities and data-model.md? [Consistency, Spec §Entity chính, Data Model]
- [ ] CHK014 Are VAT values consistent across spec, data model, and OpenAPI contract? [Consistency, Spec §FR-008-FR-009, Contract]
- [ ] CHK015 Are invoice status values consistent across spec, data model, and OpenAPI contract? [Consistency, Spec §FR-017-FR-019, Contract]
- [ ] CHK016 Are response JSON requirements in the spec consistent with SuccessResponse and ErrorResponse in the API contract? [Consistency, Spec §FR-021, Contract]
- [ ] CHK017 Are monetary fields consistently described as calculated values across spec, plan, and data model? [Consistency, Spec §FR-010-FR-012, Data Model]
- [ ] CHK018 Is the no-auth/no-permission scope consistent across spec and plan? [Consistency, Spec §FR-023, Plan §Ngữ cảnh kỹ thuật]

## Chất lượng acceptance criteria

- [ ] CHK019 Are acceptance scenarios defined for the tax code duplicate case? [Completeness, Spec §Câu chuyện người dùng 1]
- [ ] CHK020 Are acceptance scenarios defined for invalid VAT values? [Gap, Spec §Câu chuyện người dùng 2]
- [ ] CHK021 Are acceptance scenarios defined for invoice creation with a non-existing customer? [Gap, Spec §Câu chuyện người dùng 2]
- [ ] CHK022 Are acceptance scenarios defined for invoice search with no matching result? [Gap, Spec §Câu chuyện người dùng 3]
- [ ] CHK023 Are acceptance scenarios defined for trying to update the status of a missing invoice? [Gap, Spec §Câu chuyện người dùng 4]
- [ ] CHK024 Can the success criteria be objectively evaluated from the documented API behavior? [Measurability, Spec §SC-001-SC-008]

## Coverage trường hợp biên và lỗi

- [ ] CHK025 Are requirements defined for duplicate tax code conflict responses? [Coverage, Spec §FR-003]
- [ ] CHK026 Are requirements defined for malformed email and optional phone validation? [Coverage, Spec §FR-002]
- [ ] CHK027 Are requirements defined for non-existing invoice detail lookup? [Coverage, Spec §Trường hợp biên]
- [ ] CHK028 Are requirements defined for empty search results and their response shape? [Gap, Spec §Trường hợp biên]
- [ ] CHK029 Are requirements defined for invalid status values separately from invalid status transitions? [Coverage, Spec §FR-017-FR-019]
- [ ] CHK030 Are requirements defined for rounding or decimal precision in monetary calculations? [Gap, Spec §FR-010-FR-012]

## Dependency và phạm vi demo

- [ ] CHK031 Are external integrations explicitly excluded from requirements and represented only by status simulation? [Completeness, Spec §FR-020]
- [ ] CHK032 Are database relationship assumptions documented for customer, invoice, and invoice items? [Completeness, Spec §Entity chính]
- [ ] CHK033 Are assumptions about single demo user and no authentication documented clearly enough to prevent auth tasks from being generated? [Clarity, Spec §FR-023, Spec §Giả định]
- [ ] CHK034 Are requirements clear that business rules belong to service behavior rather than route/controller behavior? [Traceability, Plan §Tóm tắt]

## Ambiguity cần xem lại

- [ ] CHK035 Is the invoice code sequence rule sufficiently specified for same-day multiple invoice creation? [Ambiguity, Plan §Research]
- [ ] CHK036 Is deletion behavior intentionally excluded for customers and invoices? [Gap]
- [ ] CHK037 Are update requirements for customer data intentionally excluded or missing? [Gap]
- [ ] CHK038 Are invoice item update/delete-after-create requirements intentionally excluded or missing? [Gap]
