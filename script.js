// THÔNG TIN KẾT NỐI SUPABASE
const SUPABASE_URL = "https://aqaxmmpznarjntehxhaz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxYXhtbXB6bmFyam50ZWh4aGF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxMjI5NjIsImV4cCI6MjEwMjY5ODk2Mn0.8Z83zrHqKzjPg4zdJlZb5aucdaD741CmprDJnJu2ycw";

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

// KIỂM TRA KEY TỪ DATABASE
async function checkKey() {
    const keyCode = document.getElementById('license-key').value.trim();
    if (!keyCode) {
        alert("⚠️ Vui lòng nhập Key trước khi kiểm tra!");
        return;
    }

    const headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`
    };

    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/keys?key_code=eq.${keyCode}`, { headers });
        const data = await res.json();

        if (data.length === 0) {
            alert("❌ Key không tồn tại!");
        } else {
            const keyInfo = data[0];
            const status = keyInfo.is_active ? "Đã kích hoạt" : "Chưa kích hoạt (Sẵn sàng)";
            alert(`✅ KEY HỢP LỆ!\n• Mã: ${keyInfo.key_code}\n• Hạn dùng: ${keyInfo.duration_days} ngày\n• Trạng thái: ${status}`);
        }
    } catch (err) {
        alert("❌ Lỗi kết nối đến Server API!");
    }
}

// KÍCH HOẠT KEY TỪ DATABASE
async function activateKey() {
    const keyCode = document.getElementById('license-key').value.trim();
    const hwid = document.getElementById('hwid').value;

    if (!keyCode) {
        alert("⚠️ Vui lòng nhập Key để kích hoạt!");
        return;
    }

    const headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json"
    };

    try {
        // 1. Kiểm tra Key trong Database
        const res = await fetch(`${SUPABASE_URL}/rest/v1/keys?key_code=eq.${keyCode}`, { headers });
        const data = await res.json();

        if (data.length === 0) {
            alert("❌ Key không tồn tại!");
            return;
        }

        const keyInfo = data[0];

        // 2. Kiểm tra nếu Key đã bị dùng trên máy khác
        if (keyInfo.is_active && keyInfo.hwid !== hwid) {
            alert("⚠️ Key này đã được kích hoạt trên thiết bị khác!");
            return;
        }

        // 3. Nếu Key mới -> Kích hoạt và gán mã HWID thiết bị
        if (!keyInfo.is_active) {
            await fetch(`${SUPABASE_URL}/rest/v1/keys?key_code=eq.${keyCode}`, {
                method: "PATCH",
                headers: headers,
                body: JSON.stringify({
                    is_active: true,
                    hwid: hwid,
                    activated_at: new Date().toISOString()
                })
            });
        }

        alert(`🎉 KÍCH HOẠT THÀNH CÔNG VIPLOCK!\n• Hạn dùng: ${keyInfo.duration_days} ngày\n• Thiết bị: ${hwid}`);
        
    } catch (err) {
        alert("❌ Lỗi kích hoạt Key!");
    }
}
