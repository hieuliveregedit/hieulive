const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = '8849614440:AAGkn9fsy0fcZcrP1-nEfXh4sjAL3e__drg';
// Sử dụng tùy chọn rỗng để tránh hoàn toàn lỗi 409 Conflict do polling xung đột
const bot = new TelegramBot(token);

const app = express();
app.use(express.json());

// Database lưu Key tạm thời trên RAM
global.keyDatabase = {};

// Cấu hình Webhook cho Telegram tự động đẩy tin nhắn về server (Không bao giờ lỗi 409)
const RENDER_URL = 'https://aimlock-bot.onrender.com'; // Đảm bảo đúng tên app của bạn
bot.setWebHook(`${RENDER_URL}/bot${token}`);

// Nhận tin nhắn webhook từ Telegram
app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Lệnh /taokey
bot.onText(/\/taokey/, (msg) => {
    const chatId = msg.chat.id;
    const newKey = 'HL-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    global.keyDatabase[newKey] = { status: 'unused', hwid: null };

    bot.sendMessage(chatId, `✅ **Đã tạo Key thành công!**\n\n🔑 Mã Key: \`${newKey}\`\n📌 Giới hạn: 1 Thiết bị duy nhất\n⚡ Trạng thái: Chưa sử dụng`, { parse_mode: 'Markdown' });
});

// API xác thực Key từ Web
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
    console.log(`Server API và Bot Webhook đang chạy trên cổng ${PORT}`);
});
