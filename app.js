function rand() {
return Math.floor(Math.random() * (190 - 150) + 150);
}

function genSens() {
document.getElementById("look").innerText = rand();
document.getElementById("red").innerText = rand();
document.getElementById("scope2").innerText = rand();
document.getElementById("scope4").innerText = rand();
document.getElementById("awm").innerText = rand();
document.getElementById("free").innerText = rand();
}

function showPayment() {
document.getElementById("paymentBox").style.display = "flex";
}

function hidePayment() {
document.getElementById("paymentBox").style.display = "none";
}

function fakeCheck() {
let phone = document.getElementById("phoneInput").value;
let status = document.getElementById("status");

if (!phone) {
alert("Nhập SĐT!");
return;
}

status.innerText = "⏳ Đang kiểm tra...";

setTimeout(() => {
status.innerText = "✅ Thanh toán thành công!";
}, 3000);
}

function downloadConfig() {
let content = `
CONFIG VIP IPHONE

* Tăng độ nhạy tối đa
* Kéo tâm dễ headshot
* Fix lag
* Tối ưu iOS

Liên hệ: 0987124052
`;

let blob = new Blob([content], { type: "text/plain" });
let a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = "config.txt";
a.click();
}
