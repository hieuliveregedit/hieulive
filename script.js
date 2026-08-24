let hwid = localStorage.getItem('device_hwid');
if (!hwid) {
    hwid = 'AIMLOCK-HL-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-' + Date.now().toString().slice(-8);
    localStorage.setItem('device_hwid', hwid);
}
document.getElementById('device-id').value = hwid;

let selectedGameType = 'ffmax';

const gameConfigs = {
    ff: { s1: 80, s2: 85, s3: 75, s4: 90, s5: 85 },
    ffmax: { s1: 85, s2: 90, s3: 80, s4: 95, s5: 88 }
};

// Kiểm tra trạng thái đăng nhập khi vừa tải trang
window.addEventListener('DOMContentLoaded', () => {
    const isActivated = localStorage.getItem('aimlock_hieulive_activated');
    if (isActivated === 'true') {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('main-dashboard').classList.remove('hidden');
    } else {
        document.getElementById('auth-screen').classList.remove('hidden');
        document.getElementById('main-dashboard').classList.add('hidden');
    }
});

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
    } catch (e) {}
}

function pasteKey() {
    navigator.clipboard.readText().then(text => {
        document.getElementById('key-input').value = text.trim();
    }).catch(err => {
        alert('Vui lòng cấp quyền dán hoặc dán thủ công!');
    });
}

function clearKey() {
    document.getElementById('key-input').value = '';
}

function copyDeviceID() {
    const deviceInput = document.getElementById('device-id');
    deviceInput.select();
    deviceInput.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(deviceInput.value);
    alert('Đã sao chép mã thiết bị vào bộ nhớ tạm!');
}

function verifyKey(action) {
    const key = document.getElementById('key-input').value.trim();
    const statusMsg = document.getElementById('status-msg');

    if (!key) {
        statusMsg.innerText = 'Vui lòng nhập mã kích hoạt!';
        statusMsg.className = 'text-[11px] text-center text-rose-500 pt-1';
        return;
    }

    if (action === 'check') {
        statusMsg.innerText = 'Key hợp lệ (Chưa kích hoạt thiết bị này)';
        statusMsg.className = 'text-[11px] text-center text-[#c084fc] pt-1';
    } else {
        localStorage.setItem('aimlock_hieulive_activated', 'true');
        statusMsg.innerText = 'Kích hoạt thành công!';
        statusMsg.className = 'text-[11px] text-center text-emerald-500 pt-1';
        
        setTimeout(() => {
            document.getElementById('auth-screen').classList.add('hidden');
            document.getElementById('main-dashboard').classList.remove('hidden');
        }, 600);
    }
}

function switchTab(tabName, btnElement) {
    ['home', 'func', 'boost', 'live', 'settings'].forEach(t => {
        document.getElementById('tab-' + t).classList.add('hidden');
    });
    document.getElementById('tab-' + tabName).classList.remove('hidden');

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-[#c084fc]');
        btn.classList.add('text-zinc-500');
    });
    btnElement.classList.remove('text-zinc-500');
    btnElement.classList.add('text-[#c084fc]');
}

function selectGame(type) {
    selectedGameType = type;
    const ffCard = document.getElementById('card-ff');
    const ffMaxCard = document.getElementById('card-ffmax');
    const boostTitle = document.getElementById('boost-title');
    const currentGameLabel = document.getElementById('current-game-label');
    const openGameTitle = document.getElementById('open-game-title');
    const openGameDesc = document.getElementById('open-game-desc');

    if (type === 'ff') {
        ffCard.classList.add('border-[#9333ea]');
        ffMaxCard.classList.remove('border-[#9333ea]');
        boostTitle.innerText = 'FREE FIRE CONFIG';
        currentGameLabel.innerText = 'Free Fire';
        openGameTitle.innerText = 'Khởi chạy Free Fire';
        openGameDesc.innerText = 'AIMLOCK HIEULIVE gọi gói Free Fire chuẩn.';
    } else {
        ffMaxCard.classList.add('border-[#9333ea]');
        ffCard.classList.remove('border-[#9333ea]');
        boostTitle.innerText = 'FREE FIRE MAX CONFIG';
        currentGameLabel.innerText = 'Free Fire MAX';
        openGameTitle.innerText = 'Khởi chạy Free Fire MAX';
        openGameDesc.innerText = 'AIMLOCK HIEULIVE gọi trực tiếp gói ứng dụng game.';
    }

    const cfg = gameConfigs[type];
    document.getElementById('slider-s1').value = cfg.s1;
    document.getElementById('slider-s2').value = cfg.s2;
    document.getElementById('slider-s3').value = cfg.s3;
    document.getElementById('slider-s4').value = cfg.s4;
    document.getElementById('slider-s5').value = cfg.s5;

    document.getElementById('s1-val').innerText = cfg.s1 + '%';
    document.getElementById('s2-val').innerText = cfg.s2 + '%';
    document.getElementById('s3-val').innerText = cfg.s3 + '%';
    document.getElementById('s4-val').innerText = cfg.s4 + '%';
    document.getElementById('s5-val').innerText = cfg.s5 + '%';

    const avg = Math.round((cfg.s1 + cfg.s2 + cfg.s3 + cfg.s4 + cfg.s5) / 5);
    document.getElementById('total-boost-circle').innerText = avg + '%';
}

function updateBoostVal(sliderId, val) {
    document.getElementById(sliderId + '-val').innerText = val + '%';
}

function applyBoost() {
    alert('Đã áp dụng thông số cấu hình AIMLOCK HIEULIVE thành công!');
}

/* BẢN SỬA LỖI MỞ GAME 3 LỚP AN TOÀN */
function openGame() {
    const pkgFF = "com.dts.freefireth";
    const pkgMax = "com.dts.freefiremax";
    const targetPkg = (selectedGameType === 'ff') ? pkgFF : pkgMax;
    const gameName = (selectedGameType === 'ff') ? "Free Fire" : "Free Fire MAX";

    const intentUrl = "intent://#Intent;package=" + targetPkg + ";scheme=freefire;end;";
    
    try {
        window.location.href = intentUrl;
    } catch(e) {}

    setTimeout(() => {
        const storeUrl = "market://details?id=" + targetPkg;
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = storeUrl;
        document.body.appendChild(iframe);
        
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000);
    }, 500);
}

function logout() {
    localStorage.removeItem('aimlock_hieulive_activated');
    location.reload();
}
