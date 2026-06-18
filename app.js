function checkKey(){

let key=document
.getElementById("keyInput")
.value
.toLowerCase()
.trim();

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

return Math.floor(
Math.random()*(max-min+1)
)+min;

}

function saveDevice(){

let name=document
.getElementById("deviceInput")
.value
.trim();

if(!name){

alert("Vui lòng nhập tên máy!");
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

let data=
JSON.parse(
localStorage.getItem("devices")
)||{};

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

localStorage.setItem(
"devices",
JSON.stringify(data)
);

}

let s=data[name];

deviceName.innerText=
"📱 "+name;

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

document
.getElementById("deviceInput")
.value="";

}

function downloadConfig(){

const content=
`PHAMHIEU PRO CHIP A

Trang thai: Da xac thuc

Phien ban: CHIP A

Tuong thich:
iPhone / iPad

Lien he Admin:
0987124052`;

const blob=new Blob(
[content],
{
type:"text/plain"
}
);

const a=document.createElement("a");

a.href=
URL.createObjectURL(blob);

a.download=
"PhamHieu-Chip-A.txt";

a.click();

URL.revokeObjectURL(a.href);

}
