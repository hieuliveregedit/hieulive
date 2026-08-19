import os
import random
import string
import threading
from http.server import HTTPServer, BaseHTTPRequestHandler
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes
from supabase import create_client, Client

# Web server ngầm để Render kiểm tra cổng (Port)
class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"Bot is active!")

def run_web_server():
    port = int(os.environ.get("PORT", 8080))
    server = HTTPServer(('0.0.0.0', port), SimpleHTTPRequestHandler)
    server.serve_forever()

# Lấy thông tin kết nối từ Render Environment
TOKEN = os.getenv("BOT_TOKEN")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None

def generate_random_key():
    part1 = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    part2 = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    part3 = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    return f"KEY-{part1}-{part2}-{part3}"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Chào bạn! Gõ lệnh /getkey để nhận key VIPLOCK kéo tâm nhé.")

async def getkey(update: Update, context: ContextTypes.DEFAULT_TYPE):
    new_key = generate_random_key()
    
    if supabase:
        try:
            supabase.table("keys").insert({"key": new_key, "status": "active"}).execute()
        except Exception as e:
            print(f"Lỗi lưu Supabase: {e}")
            
    await update.message.reply_text(f"Key VIPLOCK của bạn là:\n`{new_key}`\n\nCopy dán vào web để kích hoạt!", parse_mode='Markdown')

if __name__ == '__main__':
    # Khởi chạy cổng Web ngầm cho Render
    threading.Thread(target=run_web_server, daemon=True).start()
    
    # Khởi chạy Telegram Bot
    app = ApplicationBuilder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("getkey", getkey))
    print("Bot đang chạy...")
    app.run_polling()
