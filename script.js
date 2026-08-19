// KẾT NỐI SUPABASE
const SUPABASE_URL = "https://aqaxmmpznarjntehxhaz.supabase.co";
const SUPABASE_KEY = "SERVICE_ROLE_HOAC_ANON_KEY_CUA_BAN"; 
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let isKeyValid = false;

// Chuyển Tab (Chỉ cho phép khi đã nhập key)
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

            // HIỆN THANH MENU ĐIỀU HƯỚNG BÊN DƯỚI KHI THÀNH CÔNG
            document.getElementById("bottomNav").classList.remove("hidden");

            alert("Kích hoạt thành công! Đã mở khóa các trang tác vụ.");
            
            // Tự động chuyển thẳng sang trang Func (tác vụ) luôn cho mượt
            switchTab('func', document.querySelectorAll('.nav-btn')[1]);

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
