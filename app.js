// ===== KEY SYSTEM =====
let validKeys = JSON.parse(localStorage.getItem("vip_keys")) || ["HIEUVIP123"];

function generateVIPKey() {
  let key = "VIP-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  validKeys.push(key);
  localStorage.setItem("vip_keys", JSON.stringify(validKeys));
  alert("KEY: " + key);
}

function checkKey() {
  let key = document.getElementById("keyInput").value.trim().toUpperCase();
  let pass = document.getElementById("passwordInput").value.trim().toLowerCase();

  let okPass = false;
  for (let i = 1; i <= 100; i++) {
    if (pass === "phamhieu" + i) okPass = true;
  }

  if (validKeys.includes(key) && okPass) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("devicePage").style.display = "block";
  } else {
    document.getElementById("status").innerText = "Sai key hoặc pass!";
  }
}

// ===== MAIN =====
function start() {
  let name = document.getElementById("deviceName").value;

  document.getElementById("devicePage").style.display = "none";
  document.getElementById("mainPage").style.display = "block";

  document.getElementById("deviceText").innerText = name;

  let s = generateSensitivity(name);

  document.getElementById("general").innerText = s.general;
  document.getElementById("redDot").innerText = s.redDot;
  document.getElementById("scope2x").innerText = s.scope2x;
  document.getElementById("scope4x").innerText = s.scope4x;
  document.getElementById("sniper").innerText = s.sniper;
  document.getElementById("freeLook").innerText = s.freeLook;
  document.getElementById("fireBtn").innerText = s.fireBtn;
}

// ===== RANDOM ĐỘ NHẠY =====
function generateSensitivity(device) {
  let seed = device.length * 999;

  function rand(min, max) {
    seed = (seed * 9301 + 49297) % 233280;
    return Math.floor(min + (seed / 233280) * (max - min));
  }

  return {
    general: rand(180, 190),
    redDot: rand(180, 190),
    scope2x: rand(170, 185),
    scope4x: rand(170, 185),
    sniper: rand(90, 120),
    freeLook: rand(110, 130),
    fireBtn: rand(35, 50)
  };
}

// ===== DOWNLOAD CONFIG =====
function downloadConfig() {
  let text = `
VIP MOBILE CONFIG

✔ Tăng độ nhạy
✔ Kéo tâm dễ bám đầu
✔ Tối ưu iPhone
✔ Giảm lag

Liên hệ: 0987124052
`;

  let blob = new Blob([text], { type: "text/plain" });
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "vipmobile.config";
  a.click();
}
