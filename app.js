function checkKey(){
    let key = document.getElementById("keyInput").value.toLowerCase().trim();

    // Thay đổi mật khẩu duy nhất thành "dpivip1"
    if(key === "dpivip1"){
        loginBox.style.display = "none";
        deviceBox.style.display = "block";
    } else {
        alert("Sai mật khẩu!");
    }
}

function rand(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function saveDevice(){
    let name = document.getElementById("deviceInput").value.trim();

    if(!name){
        alert("Vui lòng nhập tên máy!");
        return;
    }

    deviceBox.style.display = "none";
    scanBox.style.display = "block";

    let p = 0;
    let timer = setInterval(() => {
        p++;
        progressBar.style.width = p + "%";
        percent.innerText = p + "%";

        if(p >= 100){
            clearInterval(timer);
            scanBox.style.display = "none";
            showResult(name);
        }
    }, 30);
}

function showResult(name){
    let data = JSON.parse(localStorage.getItem("devices")) || {};

    if(!data[name]){
        data[name] = {
            look: rand(190, 200),
            red: rand(150, 200),
            scope2: rand(150, 200),
            scope4: rand(150, 200),
            awm: rand(150, 200),
            free: rand(150, 200),
            fire: rand(30, 50)
        };
        localStorage.setItem("devices", JSON.stringify(data));
    }

    let s = data[name];
    deviceName.innerText = "📱 " + name;
    look.innerText = s.look;
    red.innerText = s.red;
    scope2.innerText = s.scope2;
    scope4.innerText = s.scope4;
    awm.innerText = s.awm;
    free.innerText = s.free;
    fire.innerText = s.fire;

    mainApp.style.display = "block";
}

function newDevice(){
    mainApp.style.display = "none";
    deviceBox.style.display = "block";
    document.getElementById("deviceInput").value = "";
}

function downloadConfig(){
    const profile = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
    <key>PayloadIdentifier</key>
    <string>com.phamhieu.config.pro</string>
    <key>PayloadUUID</key>
    <string>8A4F1D92-E29B-4D31-9F22-A1B2C3D4E5F6</string>
    <key>PayloadDisplayName</key>
    <string>📦 PHAMHIEU PRO CHIP A</string>
    <key>PayloadDescription</key>
    <string>• Phiên bản: PHAMHIEU PRO&#xA;• Trạng thái: Hoạt động&#xA;• Tối ưu hóa cấu hình hệ thống iOS&#xA;• Khuyến nghị khởi động lại máy sau khi cài đặt&#xA;• Liên hệ Zalo Admin: 0987124052</string>
    <key>PayloadOrganization</key>
    <string>PhamHieu Tech (Đã xác thực)</string>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>PayloadType</key>
            <string>com.apple.webClip.managed</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>PayloadIdentifier</key>
            <string>com.phamhieu.webclip</string>
            <key>PayloadUUID</key>
            <string>9B5F2E03-F30C-5E42-A033-B2C3D4E5F6A7</string>
            <key>PayloadDisplayName</key>
            <string>PhamHieu Pro</string>
            <key>URL</key>
            <string>https://hieuliveregedit.github.io/hieulive/</string>
            <key>Label</key>
            <string>PhamHieu Pro</string>
            <key>IsRemovable</key>
            <true/>
            <true/>
            <key>FullScreen</key>
            <true/>
        </dict>
    </array>
</dict>
</plist>`;

    const blob = new Blob([profile], { type: "application/x-apple-aspen-config" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "PhamHieu_Pro_ChipA.mobileconfig";
    a.click();
    URL.revokeObjectURL(a.href);
}
