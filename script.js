// KẾT NỐI SUPABASE CHUẨN XÁC
const SUPABASE_URL = "https://aqaxmmpznarjntehxhaz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxYXhtbXB6bmFyam50ZWh4aGF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxMjI5NjIsImV4cCI6MjEwMjY5ODk2Mn0.8Z83zrHqKzjPg4zdJlZb5aucdaD741CmprDJnJu2ycw"; 
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let isKeyValid = false;

// Chuyển Tab qua lại giữa các nút ở menu dưới
function switchTab(tabId, btn) {
    if (!isKeyValid) {
        alert("Vui lòng nhập Key kích hoạt để vào trang tác vụ!");
        return;
    }

    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.bottom-nav .nav-btn, .nav-btn').forEach(b => b.classList.remove('active'));
    
    const target = document.getElementById('tab-' + tabId);
    if (target) {
        target.classList.add('active');
    }
    if (btn) {
        btn.classList.add('active');
    }
}

// Kiểm Tra Key (Hỗ trợ cả key cứng "123456" lẫn Supabase)
async function checkKey() {
    const keyVal = document.getElementById("keyInput").value.trim();
    const statusMsg = document.getElementById("statusMsg");

    if(!keyVal) {
        alert("Vui lòng nhập Key!");
        return;
    }

    statusMsg.innerText = "Đang kiểm tra Key...";
    statusMsg.style.color = "#ffc107";

    // MỞ KHÓA NẾU LÀ KEY CỨNG 123456
    if (keyVal === "123456") {
        thanhCongVaChuyenTab();
        return;
    }

    try {
        const { data, error } = await _supabase
            .from('keys')
            .select('*')
            .eq('key_code', keyVal)
            .eq('is_active', true);

        if (error) {
            console.error("Lỗi Supabase:", error);
            statusMsg.innerText = "Lỗi truy vấn cơ sở dữ liệu!";
            return;
        }

        if (data && data.length > 0) {
            thanhCongVaChuyenTab();
        } else {
            statusMsg.innerText = "Trạng thái: Key không tồn tại hoặc chưa kích hoạt ❌";
            statusMsg.style.color = "#ff4d4d";
            alert("Key không chính xác hoặc chưa được kích hoạt!");
        }
    } catch (e) {
        statusMsg.innerText = "Lỗi kết nối máy chủ!";
        console.error(e);
    }
}

// Hàm xử lý khi đúng key: Mở khóa thanh menu và TỰ ĐỘNG CHUYỂN SANG TAB FUNC
function thanhCongVaChuyenTab() {
    isKeyValid = true;
    const statusMsg = document.getElementById("statusMsg");
    statusMsg.innerText = "Trạng thái: Đã kích hoạt thành công! ✅";
    statusMsg.style.color = "#28a745";

    // Hiện thanh điều hướng dưới lên
    const nav = document.getElementById("bottomNav");
    if(nav) {
        nav.style.display = "flex";
        nav.classList.remove("hidden");
    }

    // TỰ ĐỘNG CHUYỂN SANG TAB 'func' (Tác vụ)
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.bottom-nav .nav-btn, .nav-btn').forEach(b => b.classList.remove('active'));

    const funcTab = document.getElementById('tab-func');
    if(funcTab) {
        funcTab.classList.add('active');
    }

    // Kích hoạt sáng nút Func trên menu (nút thứ 2)
    const funcBtn = document.querySelectorAll('.bottom-nav .nav-btn')[1] || document.querySelector('.nav-btn:nth-child(2)');
    if(funcBtn) {
        funcBtn.classList.add('active');
    }

    alert("Kích hoạt thành công! Đang chuyển sang trang tác vụ...");
}

function resetInput() {
    document.getElementById("keyInput").value = "";
}

function logout() {
    location.reload();
}
