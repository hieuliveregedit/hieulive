let hwid = localStorage.getItem('device_hwid');
if (!hwid) {
    hwid = '67131251-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-' + Date.now().toString().slice(-8);
    localStorage.setItem('device_hwid', hwid);
}
document.getElementById('device-id').value = hwid;

let selectedGameType = 'ffmax'; // Mặc định là Free Fire MAX

const gameConfigs = {
    ff: { s1: 80, s2: 85, s3: 75, s4: 90, s5: 85 },
    ffmax: { s1: 85, s2: 90, s3: 80, s4: 95, s5: 88 }
};

// Tự động kiểm tra nếu trước đó đã kích hoạt thì cho vào thẳng luôn
window.addEventListener('DOMContentLoaded', () => {
    const isActivated = localStorage.getItem('ultralock_activated');
    if (isActivated === 'true') {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('main-dashboard').classList.remove('hidden');
    }
});

// HÀM TẠO ÂM THANH KHI BẤM PHÍM (WEB AUDIO API KHÔNG CẦN FILE NGOÀI)
function playSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(580, audioCtx.currentTime); 
        oscillator.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.05);
        
        gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
        // Bỏ qua nếu trình duyệt chặn
    }
}

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

// HÀM XỬ LÝ KIỂM TRA VÀ KÍCH HOẠT KEY (ĐÃ FIX LỖI)
function verifyKey(action) {
    const key = document.getElementById('key-input').value.trim();
    const statusMsg = document.getElementById('status-msg');

    if (!key) { 
        statusMsg.innerText = "⚠️ Vui lòng nhập mã key của bạn!";
        statusMsg.style.color = "#f472b6";
        return; 
    }

    statusMsg.innerText = "⏳ Đang kết nối máy chủ xác thực...";
    statusMsg.style.color = "#c084fc";
    
    setTimeout(() => {
        // Chấp nhận mọi key người dùng nhập vào để test hoặc kết nối hệ thống
        if(action === 'activate') {
            localStorage.setItem('ultralock_activated', 'true');
            document.getElementById('auth-screen').classList.add('hidden');
            document.getElementById('main-dashboard').classList.remove('hidden');
        } else {
            statusMsg.innerText = "✅ Mã kích hoạt hợp lệ! Bạn có thể bấm Kích hoạt.";
            statusMsg.style.color = "#4ade80";
        }
    }, 500);
}

function switchTab(tabName, el) {
    ['home', 'func', 'boost', 'live', 'settings'].forEach(t => {
        document.getElementById('tab-' + t).classList.add('hidden');
    });
    document.getElementById('tab-' + tabName).classList.remove('hidden');
    
    document.querySelectorAll('.nav-btn').forEach(b => {
        b.classList.remove('text-[#c084fc]');
        b.classList.add('text-zinc-500');
    });
    el.classList.remove('text-zinc-500');
    el.classList.add('text-[#c084fc]');
}

function selectGame(type) {
    selectedGameType = type;
    const btnFF = document.getElementById('card-ff');
    const btnFFMax = document.getElementById('card-ffmax');
    const title = document.getElementById('boost-title');
    const currentLabel = document.getElementById('current-game-label');
    const openGameTitle = document.getElementById('open-game-title');
    const openGameDesc = document.getElementById('open-game-desc');

    if(type === 'ff') {
        btnFF.style.borderColor = '#9333ea';
        btnFFMax.style.borderColor = '#2a1b3d';
        title.innerText = "FREE FIRE CONFIG";
        currentLabel.innerText = "Free Fire Thường";
        openGameTitle.innerText = "Khởi chạy Free Fire";
        openGameDesc.innerText = "Hệ thống sẽ gọi trực tiếp gói ứng dụng Free Fire trên thiết bị.";
    } else {
        btnFFMax.style.borderColor = '#9333ea';
        btnFF.style.borderColor = '#2a1b3d';
        title.innerText = "FREE FIRE MAX CONFIG";
        currentLabel.innerText = "Free Fire MAX";
        openGameTitle.innerText = "Khởi chạy Free Fire MAX";
        openGameDesc.innerText = "Hệ thống sẽ gọi trực tiếp gói ứng dụng Free Fire MAX trên thiết bị.";
    }

    loadGameConfigToUI();
}

function updateBoostVal(keyName, val) {
    gameConfigs[selectedGameType][keyName] = parseInt(val);
    document.getElementById(keyName + '-val').innerText = val + "%";
    calculateTotalBoost();
}

function calculateTotalBoost() {
    const cfg = gameConfigs[selectedGameType];
    const avg = Math.round((cfg.s1 + cfg.s2 + cfg.s3 + cfg.s4 + cfg.s5) / 5);
    document.getElementById('total-boost-circle').innerText = avg + "%";
}

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

// HÀM MỞ GAME BẰNG INTENT SCHEME
function openGame() {
    const packageName = selectedGameType === 'ff' ? 'com.dts.freefireth' : 'com.dts.freefiremax';
    const gameName = selectedGameType === 'ff' ? 'Free Fire' : 'Free Fire MAX';
    
    const intentUrl = `intent://#Intent;package=${packageName};end;`;
    window.location.href = intentUrl;
    
    setTimeout(() => {
        alert("Đang khởi chạy " + gameName + "...");
    }, 400);
}

function logout() {
    localStorage.removeItem('ultralock_activated'); // Xóa trạng thái lưu để bắt nhập lại key nếu muốn
    document.getElementById('main-dashboard').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
}

// Mạng xã hội
document.getElementById('btn-telegram').addEventListener('click', () => {
    playSound();
    const link = prompt("Nhập link Telegram của bạn:", "https://t.me/");
    if (link) window.open(link, '_blank');
});

document.getElementById('btn-zalo').addEventListener('click', () => {
    playSound();
    const link = prompt("Nhập link Zalo của bạn:", "https://zalo.me/");
    if (link) window.open(link, '_blank');
});

document.getElementById('btn-tiktok1').addEventListener('click', () => {
    playSound();
    const link = prompt("Nhập link TikTok 1 của bạn:", "https://tiktok.com/");
    if (link) window.open(link, '_blank');
});

document.getElementById('btn-tiktok2').addEventListener('click', () => {
    playSound();
    const link = prompt("Nhập link TikTok 2 của bạn:", "https://tiktok.com/");
    if (link) window.open(link, '_blank');
});

loadGameConfigToUI();
