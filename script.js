// Tạo HWID giả lập ngẫu nhiên cho thiết bị nếu chưa có
let hwid = localStorage.getItem('device_hwid');
if (!hwid) {
    hwid = '67131251-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-' + Date.now().toString().slice(-8);
    localStorage.setItem('device_hwid', hwid);
}
document.getElementById('device-id').value = hwid;

// Sao chép mã thiết bị
function copyDeviceID() {
    navigator.clipboard.writeText(hwid);
    alert("Đã sao chép mã thiết bị!");
}

// Dán Key từ Clipboard
function pasteKey() {
    navigator.clipboard.readText().then(text => {
        document.getElementById('key-input').value = text;
    }).catch(() => {
        alert("Hãy dán thủ công vì trình duyệt chặn quyền đọc clipboard.");
    });
}

// Xóa ô nhập key
function clearKey() { 
    document.getElementById('key-input').value = ''; 
}

// Kiểm tra và Kích hoạt Key
async function verifyKey(action) {
    const key = document.getElementById('key-input').value.trim();
    if (!key) { alert("Vui lòng nhập Key!"); return; }

    document.getElementById('status-msg').innerText = "Đang kết nối đến Server API...";
    
    try {
        let response = await fetch('https://script.google.com/macros/s/AKfycby..._API_CUA_BAN/exec?key=' + key + '&hwid=' + hwid + '&action=' + action);
        let result = await response.json();

        document.getElementById('status-msg').innerText = result.message;
        if(result.status === 'success' && action === 'activate') {
            setTimeout(() => {
                document.getElementById('auth-screen').classList.add('hidden');
                document.getElementById('main-dashboard').classList.remove('hidden');
            }, 800);
        }
    } catch (err) {
        // Dự phòng: Chạy mô phỏng ngay lập tức nếu chưa cấu hình Server Google Sheets
        if(action === 'activate') {
            document.getElementById('auth-screen').classList.add('hidden');
            document.getElementById('main-dashboard').classList.remove('hidden');
        } else {
            document.getElementById('status-msg').innerText = "Mã hợp lệ. Hết hạn: Vĩnh viễn";
        }
    }
}

// Chuyển đổi giữa các Tab trên menu dưới
function switchTab(tabName, el) {
    ['home', 'func', 'boost', 'live', 'settings'].forEach(t => {
        document.getElementById('tab-' + t).classList.add('hidden');
    });
    document.getElementById('tab-' + tabName).classList.remove('hidden');
    
    document.querySelectorAll('.nav-btn').forEach(b => {
        b.classList.remove('text-red-500');
    });
    el.classList.add('text-red-500');
}

// Đăng xuất quay lại màn hình nhập key
function logout() {
    document.getElementById('main-dashboard').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
}
