async function activateKey() {
  const userKey = document.getElementById("keyInput").value.trim();
  
  if (!userKey) {
    alert("Vui lòng nhập Key/Mật khẩu!");
    return;
  }

  // Gửi lên Supabase kiểm tra xem key có hợp lệ không
  const { data, error } = await supabaseClient
    .from('keys')
    .select('*')
    .eq('key', userKey)
    .eq('status', 'active');

  if (data && data.length > 0) {
    alert("Kích hoạt thành công! Đã mở khóa Aimlock.");
    // Mở khóa các nút chức năng Aimlock, Kéo tâm tại đây
    document.getElementById("aimlockSection").style.display = "block"; 
  } else {
    alert("Key/Mật khẩu không đúng hoặc đã hết hạn!");
  }
}
