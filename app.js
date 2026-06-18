// KEY của bạn
const SECRET_KEY = "HIEUVIP123";

// lưu dữ liệu
let usedDevices = JSON.parse(localStorage.getItem("devices")) || [];
let usedSensitivity = JSON.parse(localStorage.getItem("sens")) || [];

// LOGIN
function checkKey() {
  let key = document.getElementById("keyInput").value.trim().toUpperCase();
  let pass = document.getElementById("passwordInput").value.trim().toLowerCase();

  let validPass = false;

  for (let i = 1; i <= 100; i++) {
    if (pass === "phamhieu" + i) {
      validPass = true;
      break;
    }
  }

  if (key === SECRET_KEY.toUpperCase() && validPass) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("devicePage").style.display = "block";
  } else {
    document.getElementById("status").innerText = "❌ Sai key hoặc mật khẩu!";
  }
}

// random không trùng
function getUniqueSensitivity() {
  let value;

  do {
    value = Math.floor(Math.random() * (190 - 150 + 1)) + 150;
  } while (usedSensitivity.includes(value));

  usedSensitivity.push(value);
  localStorage.setItem("sens", JSON.stringify(usedSensitivity));

  return value;
}

// GENERATE
function generate() {
  let device = document.getElementById("deviceName").value.trim();

  if (device === "") {
    alert("❌ Nhập tên máy!");
    return;
  }

  if (usedDevices.includes(device)) {
    alert("❌ Máy này đã dùng rồi!");
    return;
  }

  usedDevices.push(device);
  localStorage.setItem("devices", JSON.stringify(usedDevices));

  let sens = {
    "General": getUniqueSensitivity(),
    "Red Dot": getUniqueSensitivity(),
    "2x Scope": getUniqueSensitivity(),
    "4x Scope": getUniqueSensitivity(),
    "AWM Scope": getUniqueSensitivity(),
    "Free Look": getUniqueSensitivity()
  };

  document.getElementById("devicePage").style.display = "none";
  document.getElementById("resultPage").style.display = "block";

  document.getElementById("result").innerText = JSON.stringify(sens, null, 2);

  // cấu hình iPhone
  let config = `
📱 Cấu hình iPhone:

- Độ sáng: 80% - 100%
- FPS: Cao (High/Ultra)
- Đồ họa: Smooth
- Tắt tiết kiệm pin
- Tắt app nền
- Dọn RAM trước khi chơi

🎯 Tips:
- Dùng 3 ngón hoặc 4 ngón
- Vuốt nhẹ tay
`;

  document.getElementById("config").innerText = config;
}
