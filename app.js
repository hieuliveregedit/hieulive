function generateKey() {
  let key = "VIP-" + Math.random().toString(36).substring(2, 10).toUpperCase();
  
  validKeys.push(key);

  alert("Key mới: " + key);

  // lưu local
  localStorage.setItem("keys", JSON.stringify(validKeys));
}

// load key đã lưu
let savedKeys = localStorage.getItem("keys");
if (savedKeys) {
  validKeys = JSON.parse(savedKeys);
}
