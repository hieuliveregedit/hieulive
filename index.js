const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// Token bot Telegram của bạn
const token = '8849614440:AAGkn9fsy0fcZcrP1-nEfXh4sjAL3e__drg';

const bot = new TelegramBot(token, { 
    polling: {
        interval: 2000,
        autoStart: true,
        params: { timeout: 10 }
    } 
});

const app = express();
app.use(express.json());

// Middleware cấp phép CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

global.keyDatabase = {};

// Bắt lỗi Polling để không bị crash bot
bot.on('polling_error', (error) => {
    console.error('Lỗi Polling Telegram:', error.message);
});

// 1. Lệnh tạo Key (Lưu vào bộ nhớ)
bot.onText(/\/taokey/, (msg) => {
    const chatId = msg.chat.id;
    const newKey = 'HL-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Đánh dấu key mới tạo
    global.keyDatabase[newKey] = true;

    const message = `✅ *Đã tạo Key thành công!*\n\n🔑 Mã Key: \`${newKey}\`\n📌 Loại: Key dùng 1 lần (Tự xóa sau khi kích hoạt)\n⚡ Trạng thái: Sẵn sàng sử dụng`;

    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
});

// 2. API Xác thực Key (Khách nhập đúng -> Dùng thành công -> XÓA KEY LUÔN)
app.post('/api/verify', (req, res) => {
    const { key } = req.body;

    if (!key || !global.keyDatabase[key]) {
        return res.json({ 
            status: 'error', 
            message: 'Mã Key không tồn tại hoặc đã được sử dụng trước đó!' 
        });
    }

    // Xóa key khỏi hệ thống ngay lập tức khi khách nhập đúng
    delete global.keyDatabase[key];

    return res.json({ 
        status: 'success', 
        message: 'Kích hoạt thành công! Key đã được tiêu hủy.' 
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server API và Bot Telegram đang chạy trên cổng ${PORT}`);
});
