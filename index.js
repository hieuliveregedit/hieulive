const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

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

// Tự tạo middleware cấp phép CORS thủ công (Không cần cài thư viện ngoài)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

global.keyDatabase = {};

bot.on('polling_error', (error) => {});

bot.onText(/\/taokey/, (msg) => {
    const chatId = msg.chat.id;
    const newKey = 'HL-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    global.keyDatabase[newKey] = { status: 'unused', hwid: null };

    bot.sendMessage(chatId, `✅ **Đã tạo Key thành công!**\n\n🔑 Mã Key: \`${newKey}\`\n📌 Giới hạn: 1 Thiết bị duy nhất\n⚡ Trạng thái: Chưa sử dụng`, { parse_mode: 'Markdown' });
});

app.post('/api/verify', (req, res) => {
    const { key, hwid } = req.body;

    if (!global.keyDatabase[key]) {
        return res.json({ status: 'error', message: 'Mã Key không tồn tại trên hệ thống!' });
    }

    const keyInfo = global.keyDatabase[key];

    if (keyInfo.status === 'used' && keyInfo.hwid !== hwid) {
        return res.json({ status: 'error', message: 'Key này đã được kích hoạt trên thiết bị khác!' });
    }

    keyInfo.status = 'used';
    keyInfo.hwid = hwid;

    return res.json({ status: 'success', message: 'Kích hoạt thành công cho thiết bị này!' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server API và Bot Polling đang chạy trên cổng ${PORT}`);
});
