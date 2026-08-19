// KẾT NỐI SUPABASE
const SUPABASE_URL = "https://aqaxmmpznarjntehxhaz.supabase.co";
const SUPABASE_KEY = "SERVICE_ROLE_HOAC_ANON_KEY_CUA_BAN"; 
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let isKeyValid = false;

// Chuyển Tab (4 Tab)
function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById('tab-' + tabId).classList.add('active');
    btn.classList.add('active');
}

// Kiểm Tra Key trên Supabase
async function checkKey() {
    const keyVal = document.getElementById("keyInput").value.trim();
    const statusMsg = document.getElementById("statusMsg");

    if(!keyVal) {
        alert("Vui lòng nhập Key!");
        return;
    }

    statusMsg.innerText = "Đang kiểm tra Key...";
    statusMsg.style.color = "#ffc107";

    try {
        const { data, error } = await _supabase
            .from('keys')
            .select('*')
            .eq('key', keyVal)
            .eq('status', 'active');

        if (data && data.length > 0) {
            isKeyValid = true;
            statusMsg.innerText = "Trạng thái: Đã kích hoạt thành công! ✅";
            statusMsg.style.color = "#28a745";

            // MỞ KHÓA TẤT CẢ CÁC CÔNG CỤ
            document.getElementById("funcLockArea").classList.remove("locked");
            document.getElementById("boostLockArea").classList.remove("locked");

            alert("Kích hoạt HieuLive Lock thành công! Tất cả tác vụ Aimlock đã được mở.");
        } else {
            statusMsg.innerText = "Trạng thái: Key không tồn tại hoặc đã hết hạn ❌";
            statusMsg.style.color = "#ff4d4d";
            alert("Key/Mật khẩu không chính xác!");
        }
    } catch (e) {
        statusMsg.innerText = "Lỗi kết nối máy chủ!";
        console.error(e);
    }
}

function resetInput() {
    document.getElementById("keyInput").value = "";
}

function logout() {
    location.reload();
}
