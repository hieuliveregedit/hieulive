let validKeys = [];

// load config key
fetch("vipmobile.config")
  .then(res => res.json())
  .then(data => {
    validKeys = data.validKeys;

    // load thêm key local
    let saved = localStorage.getItem("keys");
    if (saved) {
      validKeys = validKeys.concat(JSON.parse(saved));
    }
  });

// LOGIN
function checkLogin() {
  let key = document.getElementById("keyInput").value;
  let pass = document.getElementById("passwordInput").value;

  let validPass = false;

  for (let i = 1; i <= 100; i++) {
    if (pass === "phamhieu" + i) {
      validPass = true;
      break;
    }
  }

  if (validKeys.includes(key) && validPass) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("devicePage").style.display = "block";
  } else {
    document.getElementById("loginStatus").innerText = "❌ Sai key hoặc mật khẩu!";
  }
}

// TẠO KEY
function generateKey() {
  let key = "VIP-" + Math.random().toString(36).substring(2, 10).toUpperCase();

  validKeys.push(key);

  let stored = JSON.parse(localStorage.getItem("keys")) || [];
  stored.push(key);

  localStorage.setItem("keys", JSON.stringify(stored));

  alert("✅ Key mới: " + key);
}

// HASH để random ổn định
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

// RANDOM THEO MÁY
function generateSensitivity() {
  let device = document.getElementById("deviceName").value;
  let ram = document.getElementById("ram").value;
  let chip = document.getElementById("chip").value;

  let base = hashCode(device + ram + chip);

  function rand(max) {
    base = (base * 9301 + 49297) % 233280;
    return Math.abs(Math.floor((base / 233280) * max));
  }

  let sensitivity = {
    "General": rand(200),
    "Red Dot": rand(200),
    "2x Scope": rand(200),
    "4x Scope": rand(200),
    "AWM Scope": rand(200),
    "Free Look": rand(200)
  };

  // hiển thị
  document.getElementById("devicePage").style.display = "none";
  document.getElementById("resultPage").style.display = "block";

  document.getElementById("result").innerText =
    "Thiết bị: " + device + "\n" +
    "RAM: " + ram + "\n" +
    "Chip: " + chip + "\n\n" +
    JSON.stringify(sensitivity, null, 2);

  // LƯU LỊCH SỬ
  let history = JSON.parse(localStorage.getItem("history")) || [];

  history.push({
    device,
    ram,
    chip,
    sensitivity
  });

  localStorage.setItem("history", JSON.stringify(history));

  loadHistory();
}

// LOAD HISTORY
function loadHistory() {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  let html = "";

  history.reverse().forEach(item => {
    html += `
      <div>
        <b>${item.device}</b><br>
        RAM: ${item.ram} | Chip: ${item.chip}
      </div>
    `;
  });

  document.getElementById("history").innerHTML = html;
}

// load khi mở
window.onload = loadHistory;
