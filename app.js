// CHECK KEY (pham hieu 1 → 100)
function checkKey() {
let key = document.getElementById("keyInput").value.toLowerCase().trim();
let ok = false;

for (let i = 1; i <= 100; i++) {
if (key === "pham hieu " + i) {
ok = true;
break;
}
}

if (ok) {
document.getElementById("loginBox").style.display = "none";
document.getElementById("deviceBox").style.display = "block";
} else {
alert("Sai key");
}
}

// RANDOM
function rand(min, max) {
return Math.floor(Math.random() * (max - min) + min);
}

// TẠO ĐỘ NHẠY RIÊNG
function createSens() {
return {
look: rand(150,190),
red: rand(150,190),
scope2: rand(150,190),
scope4: rand(150,190),
awm: rand(150,190),
free: rand(150,190)
};
}

// LƯU MÁY (KHÔNG TRÙNG)
function saveDevice() {
let device = document.getElementById("deviceInput").value.trim();
if (!device) return;

let data = JSON.parse(localStorage.getItem("devices")) || {};

if (!data[device]) {
data[device] = createSens();
localStorage.setItem("devices", JSON.stringify(data));
}

showSens(data[device]);

document.getElementById("deviceBox").style.display = "none";
document.getElementById("mainApp").style.display = "block";
}

// HIỂN THỊ
function showSens(s) {
document.getElementById("look").innerText = s.look;
document.getElementById("red").innerText = s.red;
document.getElementById("scope2").innerText = s.scope2;
document.getElementById("scope4").innerText = s.scope4;
document.getElementById("awm").innerText = s.awm;
document.getElementById("free").innerText = s.free;
}

// TẢI CONFIG IPHONE
function downloadConfig() {

let content = `<?xml version="1.0" encoding="UTF-8"?>

<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
"http://www.apple.com/DTDs/PropertyList-1.0.dtd">

<plist version="1.0">
<dict>

<key>PayloadDisplayName</key> <string>DPI VIP IPHONE - PL</string>

<key>PayloadDescription</key> <string>
Tăng độ nhạy cảm ứng
Kéo tâm dính đầu
Giảm delay

PL CONFIG VIP
Liên hệ: 0987124052 </string>

<key>PayloadIdentifier</key> <string>pl.config.iphone</string>

<key>PayloadUUID</key> <string>PL-9999-8888</string>

<key>PayloadVersion</key> <integer>1</integer>

<key>PayloadType</key> <string>Configuration</string>

</dict>
</plist>`;

let blob = new Blob([content], { type: "application/x-apple-aspen-config" });

let a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = "PL_CONFIG.mobileconfig";
a.click();
}
