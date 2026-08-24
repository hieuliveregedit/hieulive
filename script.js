let hwid = localStorage.getItem('device_hwid');
if (!hwid) {
    hwid = '67131251-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-' + Date.now().toString().slice(-8);
    localStorage.setItem('device_hwid', hwid);
}
document.getElementById('device-id').value = hwid;

let selectedGameType = 'ffmax'; // Mặc định ban đầu là Free Fire MAX

// Lưu trữ bộ thông số riêng biệt cho từng phiên bản game
const gameConfigs = {
    ff: { s1: 80, s2: 85, s3: 75, s4: 90, s5: 85 },
    ffmax: { s1: 85, s2: 90, s3: 80, s4: 95, s5: 88 }
};

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

// Chuyển đổi qua lại giữa Free Fire thường và Free Fire MAX
function selectGame(type) {
    selectedGameType = type;
    const btnFF = document.getElementById('card-ff');
    const btnFFMax = document.getElementById('card-ffmax');
    const title = document.getElementById('boost-title');
    const currentLabel = document.getElementById('current-game-label');
    const openGameTitle = document.getElementById('open-game-title');
    const openGameDesc = document.getElementById('open-game-desc');

    if(type === 'ff') {
        btnFF.style.borderColor = '#8b0000';
        btnFFMax.style.borderColor = '#25171c';
        title.innerText = "FREE FIRE CONFIG";
        currentLabel.innerText = "Free Fire Thường";
        openGameTitle.innerText = "Khởi chạy Free Fire";
        openGameDesc.innerText = "Hệ thống sẽ kích hoạt giao thức mở ứng dụng Free Fire trực tiếp trên thiết bị.";
    } else {
        btnFFMax.style.borderColor = '#8b0000';
        btnFF.style.borderColor = '#25171c';
        title.innerText = "FREE FIRE MAX CONFIG";
        currentLabel.innerText = "Free Fire MAX";
        openGameTitle.innerText = "Khởi chạy Free Fire MAX";
        openGameDesc.innerText = "Hệ thống sẽ kích hoạt giao thức mở ứng dụng Free Fire MAX trực tiếp trên thiết bị.";
    }

    loadGameConfigToUI();
}

// Cập nhật giá trị khi kéo slider từ 0 tới 100%
function updateBoostVal(keyName, val) {
    gameConfigs[selectedGameType][keyName] = parseInt(val);
    document.getElementById(keyName + '-val').innerText = val + "%";
    calculateTotalBoost();
}

// Tính toán trung bình cộng để hiển thị vào vòng tròn tổng kết
function calculateTotalBoost() {
    const cfg = gameConfigs[selectedGameType];
    const avg = Math.round((cfg.s1 + cfg.s2 + cfg.s3 + cfg.s4 + cfg.s5) / 5);
    document.getElementById('total-boost-circle').innerText = avg + "%";
}

// Đưa dữ liệu từ bộ nhớ ra các thanh trượt theo game đang chọn
function loadGameConfigToUI() {
    const cfg = gameConfigs[selectedGameType];
    
    ['s1', 's2', 's3', 's4', 's5'].forEach(key => {
        document.getElementById('slider-' + key).value = cfg[key];
        document.getElementById(key + '-val').innerText = cfg[key] + "%";
    });

    calculateTotalBoost();
}

function applyBoost() {
    const gameName = selectedGameType === 'ff' ? 'Free Fire' : 'Free Fire MAX';
    alert("Đã áp dụng cấu hình tối ưu thành công cho " + gameName + "!");
}

// Hàm mở game chuẩn theo phiên bản đã chọn
function openGame() {
    if (selectedGameType === 'ff') {
        window.location.href = "com.dts.freefireth://";
    } else {
        window.location.href = "com.dts.freefiremax://";
    }
    
    setTimeout(() => {
        const gameName = selectedGameType === 'ff' ? 'Free Fire' : 'Free Fire MAX';
        alert("Đang khởi chạy " + gameName + "...");
    }, 300);
}

function logout() {
    document.getElementById('main-dashboard').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
}

// Sự kiện nút mạng xã hội
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

// Chạy load cấu hình mặc định lúc đầu mở app
loadGameConfigToUI();
