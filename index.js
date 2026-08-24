const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// Thay token thật của bạn vào trong cặp ngoặc đơn dưới đây lấy từ BotFather
const token = 'YOUR_TELEGRAM_BOT_TOKEN_HERE';
const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(express.json());

// Database lưu trữ key tạm thời
global.keyDatabase = {};

// Lệnh /taokey trên Telegram để bạn tạo key mới
bot.onText(/\/taokey/, (msg) => {
    const chatId = msg.chat.id;
    const newKey = 'HL-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    global.keyDatabase[newKey] = { status: 'unused', hwid: null };

    bot.sendMessage(chatId, `✅ **Đã tạo Key thành công!**\n\n🔑 Mã Key: \`${newKey}\`\n📌 Giới hạn: 1 Máy duy nhất\n⚡ Trạng thái: Chưa sử dụng`, { parse_mode: 'Markdown' });
});

// API nhận yêu cầu từ Web của khách để xác thực và khóa máy
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server API và Bot đang chạy trên cổng ${PORT}`);
});
