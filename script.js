// KẾT NỐI SUPABASE (Giữ nguyên cấu hình chuẩn của bố mày)
const SUPABASE_URL = "https://aqaxmmpznarjntehxhaz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxYXhtbXB6bmFyam50ZWh4aGF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxMjI5NjIsImV4cCI6MjEwMjY5ODk2Mn0.8Z83zrHqKzjPg4zdJlZb5aucdaD741CmprDJnJu2ycw"; 
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let isKeyValid = false;

// LOGIC CHUYỂN TAB CHO GIAO DIỆN 2 CỘT
function switchTab(tabId, btn) {
    // Vẫn yêu cầu kích hoạt mới cho dùng tab
    if (!isKeyValid) {
        alert("Vui lòng nhập Key kích hoạt để vào trang tác vụ!");
        return;
    }

    // Ẩn tất cả nội dung tab ở CỘT PHẢI
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    // Bỏ active tất cả nút nav
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    // Hiện tab được chọn ở CỘT PHẢI
    document.getElementById('tab-' + tabId).classList.add('active');
    // Active nút nav tương ứng
    btn.classList.add('active');
}

// Kiểm Tra Key (Giữ nguyên logic cũ)
async function checkKey() {
    const keyVal = document.getElementById("keyInput").value.trim();
    const statusMsg = document.getElementById("statusMsg");

    if(!keyVal) {
        alert("Vui lòng nhập Key!");
        return;
    }

    statusMsg.innerText = "Đang kiểm tra Key...";
    statusMsg.style.color = "#ffc107";

    // MỞ KHÓA NGAY NẾU NHẬP KEY THỦ CÔNG LÀ "123456"
    if (keyVal === "123456") {
        moKhoaThanhCong();
        return;
    }

    // Nếu không phải key cứng thì check tiếp trên Supabase
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

// Hàm phụ trợ mở khóa giao diện
function moKhoaThanhCong() {
    isKeyValid = true;
    const statusMsg = document.getElementById("statusMsg");
    statusMsg.innerText = "Trạng thái: Đã kích hoạt thành công! ✅";
    statusMsg.style.color = "#28a745";

    // Tự động chuyển sang tab 'func' ở cột phải khi kích hoạt thành công
    const funcBtn = document.querySelector('.nav-btn[onclick*="switchTab(\'func\'"]');
    if(funcBtn) {
        switchTab('func', funcBtn);
    }

    // Hiện thanh điều hướng dưới (chỉ hiển thị trên mobile)
    const nav = document.getElementById("bottomNav");
    if(nav) {
        nav.style.display = "flex";
        nav.classList.remove("hidden");
    }

    alert("Kích hoạt thành công! Đã mở khóa hệ thống.");
}

function resetInput() {
    document.getElementById("keyInput").value = "";
}

function logout() {
    location.reload();
}
