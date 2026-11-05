# ĐÁNH GIÁ CHẤT LƯỢNG KỸ NĂNG – LẬP TRÌNH JAVASCRIPT
## THI CUỐI MÔN – [Mã đề: 005] – Phòng tập FitZone
**Thời gian: 90 phút**

---

## Yêu cầu
- Xây dựng chương trình bằng JavaScript (chuẩn ES6+), chạy trong tab Console của trình duyệt; toàn bộ viết trong 01 file `app.js`.
- Chỉ dùng `let`, `const` để khai báo biến, không dùng `var`; không sử dụng thư viện bên ngoài hoặc kiến thức chưa học.
- Đặt tên biến, tên hàm theo camelCase, bằng tiếng Anh, có nghĩa; thụt lề chuẩn, mọi khối lệnh có đầy đủ dấu `{}`; có chú thích ngắn gọn mô tả nhiệm vụ của từng hàm.
- Đặt tên thư mục nộp bài: **HN_K25_[TênLớp]_[StudentName]** — thư mục chỉ chứa file `app.js`. *Ví dụ: HN_K25_CNTT5_NguyenVanA*
- Nộp bài lên LMS kèm link GitHub cá nhân.

## Thực hành

### 1. Bối cảnh
Phòng tập FitZone cần chương trình quản lý danh sách hội viên, chạy liên tục cho đến khi nhân viên lễ tân chọn thoát. Chương trình cho phép:
- Hiển thị danh sách hội viên.
- Thêm hội viên mới.
- Cập nhật thông tin hội viên.
- Xóa hội viên.
- Tìm kiếm hội viên theo gói tập.
- Thoát chương trình.

### 2. Mục tiêu
Vận dụng mảng, object, function, vòng lặp, rẽ nhánh và xử lý chuỗi trong JavaScript để xây dựng chương trình menu thực hiện các thao tác CRUD trên danh sách hội viên, kiểm tra dữ liệu nhập và xử lý đúng các trường hợp biên.

### 3. Tài liệu

#### 3.1 Dữ liệu khởi tạo
```js
let members = [
    { memberCode: "GYM-001", fullName: "Lê Minh Khang",
      packageName: "Gym Cơ Bản",
      age: 22, durationMonths: 3 },
    { memberCode: "GYM-002", fullName: "Nguyễn Thu Hà",
      packageName: "Yoga Buổi Sáng",
      age: 31, durationMonths: 12 },
    { memberCode: "GYM-003", fullName: "Trần Quốc Bảo",
      packageName: "Boxing Nâng Cao",
      age: 27, durationMonths: 6 }
];
```

| Thuộc tính | Ý nghĩa |
|---|---|
| **memberCode** | Mã hội viên, duy nhất, bắt đầu bằng "GYM-" (string). |
| **fullName** | Họ tên (string). |
| **packageName** | Gói tập (string). |
| **age** | Tuổi, số nguyên từ 16 đến 70 (number). |
| **durationMonths** | Số tháng đăng ký, số nguyên từ 1 đến 36 (number). |

- Mảng `members` khai báo bên ngoài vòng lặp menu, dùng chung cho mọi chức năng.
- Nhập dữ liệu bằng `prompt()`, hiển thị bằng `console.log()`. `prompt()` trả về `null` khi người dùng bấm Cancel.

#### 3.2 Menu chương trình
```
=======================================================
   HỆ THỐNG QUẢN LÝ HỘI VIÊN PHÒNG TẬP FITZONE
=======================================================
1. Hiển thị danh sách hội viên
2. Thêm hội viên mới
3. Cập nhật thông tin hội viên
4. Xóa hội viên
5. Tìm kiếm hội viên theo gói tập
0. Thoát chương trình
=======================================================
Vui lòng nhập lựa chọn của bạn (0 - 5):
```

#### 3.3 Các hàm bắt buộc
| Hàm | Yêu cầu |
|---|---|
| **validateMemberCode(code)** | Trả về thông báo lỗi đầu tiên của mã hội viên, hoặc "" nếu hợp lệ. |
| **findMemberIndex(code)** | Trả về vị trí hội viên có mã code trong mảng, -1 nếu không có. |
| **normalizeText(rawText)** | Trả về chuỗi đã bỏ khoảng trắng thừa và viết hoa chữ cái đầu mỗi từ. |
| **inputIntegerInRange(message, min, max)** | Trả về số nguyên trong [min, max] (nhập lại khi sai); Cancel trả về null. |
| **displayMembers(list)** | In danh sách hội viên được truyền vào. |

- Mỗi chức năng trên menu viết thành một hàm riêng; `switch...case` chỉ gọi hàm tương ứng.

### 4. Yêu cầu nghiệp vụ
Mọi dữ liệu nhập phải được xóa khoảng trắng thừa ở hai đầu trước khi xử lý; mã hội viên được chuyển sang chữ in hoa. Chương trình không được báo lỗi hoặc dừng đột ngột khi người dùng bấm Cancel (null).

#### 4.1. Menu điều hành
- Hiển thị lại menu sau mỗi chức năng. Chọn 0: in lời chào và kết thúc chương trình.
- Lựa chọn ngoài 0 – 5 (chuỗi rỗng, chữ cái, số thập phân, null): in thông báo lỗi và hiển thị lại menu.

#### 4.2. Case 1 – Hiển thị danh sách hội viên
- Danh sách rỗng: in "Danh sách hội viên trống".
- Mỗi hội viên in gồm: STT, mã hội viên, họ tên, gói tập, tuổi, số tháng đăng ký.
- Cuối danh sách in tổng số hội viên.

**Ví dụ:**
```
1. GYM-001 - Lê Minh Khang - Gym Cơ Bản
   Tuổi: 22 | Số tháng đăng ký: 3
2. GYM-002 - Nguyễn Thu Hà - Yoga Buổi Sáng
   Tuổi: 31 | Số tháng đăng ký: 12
3. GYM-003 - Trần Quốc Bảo - Boxing Nâng Cao
   Tuổi: 27 | Số tháng đăng ký: 6
Tổng: 3 hội viên
```

#### 4.3. Case 2 – Thêm hội viên mới
Nhập lần lượt: mã hội viên, họ tên, gói tập, tuổi, số tháng đăng ký. Bấm Cancel ở bất kỳ bước nào: hủy thao tác, danh sách không thay đổi.
- Mã hội viên kiểm tra theo thứ tự, báo lỗi đầu tiên gặp phải: (1) không rỗng; (2) tối thiểu 7 ký tự; (3) bắt đầu bằng "GYM-"; (4) không chứa khoảng trắng; (5) chưa tồn tại trong danh sách. Mã sai: in lỗi và quay về menu.
- Họ tên, gói tập: không được rỗng (sai thì nhập lại); bỏ khoảng trắng thừa và viết hoa chữ cái đầu mỗi từ, ví dụ "  nguyễn   văn  an " → "Nguyễn Văn An".
- Tuổi: số nguyên từ 16 đến 70; số tháng đăng ký: số nguyên từ 1 đến 36. Sai thì in lỗi và nhập lại.
- Thêm hội viên vào cuối danh sách và in đầy đủ thông tin hội viên vừa thêm.

**Ví dụ kiểm tra mã hội viên:**
| Nhập | Sau chuẩn hóa | Kết quả |
|---|---|---|
| " gym-004 " | "GYM-004" | Hợp lệ |
| "gym" | "GYM" | Lỗi: Độ dài nhỏ hơn 7 ký tự |
| "XX-0001" | "XX-0001" | Lỗi: Sai tiền tố "GYM-" |
| "GYM- 27" | "GYM- 27" | Lỗi: Chứa khoảng trắng |
| " gym-002" | "GYM-002" | Lỗi: Mã hội viên đã tồn tại |
| "  " | "" | Lỗi: Chưa nhập mã hội viên |
| null | – | Hủy thao tác thêm |

**Ví dụ nhập số tháng đăng ký (1 – 36):**
| Nhập | Kết quả |
|---|---|
| "" | Lỗi: chưa nhập, nhập lại |
| "abc" | Lỗi: không phải số nguyên, nhập lại |
| "0" | Lỗi: ngoài phạm vi 1 – 36, nhập lại |
| "1.5" | Lỗi: không phải số nguyên, nhập lại |
| "37" | Lỗi: ngoài phạm vi 1 – 36, nhập lại |
| "1" | Hợp lệ |
| null | Hủy thao tác thêm |

#### 4.4. Case 3 – Cập nhật thông tin hội viên
- Nhập mã hội viên cần cập nhật. Không tìm thấy: in "Không tìm thấy hội viên có mã [mã]".
- Tìm thấy: nhập tuổi mới và số tháng đăng ký mới (cùng điều kiện như Case 2). Bấm Cancel: hội viên giữ nguyên giá trị cũ.
- In tuổi, số tháng đăng ký trước và sau khi cập nhật.

**Ví dụ (cột Trước/Sau ghi: tuổi / số tháng đăng ký):**
| Mã nhập | Trước | Sau | Kết quả |
|---|---|---|---|
| " gym-003 " | 27 / 6 | 28 / 9 | Cập nhật thành công |
| "GYM-001" | 22 / 3 | 22 / 3 | Bấm Cancel – đã hủy cập nhật |
| "GYM-009" | – | – | Không tìm thấy |

#### 4.5. Case 4 – Xóa hội viên
- Nhập mã hội viên cần xóa. Không tìm thấy: in "Không tìm thấy hội viên có mã [mã]".
- Tìm thấy: hỏi xác nhận (Y/N). Chỉ "Y" hoặc "y" mới xóa; giá trị khác hoặc Cancel: in "Đã hủy thao tác xóa".
- Xóa thành công: in số hội viên còn lại.

**Ví dụ:**
| Mã nhập | Xác nhận | Kết quả |
|---|---|---|
| "GYM-002" | "n" | Đã hủy thao tác xóa, còn 3 hội viên |
| " gym-002 " | " y " | Xóa thành công, còn 2 hội viên |
| "GYM-002" | – | Không tìm thấy hội viên có mã GYM-002 |
| "GYM-003" | null | Đã hủy thao tác xóa, còn 2 hội viên |

#### 4.6. Case 5 – Tìm kiếm hội viên theo gói tập
- Nhập từ khóa. Chuỗi rỗng hoặc Cancel: in "Chưa nhập từ khóa tìm kiếm".
- In các hội viên có gói tập chứa từ khóa, không phân biệt chữ hoa/thường. Không có kết quả: in "Không tìm thấy hội viên phù hợp".

**Ví dụ:**
| Từ khóa | Số kết quả | Mã tìm thấy |
|---|---|---|
| "yoga" | 1 | GYM-002 |
| "  BOXING " | 1 | GYM-003 |
| "bơi lội" | 0 | Không tìm thấy hội viên phù hợp |
| " " hoặc null | – | Chưa nhập từ khóa tìm kiếm |

#### 4.7. Chất lượng mã nguồn và xử lý trường hợp biên
- Chỉ dùng let/const; tên biến, tên hàm camelCase có nghĩa; mọi khối lệnh có đầy đủ dấu {}; có chú thích cho từng hàm.
- Có đủ các hàm ở mục 3.3; không lặp lại đoạn mã giữa các chức năng; không gán cứng (hard-code) kết quả theo testcase.
- Chương trình không báo lỗi hoặc dừng đột ngột với bất kỳ dữ liệu nhập nào.

#### 4.8. Điểm thưởng (tối đa +10 điểm)
- **Bonus 1 (+5):** Case 1 hỏi thêm cách hiển thị: theo thứ tự hiện tại hoặc sắp xếp theo số tháng đăng ký tăng dần. Việc sắp xếp không được làm thay đổi thứ tự các phần tử trong mảng `members`.
- **Bonus 2 (+5):** khi chọn 0, in báo cáo gồm: tổng số hội viên, số tháng đăng ký trung bình (làm tròn 1 chữ số thập phân) và hội viên có số tháng đăng ký lớn nhất. Danh sách rỗng: in "Chưa có hội viên nào". Ví dụ:
```
==================================================
BÁO CÁO TỔNG KẾT
==================================================
Tổng số hội viên                : 3
Số tháng đăng ký trung bình     : 7.0
Số tháng đăng ký cao nhất       : GYM-002 - Nguyễn Thu Hà - 12
==================================================
```

### 5. Thang điểm chi tiết
| STT | Nghiệp vụ cần đạt được | Mô tả chi tiết nghiệp vụ | Điểm |
|---|---|---|---|
| 1 | Menu điều hành & tổ chức hàm | Menu lặp lại, thoát đúng khi chọn 0: 4 • switch...case đúng, có break/default: 3 • Bắt lỗi lựa chọn không hợp lệ: 3 • Mỗi chức năng là một hàm, đủ các hàm mục 3.3: 5 | 15 |
| 2 | Case 1 – Hiển thị danh sách | In đủ thông tin từng hội viên: 5 • Xử lý danh sách rỗng: 2 • In tổng số hội viên: 3 | 10 |
| 3 | Case 2 – Thêm hội viên | Kiểm tra mã đúng 5 điều kiện, đúng thứ tự: 8 • Kiểm tra, chuẩn hóa họ tên, gói tập: 6 • Kiểm tra tuổi, số tháng đăng ký đúng phạm vi, nhập lại khi sai: 8 • Thêm object đủ thuộc tính vào cuối danh sách: 4 • In thông tin hội viên vừa thêm: 4 | 30 |
| 4 | Case 3 – Cập nhật hội viên | Tìm theo mã, báo không tìm thấy: 4 • Nhập dữ liệu mới đúng điều kiện, Cancel giữ nguyên: 5 • Cập nhật đúng object trong mảng: 4 • In giá trị trước và sau: 2 | 15 |
| 5 | Case 4 – Xóa hội viên | Tìm theo mã, báo không tìm thấy: 3 • Xác nhận Y/N đúng: 3 • Xóa đúng phần tử, in số còn lại: 4 | 10 |
| 6 | Case 5 – Tìm kiếm theo gói tập | Kiểm tra từ khóa rỗng, null: 2 • Tìm đúng, không phân biệt hoa thường: 5 • In kết quả hoặc báo không tìm thấy: 3 | 10 |
| 7 | Chất lượng mã & trường hợp biên | let/const, camelCase, đủ dấu {}: 3 • Có chú thích cho từng hàm: 2 • Không lặp mã, không hard-code testcase: 5 | 10 |
| | **Tổng cộng** | | **100** |
| 8 | Điểm thưởng | Bonus 1 – hiển thị sắp xếp: +5 • Bonus 2 – báo cáo tổng kết: +5 • Điểm cuối cùng không vượt quá 100. | +10 |

### 6. Yêu cầu kỹ thuật
- Mọi chức năng thao tác trên cùng mảng `members`.
- Không dùng thư viện bên ngoài; chỉ nộp file `app.js`.
- Giảng viên có thể dùng thêm dữ liệu kiểm thử ngoài các ví dụ trong đề.

*Lưu ý: điểm chức năng chỉ được tính khi chương trình chạy đúng và cho kết quả chính xác với các trường hợp kiểm thử tương ứng.*

---
*Bài làm mẫu: file `De005_QuanLyPhongGym_app.js` (đổi tên thành `app.js` khi nộp).*
