// KEY phamhieu1 -> phamhieu100
function checkKey() {
let key = document.getElementById("keyInput").value.toLowerCase().trim();
let ok = false;

for (let i = 1; i <= 100; i++) {
if (key === "phamhieu" + i) {
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
return Math.floor(Math.random() * (max - min + 1) + min);
}

// TẠO CONFIG KHÔNG TRÙNG
function createUnique(data) {
let s, exists;

do {
s = {
look: rand(150,190),
red: rand(150,190),
scope2: rand(150,190),
scope4: rand(150,190),
awm: rand(150,190),
free: rand(150,190),
fire: rand(35,50)
};

```
exists = Object.values(data).some(d =>
  JSON.stringify(d) === JSON.stringify(s)
);
```

} while (exists);

return s;
}

// LƯU MÁY
function saveDevice() {
let device = document.getElementById("deviceInput").value.trim();
if (!device) return;

let data = JSON.parse(localStorage.getItem("devices")) || {};

if (!data[device]) {
data[device] = createUnique(data);
localStorage.setItem("devices", JSON.stringify(data));
}

show(data[device]);

document.getElementById("deviceBox").style.display = "none";
document.getElementById("mainApp").style.display = "block";
}

// HIỂN THỊ
function show(s) {
look.innerText = s.look;
red.innerText = s.red;
scope2.innerText = s.scope2;
scope4.innerText = s.scope4;
awm.innerText = s.awm;
free.innerText = s.free;
fire.innerText = s.fire;
}

// NHẬP MÁY MỚI
function newDevice() {
document.getElementById("deviceInput").value = "";
document.getElementById("deviceBox").style.display = "block";
document.getElementById("mainApp").style.display = "none";
}

// TẢI CONFIG IPHONE
function downloadConfig() {

let content = `<?xml version="1.0" encoding="UTF-8"?>

<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
"http://www.apple.com/DTDs/PropertyList-1.0.dtd">

<plist version="1.0">
<dict>

<key>PayloadDisplayName</key> <string>DPI VIP PRO - PL</string>

<key>PayloadDescription</key> <string>
Tăng độ nhạy max
Kéo tâm dính đầu
Fix lag iPhone

PL VIP CONFIG
SĐT: 0987124052 </string>

<key>PayloadIdentifier</key> <string>pl.vip.config</string>

<key>PayloadUUID</key> <string>PL-9999-7777</string>

<key>PayloadVersion</key> <integer>1</integer>

<key>PayloadType</key> <string>Configuration</string>

</dict>
</plist>`;

let blob = new Blob([content], {type:"application/x-apple-aspen-config"});
let a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = "PL_PRO.mobileconfig";
a.click();
}
