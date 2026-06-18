function checkKey(){
let key=document.getElementById("keyInput").value.toLowerCase();
let ok=false;

for(let i=1;i<=100;i++){
if(key==="phamhieu"+i) ok=true;
}

if(ok){
loginBox.style.display="none";
deviceBox.style.display="block";
}else{
alert("Sai key");
}
}

function rand(a,b){
return Math.floor(Math.random()*(b-a+1)+a);
}

function saveDevice(){
let name=document.getElementById("deviceInput").value;
if(!name) return;

let data=JSON.parse(localStorage.getItem("d"))||{};

if(!data[name]){
data[name]={
look:rand(150,190),
red:rand(150,190),
scope2:rand(150,190),
scope4:rand(150,190),
awm:rand(150,190),
free:rand(150,190),
fire:rand(33,50)
};
localStorage.setItem("d",JSON.stringify(data));
}

let s=data[name];

look.innerText=s.look;
red.innerText=s.red;
scope2.innerText=s.scope2;
scope4.innerText=s.scope4;
awm.innerText=s.awm;
free.innerText=s.free;
fire.innerText=s.fire;

deviceBox.style.display="none";
mainApp.style.display="block";
}

function newDevice(){
mainApp.style.display="none";
deviceBox.style.display="block";
}

function downloadConfig(){

let txt=`VIP DPI PRO
Tang do nhay
Lien he: 0987124052`;

let blob=new Blob([txt]);
let a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="vip.mobileconfig";
a.click();
}
