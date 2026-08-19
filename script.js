// Chuyển Tab điều hướng
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');
    window.scrollTo(0, 0);
}

// Cập nhật giá trị thanh kéo Range Slider
function updateVal(elementId, val) {
    document.getElementById(elementId).innerText = val + '%';
}

// Xử lý các nút Nhập Key
async function pasteKey() {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('license-key').value = text;
    } catch (err) {
        alert("Vui lòng tự dán key thủ công.");
    }
}

function clearKey() {
    document.getElementById('license-key').value = '';
}

function copyHWID() {
    const hwidInput = document.getElementById('hwid');
    navigator.clipboard.writeText(hwidInput.value);
    alert("Đã sao chép HWID: " + hwidInput.value);
}

function checkKey() {
    const key = document.getElementById('license-key').value;
    if (!key) {
        alert("Vui lòng nhập Key trước khi kiểm tra!");
    } else {
        alert("Đang kiểm tra Key: " + key);
    }
}

function activateKey() {
    const key = document.getElementById('license-key').value;
    if (!key) {
        alert("Vui lòng nhập Key để kích hoạt!");
    } else {
        alert("Kích hoạt thành công cho Key: " + key);
    }
}
