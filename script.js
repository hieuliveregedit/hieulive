let isKeyValid = false;

// Chuyển Tab
function switchTab(tabId, btn) {
    if (!isKeyValid) {
        alert("Vui lòng nhập Key kích hoạt để vào trang tác vụ!");
        return;
    }

    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById('tab-' + tabId).classList.add('active');
    btn.classList.add('active');
}

// Kiểm tra Key
function checkKey() {
    const keyVal = document.getElementById("keyInput").value.trim();
    const statusMsg = document.getElementById("statusMsg");

    if(!keyVal) {
        alert("Vui lòng nhập Key!");
        return;
    }

    // Danh sách các key được phép truy cập (Thêm key mới vào đây nếu muốn)
    const danhSachKey = ["123456", "VIP-9999", "ADMIN-888"];

    statusMsg.innerText = "Đang kiểm tra...";
    statusMsg.style.color = "#ffc107";

    if (danhSachKey.includes(keyVal)) {
        isKeyValid = true;
        statusMsg.innerText = "Trạng thái: Đã kích hoạt thành công! ✅";
        statusMsg.style.color = "#28a745";

        // Hiển thị thanh điều hướng bên dưới
        const nav = document.getElementById("bottomNav");
        if(nav) {
            nav.classList.remove("hidden");
        }

        alert("Kích hoạt thành công! Đã mở khóa.");
    } else {
        statusMsg.innerText = "Trạng thái: Key không tồn tại ❌";
        statusMsg.style.color = "#ff4d4d";
        alert("Key không chính xác hoặc không tồn tại!");
    }
}
