// Các enum dùng chung toàn chương trình
var Enumeration = Enumeration || {};

// Các mode của form detail
Enumeration.FormMode = {
    Add: 1,    // Thêm mới
    Edit: 2,   // Sửa
    Delete: 3,  // Xóa
    Clone: 4 // Nhân bản
}

// Giới tính
Enumeration.gender = {
    Female: "0", // Nữ
    Male: "1",   // Nam
    Other: "2"   // Khác
}


// Tình trạng công việc
Enumeration.workStatus = {
    Trying: "0", // Đang thử việc
    Working: "1", // Đang làm việc
    Stop: "2", // Ngừng làm việc
    Quit: "3" // Đã nghỉ việc
}