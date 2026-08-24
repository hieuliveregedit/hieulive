let hwid = localStorage.getItem('device_hwid');
if (!hwid) {
    hwid = '67131251-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-' + Date.now().toString().slice(-8);
    localStorage.setItem('device_hwid', hwid);
}
document.getElementById('device-id').value = hwid;

function copyDeviceID() {
    navigator.clipboard.writeText(hwid);
    alert("Đã sao chép mã thiết bị!");
}

function pasteKey() {
    navigator.clipboard.readText().then(text => {
        document.getElementById('key-input').value = text;
    }).catch(() => {
        alert("Vui lòng dán thủ công.");
    });
}

function clearKey() {
    document.getElementById('key-input').value = '';
}

async function verifyKey(action) {
    const key = document.getElementById('key-input').value.trim();
    if (!key) { alert("Vui lòng nhập Key!"); return; }

    document.getElementById('status-msg').innerText = "Đang kiểm tra kết nối API...";
    
    setTimeout(() => {
        if(action === 'activate') {
            document.getElementById('auth-screen').classList.add('hidden');
            document.getElementById('main-dashboard').classList.remove('hidden');
        } else {
            document.getElementById('status-msg').innerText = "Mã hợp lệ. Hết hạn: Vĩnh viễn (Hieu Live)";
        }
    }, 600);
}

function switchTab(tabName, el) {
    ['home', 'func', 'boost', 'live', 'settings'].forEach(t => {
        document.getElementById('tab-' + t).classList.add('hidden');
    });
    document.getElementById('tab-' + tabName).classList.remove('hidden');
    
    document.querySelectorAll('.nav-btn').forEach(b => {
        b.classList.remove('text-[#ff4d6d]');
        b.classList.add('text-zinc-500');
    });
    el.classList.remove('text-zinc-500');
    el.classList.add('text-[#ff4d6d]');
}

function updateBoostVal(id, val) {
    document.getElementById(id).innerText = val + "%";
}

// Hàm xử lý khi bấm mở game ở tab Live
function openGame() {
    // Thử kích hoạt scheme mở Free Fire trực tiếp trên thiết bị di động
    window.location.href = "freefire://";
    
    // Fallback thông báo trực quan nếu chạy trên trình duyệt máy tính hoặc webview chưa cấu hình sẵn scheme
    setTimeout(() => {
        alert("Đang khởi chạy Free Fire / Free Fire MAX...");
    }, 300);
}

function logout() {
    document.getElementById('main-dashboard').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
}

// Cấu hình sự kiện bấm các nút mạng xã hội (Sẵn sàng nhận link từ bạn)
document.getElementById('btn-telegram').addEventListener('click', () => {
    const link = prompt("Nhập link Telegram của bạn:", "https://t.me/");
    if (link) window.open(link, '_blank');
});

document.getElementById('btn-zalo').addEventListener('click', () => {
    const link = prompt("Nhập link Zalo của bạn:", "https://zalo.me/");
    if (link) window.open(link, '_blank');
});

document.getElementById('btn-tiktok1').addEventListener('click', () => {
    const link = prompt("Nhập link TikTok 1 của bạn:", "https://tiktok.com/");
    if (link) window.open(link, '_blank');
});

document.getElementById('btn-tiktok2').addEventListener('click', () => {
    const link = prompt("Nhập link TikTok 2 của bạn:", "https://tiktok.com/");
    if (link) window.open(link, '_blank');
});
