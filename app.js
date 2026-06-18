// KEY riêng của bạn (chỉ bạn biết)
const SECRET_KEY = "HIEUVIP123";

// lưu máy đã dùng
let usedDevices = JSON.parse(localStorage.getItem("devices")) || [];

// lưu độ nhạy đã dùng
let usedSensitivity = JSON.parse(localStorage.getItem("sens")) || [];

// CHECK KEY
function checkKey() {
  let key = document.getElementById("keyInput").value;

  if (key === SECRET_KEY) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("devicePage").style.display = "block";
  } else {
    document.getElementById("status").innerText = "❌ Sai key!";
  }
}

// RANDOM KHÔNG TRÙNG
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
  let device = document.getElementById("deviceName").value;

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

  // CẤU HÌNH IPHONE
  let iphoneConfig = `
📱 Cấu hình iPhone:

- Độ sáng: 80% - 100%
- FPS: Cao (High/Ultra)
- Đồ họa: Smooth
- Tắt tiết kiệm pin
- Bật Assistive Touch (tùy)
- Tắt thông báo nền
- Dọn RAM trước khi chơi

🎯 Gợi ý:
- Dùng 3 ngón hoặc 4 ngón
- Vuốt nhẹ, không kéo mạnh
`;

  document.getElementById("config").innerText = iphoneConfig;
}
