function rand() {
return Math.floor(Math.random() * (190 - 150) + 150);
}

// random độ nhạy
function genSens() {
document.getElementById("look").innerText = rand();
document.getElementById("red").innerText = rand();
document.getElementById("scope2").innerText = rand();
document.getElementById("scope4").innerText = rand();
document.getElementById("awm").innerText = rand();
document.getElementById("free").innerText = rand();
}

// tải config iPhone (.mobileconfig)
function downloadConfig() {

let content = `<?xml version="1.0" encoding="UTF-8"?>

<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
"http://www.apple.com/DTDs/PropertyList-1.0.dtd">

<plist version="1.0">
<dict>

<key>PayloadDisplayName</key> <string>🔥 CONFIG IPHONE HIEU LIVE</string>

<key>PayloadDescription</key> <string>
Tăng độ nhạy Free Fire
Kéo tâm dính đầu
Giảm delay cảm ứng
Tối ưu hiệu năng

Liên hệ: 0987124052 </string>

<key>PayloadIdentifier</key> <string>com.hieulive.profile</string>

<key>PayloadUUID</key> <string>HIEU-9999-8888</string>

<key>PayloadVersion</key> <integer>1</integer>

<key>PayloadType</key> <string>Configuration</string>

</dict>
</plist>`;

let blob = new Blob([content], { type: "application/x-apple-aspen-config" });

let a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = "HIEU_CONFIG.mobileconfig";
a.click();
}
