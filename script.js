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

// Kiểm tra Key trực tiếp trong code (Không cần Supabase)
function checkKey() {
    const keyVal = document.getElementById("keyInput").value.trim();
    const statusMsg = document.getElementById("statusMsg");

    if(!keyVal) {
        alert("Vui lòng nhập Key!");
        return;
    }

    // DANH SÁCH CÁC KEY ĐƯỢC PHÉP DÙNG (Mày thích thêm key nào thì thêm vào đây)
    const danhSachKey = ["123456", "VIP-9999", "HIEULIVE2026"];

    statusMsg.innerText = "Đang kiểm tra...";
    statusMsg.style.color = "#ffc107";

    // Kiểm tra xem key khách nhập có nằm trong danh sách không
    if (danhSachKey.includes(keyVal)) {
        isKeyValid = true;
        statusMsg.innerText = "Trạng thái: Đã kích hoạt thành công! ✅";
        statusMsg.style.color = "#28a745";

        // Hiện thanh điều hướng dưới
        const nav = document.getElementById("bottomNav");
        if(nav) {
            nav.style.display = "flex";
            nav.classList.remove("hidden");
        }

        alert("Kích hoạt thành công! Đã mở khóa.");
    } else {
        statusMsg.innerText = "Trạng thái: Key không tồn tại ❌";
        statusMsg.style.color = "#ff4d4d";
        alert("Key không chính xác!");
    }
}

function resetInput() {
    document.getElementById("keyInput").value = "";
}

function logout() {
    location.reload();
}
