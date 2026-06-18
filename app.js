const SECRET_KEY = "HIEUVIP123";

function checkKey() {
  let key = document.getElementById("keyInput").value.trim().toUpperCase();
  let pass = document.getElementById("passwordInput").value.trim().toLowerCase();

  // kiểm tra mật khẩu phamhieu1 → phamhieu100
  let validPass = false;
  for (let i = 1; i <= 100; i++) {
    if (pass === "phamhieu" + i) {
      validPass = true;
      break;
    }
  }

  // check key (không phân biệt hoa thường)
  if (key === SECRET_KEY.toUpperCase() && validPass) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("devicePage").style.display = "block";
  } else {
    document.getElementById("status").innerText = "❌ Sai key hoặc mật khẩu!";
  }
}
