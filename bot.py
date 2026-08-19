import os
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

# Lấy Token từ biến môi trường BOT_TOKEN trên Render
TOKEN = os.getenv("BOT_TOKEN")

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Chào bạn! Nhấn /getkey để lấy Key nhé.")

async def getkey(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Bạn có thể sửa chữ 'KEY-KEOTAM-123456' thành key của bạn
    await update.message.reply_text("Key kéo tâm của bạn là: KEY-KEOTAM-123456")

if __name__ == '__main__':
    app = ApplicationBuilder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("getkey", getkey))
    print("Bot đang chạy...")
    app.run_polling()
