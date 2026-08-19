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

    // Ẩn tất cả các tab
    document.querySelectorAll('.tab-content').forEach(t => {
        t.classList.remove('active');
    });

    // Bỏ active tất cả các nút bấm menu
    document.querySelectorAll('.nav-btn').forEach(b => {
        b.classList.remove('active');
    });
    
    // Hiện tab được chọn
    const target = document.getElementById('tab-' + tabId);
    if (target) {
        target.classList.add('active');
    }
    
    // Sáng nút được bấm
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
        moKhoaThanhCong();
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
            moKhoaThanhCong();
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

// Hàm xử lý khi đúng key: Ẩn tab home, hiện menu dưới và nhảy sang tab Func
function moKhoaThanhCong() {
    isKeyValid = true;

    // 1. HIỆN THANH ĐIỀU HƯỚNG 4 NÚT Ở DƯỚI LÊN
    const nav = document.getElementById("bottomNav");
    if(nav) {
        nav.classList.remove("hidden");
    }

    // 2. ẨN TẤT CẢ CÁC TAB HIỆN TẠI (Ẩn tab-home)
    document.querySelectorAll('.tab-content').forEach(t => {
        t.classList.remove('active');
    });

    // 3. HIỆN TAB 'func' (Tác vụ) LÊN
    const funcTab = document.getElementById('tab-func');
    if(funcTab) {
        funcTab.classList.add('active');
    }

    // 4. LÀM SÁNG NÚT 'Func' TRÊN THANH MENU (Nút thứ 2)
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(b => b.classList.remove('active'));
    if(buttons.length > 1) {
        buttons[1].classList.add('active'); 
    }

    alert("Kích hoạt thành công! Đã mở khóa các tính năng.");
}

function resetInput() {
    document.getElementById("keyInput").value = "";
}

function logout() {
    location.reload();
}
