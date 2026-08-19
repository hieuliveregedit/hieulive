import os, random, string, requests
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

TELEGRAM_TOKEN = os.environ.get("TELEGRAM_TOKEN")
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
ADMIN_ID = int(os.environ.get("ADMIN_ID", "0"))

def tao_key():
    p1 = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    p2 = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    p3 = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    return f"VIPLOCK-{p1}-{p2}-{p3}"

async def genkey(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.effective_user.id != ADMIN_ID:
        await update.message.reply_text("❌ Bạn không có quyền!")
        return

    days = int(context.args[0]) if context.args else 30
    key_code = tao_key()

    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    }
    data = {"key_code": key_code, "duration_days": days}
    res = requests.post(f"{SUPABASE_URL}/rest/v1/keys", json=data, headers=headers)

    if res.status_code in [200, 201]:
        await update.message.reply_text(f"🎉 **KEY MỚI:** `{key_code}`\n⏳ Hạn dùng: {days} ngày", parse_mode="Markdown")
    else:
        await update.message.reply_text("❌ Lỗi lưu Database!")

if __name__ == '__main__':
    app = Application.builder().token(TELEGRAM_TOKEN).build()
    app.add_handler(CommandHandler("genkey", genkey))
    app.run_polling()
