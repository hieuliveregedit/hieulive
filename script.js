// Chuyển Tab điều hướng
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');
    window.scrollTo(0, 0);
}

// Cập nhật giá trị thanh kéo Range Slider
function updateVal(elementId, val) {
    document.getElementById(elementId).innerText = val + '%';
}
