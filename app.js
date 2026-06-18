function checkKey(){

let key=document.getElementById("keyInput").value.toLowerCase().trim();

let ok=false;

for(let i=1;i<=100;i++){
if(key==="phamhieu"+i){
ok=true;
break;
}
}

if(ok){
loginBox.style.display="none";
deviceBox.style.display="block";
}else{
alert("Sai mật khẩu!");
}

}

function rand(min,max){
return Math.floor(Math.random()*(max-min+1))+min;
}

function saveDevice(){

let name=document.getElementById("deviceInput").value.trim();

if(!name){
alert("Nhập tên máy!");
return;
}

deviceBox.style.display="none";
scanBox.style.display="block";

let p=0;

let timer=setInterval(()=>{

p++;

progressBar.style.width=p+"%";
percent.innerText=p+"%";

if(p>=100){

clearInterval(timer);

scanBox.style.display="none";

showResult(name);

}

},30);

}

function showResult(name){

let data=JSON.parse(localStorage.getItem("devices"))||{};

if(!data[name]){

data[name]={

look:rand(190,200),
red:rand(150,200),
scope2:rand(150,200),
scope4:rand(150,200),
awm:rand(150,200),
free:rand(150,200),
fire:rand(40,60)

};

localStorage.setItem("devices",JSON.stringify(data));

}

let s=data[name];

deviceName.innerText="📱 "+name;

look.innerText=s.look;
red.innerText=s.red;
scope2.innerText=s.scope2;
scope4.innerText=s.scope4;
awm.innerText=s.awm;
free.innerText=s.free;
fire.innerText=s.fire;

mainApp.style.display="block";

}

function newDevice(){

mainApp.style.display="none";
deviceBox.style.display="block";

}

function downloadConfig(){

const profile=`<?xml version="1.0" encoding="UTF-8"?>

<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
"http://www.apple.com/DTDs/PropertyList-1.0.dtd">

<plist version="1.0">
<dict>

<key>PayloadType</key> <string>Configuration</string>

<key>PayloadVersion</key> <integer>1</integer>

<key>PayloadIdentifier</key> <string>com.phamhieu.profile</string>

<key>PayloadUUID</key> <string>12345678-1234-1234-1234-123456789012</string>

<key>PayloadDisplayName</key> <string>PhamHieu Device Profile</string>

<key>PayloadDescription</key> <string>Profile demo</string>

<key>PayloadOrganization</key> <string>PhamHieu Tech</string>

<key>PayloadContent</key> <array/>

</dict>
</plist>`;

const blob=new Blob([profile],{
type:"application/x-apple-aspen-config"
});

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);
a.download="PhamHieu.mobileconfig";
a.click();

}
