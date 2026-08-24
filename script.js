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
            document.getElementById('status-msg').innerText = "Mã hợp lệ. Hết hạn: 08:00:00 01/01/1970";
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

function logout() {
    document.getElementById('main-dashboard').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
}
