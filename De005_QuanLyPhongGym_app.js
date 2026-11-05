/**
 * ĐỀ 005 - HỆ THỐNG QUẢN LÝ HỘI VIÊN PHÒNG TẬP FITZONE
 * Bài làm: chương trình quản lý hội viên chạy trong tab Console của trình duyệt.
 * Chuẩn ES6+, chỉ dùng let/const, không dùng thư viện ngoài.
 */

// ==================== DỮ LIỆU KHỞI TẠO ====================
// Mảng members khai báo bên ngoài vòng lặp menu, dùng chung cho mọi chức năng
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

// Các hằng số ràng buộc dữ liệu
const CODE_PREFIX = "GYM-";
const CODE_MIN_LENGTH = 7;
const MIN_AGE = 16;
const MAX_AGE = 70;
const MIN_DURATION_MONTHS = 1;
const MAX_DURATION_MONTHS = 36;

// ==================== CÁC HÀM BẮT BUỘC ====================

/**
 * Chuẩn hóa chuỗi: bỏ khoảng trắng thừa, viết hoa chữ cái đầu mỗi từ.
 * Ví dụ: "  nguyễn   văn  an " -> "Nguyễn Văn An"
 */
function normalizeText(rawText) {
    return rawText
        .trim()
        .split(" ")
        .filter((word) => word !== "")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

/**
 * Tìm vị trí hội viên theo mã hội viên (không phân biệt hoa/thường).
 * Trả về index trong mảng members, -1 nếu không có.
 */
function findMemberIndex(code) {
    const searchCode = code.trim().toUpperCase();
    for (let i = 0; i < members.length; i++) {
        if (members[i].memberCode.toUpperCase() === searchCode) {
            return i;
        }
    }
    return -1;
}

/**
 * Kiểm tra mã hội viên theo đúng thứ tự 5 điều kiện.
 * Trả về thông báo lỗi đầu tiên gặp phải, hoặc "" nếu hợp lệ.
 */
function validateMemberCode(code) {
    const normalizedCode = code.trim().toUpperCase();
    if (normalizedCode === "") {
        return "Lỗi: Chưa nhập mã hội viên";
    }
    if (normalizedCode.length < CODE_MIN_LENGTH) {
        return `Lỗi: Độ dài nhỏ hơn ${CODE_MIN_LENGTH} ký tự`;
    }
    if (!normalizedCode.startsWith(CODE_PREFIX)) {
        return `Lỗi: Sai tiền tố "${CODE_PREFIX}"`;
    }
    if (normalizedCode.includes(" ")) {
        return "Lỗi: Chứa khoảng trắng";
    }
    if (findMemberIndex(normalizedCode) !== -1) {
        return "Lỗi: Mã hội viên đã tồn tại";
    }
    return "";
}

/**
 * Nhập một số nguyên trong đoạn [min, max], nhập sai thì báo lỗi và nhập lại.
 * Trả về số nguyên hợp lệ, hoặc null nếu người dùng bấm Cancel.
 */
function inputIntegerInRange(message, min, max) {
    while (true) {
        const rawValue = prompt(message);
        if (rawValue === null) {
            return null;
        }
        const trimmedValue = rawValue.trim();
        if (trimmedValue === "") {
            console.log("Lỗi: chưa nhập, nhập lại");
            continue;
        }
        const numberValue = Number(trimmedValue);
        if (!Number.isInteger(numberValue)) {
            console.log("Lỗi: không phải số nguyên, nhập lại");
            continue;
        }
        if (numberValue < min || numberValue > max) {
            console.log(`Lỗi: ngoài phạm vi ${min} – ${max}, nhập lại`);
            continue;
        }
        return numberValue;
    }
}

/**
 * Nhập chuỗi bắt buộc (không được rỗng), tự chuẩn hóa.
 * Trả về chuỗi đã chuẩn hóa, hoặc null nếu người dùng bấm Cancel.
 */
function inputRequiredText(message, fieldLabel) {
    while (true) {
        const rawValue = prompt(message);
        if (rawValue === null) {
            return null;
        }
        const normalizedValue = normalizeText(rawValue);
        if (normalizedValue === "") {
            console.log(`Lỗi: ${fieldLabel} không được để trống, nhập lại`);
            continue;
        }
        return normalizedValue;
    }
}

/**
 * In thông tin chi tiết của một hội viên (dùng chung cho hiển thị, thêm, cập nhật).
 */
function printMember(item, orderNumber) {
    console.log(`${orderNumber}. ${item.memberCode} - ${item.fullName} - ${item.packageName}`);
    console.log(`   Tuổi: ${item.age} | Số tháng đăng ký: ${item.durationMonths}`);
}

/**
 * In danh sách hội viên được truyền vào và tổng số hội viên ở cuối.
 */
function displayMembers(list) {
    for (let i = 0; i < list.length; i++) {
        printMember(list[i], i + 1);
    }
    console.log(`Tổng: ${list.length} hội viên`);
}

// ==================== CÁC CHỨC NĂNG MENU ====================

/**
 * Case 1: Hiển thị danh sách hội viên.
 * Bonus 1: cho chọn hiển thị theo thứ tự hiện tại hoặc sắp xếp số tháng đăng ký tăng dần
 * (sắp xếp trên bản sao, không làm thay đổi mảng members).
 */
function showMemberList() {
    if (members.length === 0) {
        console.log("Danh sách hội viên trống");
        return;
    }
    const displayMode = prompt(
        "Chọn cách hiển thị:\n1. Theo thứ tự hiện tại\n2. Sắp xếp theo số tháng đăng ký tăng dần"
    );
    const normalizedMode = displayMode === null ? "" : displayMode.trim();
    if (normalizedMode === "2") {
        const sortedList = [...members].sort((a, b) => a.durationMonths - b.durationMonths);
        console.log("--- Danh sách hội viên (số tháng đăng ký tăng dần) ---");
        displayMembers(sortedList);
        return;
    }
    if (normalizedMode !== "1") {
        console.log("Lựa chọn không hợp lệ, hiển thị theo thứ tự hiện tại");
    }
    console.log("--- Danh sách hội viên ---");
    displayMembers(members);
}

/**
 * Case 2: Thêm hội viên mới vào cuối danh sách.
 * Bấm Cancel ở bất kỳ bước nào: hủy thao tác, danh sách không đổi.
 */
function addMember() {
    const cancelMessage = "Đã hủy thao tác thêm";

    const rawCode = prompt("Nhập mã hội viên (bắt đầu bằng GYM-):");
    if (rawCode === null) {
        console.log(cancelMessage);
        return;
    }
    const newCode = rawCode.trim().toUpperCase();
    const codeError = validateMemberCode(newCode);
    if (codeError !== "") {
        console.log(codeError);
        return;
    }

    const newName = inputRequiredText("Nhập họ tên:", "Họ tên");
    if (newName === null) {
        console.log(cancelMessage);
        return;
    }

    const newGroup = inputRequiredText("Nhập gói tập:", "Gói tập");
    if (newGroup === null) {
        console.log(cancelMessage);
        return;
    }

    const newAge = inputIntegerInRange(
        `Nhập tuổi (${MIN_AGE} - ${MAX_AGE}):`, MIN_AGE, MAX_AGE
    );
    if (newAge === null) {
        console.log(cancelMessage);
        return;
    }

    const newDurationMonths = inputIntegerInRange(
        `Nhập số tháng đăng ký (${MIN_DURATION_MONTHS} - ${MAX_DURATION_MONTHS}):`, MIN_DURATION_MONTHS, MAX_DURATION_MONTHS
    );
    if (newDurationMonths === null) {
        console.log(cancelMessage);
        return;
    }

    const newMember = {
        memberCode: newCode,
        fullName: newName,
        packageName: newGroup,
        age: newAge,
        durationMonths: newDurationMonths,
    };
    members.push(newMember);
    console.log("Thêm hội viên thành công:");
    printMember(newMember, members.length);
}

/**
 * Hỏi mã hội viên và trả về index của hội viên tìm được.
 * Trả về -1 nếu Cancel, chưa nhập hoặc không tìm thấy (đã in thông báo tương ứng).
 */
function askMemberIndex(actionName) {
    const rawCode = prompt(`Nhập mã hội viên cần ${actionName}:`);
    if (rawCode === null) {
        console.log(`Đã hủy thao tác ${actionName}`);
        return -1;
    }
    const searchCode = rawCode.trim().toUpperCase();
    if (searchCode === "") {
        console.log("Lỗi: Chưa nhập mã hội viên");
        return -1;
    }
    const foundIndex = findMemberIndex(searchCode);
    if (foundIndex === -1) {
        console.log(`Không tìm thấy hội viên có mã ${searchCode}`);
    }
    return foundIndex;
}

/**
 * Case 3: Cập nhật tuổi và số tháng đăng ký của hội viên.
 * Bấm Cancel: hội viên giữ nguyên giá trị cũ. In giá trị trước và sau khi cập nhật.
 */
function updateMember() {
    const foundIndex = askMemberIndex("cập nhật");
    if (foundIndex === -1) {
        return;
    }
    const targetMember = members[foundIndex];
    const oldAge = targetMember.age;
    const oldDurationMonths = targetMember.durationMonths;
    console.log(`Trước: Tuổi: ${oldAge} | Số tháng đăng ký: ${oldDurationMonths}`);

    const newAge = inputIntegerInRange(
        `Nhập tuổi mới (${MIN_AGE} - ${MAX_AGE}):`, MIN_AGE, MAX_AGE
    );
    if (newAge === null) {
        console.log("Bấm Cancel – đã hủy cập nhật");
        return;
    }
    const newDurationMonths = inputIntegerInRange(
        `Nhập số tháng đăng ký mới (${MIN_DURATION_MONTHS} - ${MAX_DURATION_MONTHS}):`, MIN_DURATION_MONTHS, MAX_DURATION_MONTHS
    );
    if (newDurationMonths === null) {
        console.log("Bấm Cancel – đã hủy cập nhật");
        return;
    }

    targetMember.age = newAge;
    targetMember.durationMonths = newDurationMonths;
    console.log("Cập nhật thành công");
    console.log(`Trước: Tuổi: ${oldAge} | Số tháng đăng ký: ${oldDurationMonths}`);
    console.log(`Sau  : Tuổi: ${targetMember.age} | Số tháng đăng ký: ${targetMember.durationMonths}`);
}

/**
 * Case 4: Xóa hội viên theo mã, có xác nhận Y/N.
 * Chỉ "Y" hoặc "y" mới xóa; giá trị khác hoặc Cancel thì hủy.
 */
function deleteMember() {
    const foundIndex = askMemberIndex("xóa");
    if (foundIndex === -1) {
        return;
    }
    const targetMember = members[foundIndex];
    const confirmAnswer = prompt(
        `Bạn có chắc muốn xóa ${targetMember.memberCode} - ${targetMember.fullName}? (Y/N)`
    );
    const normalizedAnswer = confirmAnswer === null ? "" : confirmAnswer.trim();
    if (normalizedAnswer === "Y" || normalizedAnswer === "y") {
        members.splice(foundIndex, 1);
        console.log(`Xóa thành công, còn ${members.length} hội viên`);
    } else {
        console.log(`Đã hủy thao tác xóa, còn ${members.length} hội viên`);
    }
}

/**
 * Case 5: Tìm hội viên có gói tập chứa từ khóa, không phân biệt hoa/thường.
 */
function searchMembersByPackage() {
    const rawKeyword = prompt("Nhập từ khóa gói tập cần tìm:");
    if (rawKeyword === null || rawKeyword.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }
    const keyword = normalizeText(rawKeyword).toLowerCase();
    const resultList = members.filter((item) =>
        item.packageName.toLowerCase().includes(keyword)
    );
    if (resultList.length === 0) {
        console.log("Không tìm thấy hội viên phù hợp");
        return;
    }
    console.log(`--- Kết quả tìm kiếm "${keyword}" ---`);
    displayMembers(resultList);
}

/**
 * Bonus 2: In báo cáo tổng kết khi thoát chương trình.
 * Gồm tổng số hội viên, số tháng đăng ký trung bình (1 chữ số thập phân) và hội viên có số tháng đăng ký lớn nhất.
 */
function showSummaryReport() {
    const separator = "=".repeat(50);
    if (members.length === 0) {
        console.log("Chưa có hội viên nào");
        return;
    }
    let totalDurationMonths = 0;
    let topMember = members[0];
    for (const item of members) {
        totalDurationMonths += item.durationMonths;
        if (item.durationMonths > topMember.durationMonths) {
            topMember = item;
        }
    }
    const averageDurationMonths = (totalDurationMonths / members.length).toFixed(1);

    console.log(separator);
    console.log("BÁO CÁO TỔNG KẾT");
    console.log(separator);
    console.log(`Tổng số hội viên`.padEnd(32) + `: ${members.length}`);
    console.log(`Số tháng đăng ký trung bình`.padEnd(32) + `: ${averageDurationMonths}`);
    console.log(
        `Số tháng đăng ký cao nhất`.padEnd(32) +
            `: ${topMember.memberCode} - ${topMember.fullName} - ${topMember.durationMonths}`
    );
    console.log(separator);
}

// ==================== MENU ĐIỀU HÀNH ====================

/**
 * In menu chương trình.
 */
function displayMenu() {
    const separator = "=".repeat(55);
    console.log(separator);
    console.log("   HỆ THỐNG QUẢN LÝ HỘI VIÊN PHÒNG TẬP FITZONE");
    console.log(separator);
    console.log("1. Hiển thị danh sách hội viên");
    console.log("2. Thêm hội viên mới");
    console.log("3. Cập nhật thông tin hội viên");
    console.log("4. Xóa hội viên");
    console.log("5. Tìm kiếm hội viên theo gói tập");
    console.log("0. Thoát chương trình");
    console.log(separator);
}

/**
 * Vòng lặp chính: hiển thị menu, đọc lựa chọn và gọi hàm tương ứng.
 * Lựa chọn ngoài 0 - 5 (rỗng, chữ, số thập phân, null) thì báo lỗi và hiện lại menu.
 */
function runProgram() {
    let isRunning = true;
    while (isRunning) {
        displayMenu();
        const rawChoice = prompt("Vui lòng nhập lựa chọn của bạn (0 - 5):");
        const choice = rawChoice === null ? "" : rawChoice.trim();
        switch (choice) {
            case "1":
                showMemberList();
                break;
            case "2":
                addMember();
                break;
            case "3":
                updateMember();
                break;
            case "4":
                deleteMember();
                break;
            case "5":
                searchMembersByPackage();
                break;
            case "0":
                showSummaryReport();
                console.log("Cảm ơn bạn đã sử dụng chương trình. Tạm biệt!");
                isRunning = false;
                break;
            default:
                console.log("Lỗi: Lựa chọn không hợp lệ, vui lòng nhập số từ 0 đến 5");
                break;
        }
    }
}

runProgram();
