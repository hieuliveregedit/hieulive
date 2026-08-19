(function () {
  const API_BASE = "https://uchihav4.hieuduongreallife.workers.dev";
  const BRAND_TITLE = "UCHIHA V4 API SERVER KEY";
  const TZ = "Asia/Ho_Chi_Minh";
  const ALWAYS_PROMPT = false;
  const LS = { DEVICE: "vsh_license_device", KEY: "vsh_license_key" };
  let deviceId = localStorage.getItem(LS.DEVICE);
  if (!deviceId) {
    deviceId = (
      crypto.randomUUID?.() ||
      Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
    ).toUpperCase();
    localStorage.setItem(LS.DEVICE, deviceId);
  }
  const fmt = (ts) =>
    ts == null
      ? "lifetime"
      : new Intl.DateTimeFormat("vi-VN", {
          timeZone: TZ,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(ts);
  async function post(url, data) {
    const r = await fetch(API_BASE + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return r.json().catch(() => ({ ok: false, error: "PARSE_ERROR" }));
  }
  function ting() {
    try {
      const AC = new (window.AudioContext || window.webkitAudioContext)();
      const o = AC.createOscillator(),
        g = AC.createGain(),
        t = AC.currentTime;
      o.type = "sine";
      o.frequency.value = 1200;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.18, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      o.connect(g).connect(AC.destination);
      o.start(t);
      o.stop(t + 0.17);
    } catch {}
  }

  const css = `
  #vgGate{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;padding:16px;background:rgba(6, 2, 3,.78);backdrop-filter:blur(20px) saturate(125%);-webkit-backdrop-filter:blur(20px) saturate(125%);opacity:0;pointer-events:none;transition:opacity .24s ease}
  #vgGate.is-open{opacity:1;pointer-events:auto}
  #vgGate .vg-panel{position:relative;width:min(430px,calc(100vw - 24px));border-radius:22px;overflow:hidden;color:var(--text,#fff4f5);font-family:"Bahnschrift","Segoe UI",sans-serif;background:linear-gradient(145deg,rgba(28, 10, 13,.92),rgba(12, 5, 7,.97));border:1px solid rgba(255, 138, 151,.18);box-shadow:0 22px 56px rgba(0,0,0,.48),0 0 30px rgba(255, 59, 82,.12);transform:translateY(20px) scale(.98);transition:transform .24s ease}
  #vgGate.is-open .vg-panel{transform:translateY(0) scale(1)}
  #vgGate .vg-panel::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.08),transparent 28%),radial-gradient(circle at top right,rgba(255, 59, 82,.22),transparent 34%);pointer-events:none}
  #vgGate .vg-hd{position:relative;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:16px 18px;border-bottom:1px solid rgba(255, 138, 151,.12)}
  #vgGate .vg-brand{font-size:19px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
  #vgGate .vg-hd-rt{display:flex;gap:8px}
  #vgGate .vg-bd{position:relative;padding:18px}
  #vgGate .vg-label{margin:0 0 6px;color:#c4a8ad;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
  #vgGate .vg-field{display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:center}
  #vgGate .vg-input{width:100%;min-height:44px;padding:0 12px;border-radius:14px;border:1px solid rgba(255, 108, 124,.14);background:linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.015)),rgba(10, 4, 6,.88);color:#fff4f5;outline:none;transition:border-color .22s ease,box-shadow .22s ease}
  #vgGate .vg-input:focus{border-color:rgba(255, 138, 151,.34);box-shadow:0 0 0 4px rgba(255, 59, 82,.12)}
  #vgGate .vg-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
  #vgGate .vg-btn,#vgGate .vg-icon{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:42px;padding:0 14px;border-radius:14px;border:1px solid rgba(255, 108, 124,.14);background:linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.015)),rgba(10, 4, 6,.88);color:#fff4f5;cursor:pointer;transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease}
  #vgGate .vg-btn:hover,#vgGate .vg-icon:hover{transform:translateY(-1px);border-color:rgba(255, 138, 151,.3);box-shadow:0 16px 30px rgba(0,0,0,.26),0 0 20px rgba(255, 59, 82,.12)}
  #vgGate .vg-btn--pri{border-color:rgba(255, 176, 185,.24);background:linear-gradient(145deg,rgba(255, 92, 110,.28),rgba(148, 12, 31,.88)),#3c0812;box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 16px 28px rgba(0,0,0,.3),0 0 24px rgba(255, 59, 82,.16)}
  #vgGate .vg-btn--ghost{background:linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.015)),rgba(10, 4, 6,.88)}
  #vgGate .vg-msg{margin-top:14px;padding:12px 14px;border-radius:16px;border:1px solid rgba(255, 108, 124,.14);background:rgba(10, 3, 5,.74);font-size:12px;line-height:1.55}
  #vgGate .vg-msg.ok{border-color:rgba(165,255,210,.28);background:rgba(11,26,18,.82);color:#c8ffe0}
  #vgGate .vg-msg.warn{border-color:rgba(255,214,136,.28);background:rgba(26,21,9,.82);color:#ffe7b8}
  #vgGate .vg-msg.err{border-color:rgba(255,168,194,.28);background:rgba(33,12,19,.84);color:#ffd3df}
  #vgGate details{margin-top:12px;border-radius:16px;border:1px solid rgba(255, 108, 124,.12);overflow:hidden;background:rgba(6, 2, 3,.52)}
  #vgGate summary{padding:12px 14px;cursor:pointer;list-style:none;color:#c4a8ad;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
  #vgGate summary::-webkit-details-marker{display:none}
  #vgGate .vg-pre{margin:0;padding:12px 14px 14px;max-height:220px;overflow:auto;background:rgba(7, 2, 4,.78);color:#ffc7cd;font:11px/1.5 Consolas,"Courier New",monospace}
  #vgGate .vg-icon svg{width:15px;height:15px;display:block}
  #vgGate .vg-foot{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:12px;color:#c4a8ad;font-size:11px}
  html.vg-lock,html.vg-lock body{overflow:hidden}
  @media (max-width:560px){
    #vgGate{padding:10px}
    #vgGate .vg-panel{width:min(100%,calc(100vw - 20px));border-radius:20px}
    #vgGate .vg-hd,#vgGate .vg-bd{padding:14px}
    #vgGate .vg-brand{font-size:17px}
    #vgGate .vg-field{grid-template-columns:1fr}
    #vgGate .vg-hd,#vgGate .vg-foot{flex-wrap:wrap}
    #vgGate .vg-actions{display:grid;grid-template-columns:1fr}
  }`;
  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  function $(sel, root = document) {
    return root.querySelector(sel);
  }
  function build() {
    let wrap = $("#vgGate");
    if (wrap) return wrap;
    wrap = document.createElement("div");
    wrap.id = "vgGate";
    wrap.innerHTML = `
      <div class="vg-panel">
        <div class="vg-hd">
          <div class="vg-brand">${BRAND_TITLE}</div>
          <div class="vg-hd-rt">
            <button class="vg-btn vg-btn--ghost" id="vgReset" title="Nhập lại">Nhập lại</button>
          </div>
        </div>

        <div class="vg-bd">
          <div>
            <div class="vg-label">Mã Kích Hoạt</div>
            <div class="vg-field">
              <input id="vgKey" class="vg-input" type="text" placeholder="DÁN KEY-XXXX-XXXX-XXXX" autocomplete="one-time-code" inputmode="latin">
              <button class="vg-icon" id="vgPasteKey" title="Dán">
                <svg viewBox="0 0 24 24" fill="none"><path d="M8 4h8v4h4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4h4Z" stroke="currentColor" stroke-width="1.6"/><path d="M9 2h6v3a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2Z" stroke="currentColor" stroke-width="1.6"/></svg>
                <span>Dán</span>
              </button>
              <button class="vg-icon" id="vgDelKey" title="Delete">
                <svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" stroke="currentColor" stroke-width="1.6"/><path d="M10 11v7M14 11v7" stroke="currentColor" stroke-width="1.6"/></svg>
                <span>Delete</span>
              </button>
            </div>
          </div>

          <div style="margin-top:12px">
            <div class="vg-label">Mã Thiết Bị</div>
            <div class="vg-field">
              <input id="vgDev" class="vg-input" type="text" readonly>
              <button class="vg-icon" id="vgCopyDev" title="Sao chép">
                <svg viewBox="0 0 24 24" fill="none"><path d="M9 9h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.6"/><path d="M7 15H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="1.6"/></svg>
                <span>Sao chép</span>
              </button>
            </div>
          </div>

          <div class="vg-actions">
            <button class="vg-btn vg-btn--pri" id="vgCheck">Kiểm tra</button>
            <button class="vg-btn vg-btn--pri" id="vgActive">Kích hoạt (1 thiết bị)</button>
          </div>

          <div class="vg-msg" id="vgMsg">Sẵn sàng.</div>
          <details id="vgDtl" hidden>
            <summary>Chi tiết kỹ thuật</summary>
            <pre class="vg-pre" id="vgRaw"></pre>
          </details>

          <div class="vg-foot">
            <span id="vgSta">Chưa kích hoạt</span>
            <button class="vg-btn vg-btn--ghost" id="vgContact" title="Liên hệ">Liên hệ mua key</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(wrap);

    const lastKey = localStorage.getItem(LS.KEY) || "";
    if (lastKey) $("#vgKey").value = lastKey;
    $("#vgDev").value = deviceId;

    $("#vgPasteKey").onclick = pasteIntoKey;
    $("#vgDelKey").onclick = deleteKeyLocal;
    $("#vgCopyDev").onclick = () =>
      copyToClipboard($("#vgDev").value.trim(), "Đã sao chép Mã Thiết Bị.");
    $("#vgReset").onclick = () => {
      localStorage.removeItem(LS.KEY);
      updateStatus(null);
      show();
    };
    $("#vgCheck").onclick = onCheck;
    $("#vgActive").onclick = onActivate;
    $("#vgContact").onclick = () =>
      window.open("https://zalo.me/0926540522", "_blank");

    return wrap;
  }

  function setMsg(type, html, raw) {
    const box = document.querySelector("#vgMsg");
    box.className = "vg-msg " + (type || "");
    box.innerHTML = html;
    ting();
    const dtl = document.querySelector("#vgDtl");
    const pre = document.querySelector("#vgRaw");
    if (raw) {
      dtl.hidden = false;
      pre.textContent =
        typeof raw === "string" ? raw : JSON.stringify(raw, null, 2);
    } else {
      dtl.hidden = true;
      pre.textContent = "";
    }
  }
  function updateStatus(data) {
    const el = document.querySelector("#vgSta");
    if (!el) return;
    if (!data) {
      el.textContent = "Chưa kích hoạt";
      return;
    }
    el.textContent = `Hết hạn: ${fmt(data.expiresAt)}`;
  }
  function copyToClipboard(text, okText) {
    navigator.clipboard?.writeText(text).then(() => setMsg("ok", okText));
  }

  async function pasteIntoKey() {
    const inp = document.querySelector("#vgKey");
    try {
      const txt = await navigator.clipboard.readText();
      inp.value = (txt || "").trim();
      setMsg("ok", "Đã dán vào Mã Kích Hoạt.");
    } catch {
      const txt = prompt("Dán Mã Kích Hoạt tại đây:", "") || "";
      inp.value = txt.trim();
      setMsg("ok", "Đã dán vào Mã Kích Hoạt.");
    }
    inp.focus();
  }

  function deleteKeyLocal() {
    const inp = document.querySelector("#vgKey");
    inp.value = "";
    localStorage.removeItem(LS.KEY);
    updateStatus(null);
    setMsg("ok", "Đã xóa Mã Kích Hoạt khỏi thiết bị này.");
  }

  async function onCheck() {
    const key = document.querySelector("#vgKey").value.trim();
    if (!key) return setMsg("warn", "Vui lòng nhập Mã Kích Hoạt.");
    setMsg("", "Đang kiểm tra...");
    const j = await post("/api/verify", { key });
    if (j.ok) {
      localStorage.setItem(LS.KEY, key);
      const d = j.data;
      updateStatus(d);
      setMsg("ok", `Mã hợp lệ<br>Hết hạn: <b>${fmt(d.expiresAt)}</b>`, j);
    } else {
      const map = {
        EXPIRED: "Mã đã hết hạn.",
        REVOKED: "Mã đã bị thu hồi.",
        NOT_FOUND: "Không tìm thấy mã.",
      };
      setMsg(
        "err",
        map[(j.error || "").toUpperCase()] || "Lỗi " + (j.error || "Lỗi"),
        j,
      );
    }
  }

  async function onActivate() {
    const key = document.querySelector("#vgKey").value.trim();
    if (!key) return setMsg("warn", "Vui lòng nhập Mã Kích Hoạt.");
    setMsg("", "Đang kích hoạt...");
    const j = await post("/api/activate", { key, deviceId });
    if (j.ok) {
      localStorage.setItem(LS.KEY, key);
      const d = j.data;
      updateStatus(d);
      setMsg(
        "ok",
        `Đã kích hoạt thành công<br>Hết hạn: <b>${fmt(d.expiresAt)}</b>`,
        j,
      );
      setTimeout(() => {
        hide();
      }, 1200);
      window.dispatchEvent(
        new CustomEvent("vsh-license-change", {
          detail: { state: "activated", data: d },
        }),
      );
    } else {
      const why = (j.error || "").toUpperCase();
      const map = {
        BOUND_TO_ANOTHER_DEVICE: "Mã đã gắn với thiết bị khác.",
        EXPIRED: "Mã đã hết hạn.",
        REVOKED: "Mã đã bị thu hồi.",
        NOT_FOUND: "Không tìm thấy mã.",
      };
      setMsg("err", map[why] || "Lỗi " + (j.error || "Lỗi"), j);
      window.dispatchEvent(
        new CustomEvent("vsh-license-change", {
          detail: { state: "invalid", data: j },
        }),
      );
    }
  }

  function show() {
    const gate = build();
    gate.style.display = "grid";
    document.documentElement.classList.add("vg-lock");
    requestAnimationFrame(() => gate.classList.add("is-open"));
  }
  function hide() {
    const g = document.getElementById("vgGate");
    if (!g) return;
    g.classList.remove("is-open");
    document.documentElement.classList.remove("vg-lock");
    setTimeout(() => {
      g.style.display = "none";
    }, 240);
  }

  async function guardOnLoad() {
    if (ALWAYS_PROMPT) {
      show();
      return;
    }
    const savedKey = localStorage.getItem(LS.KEY);
    if (!savedKey) {
      show();
      return;
    }
    const v = await post("/api/verify", { key: savedKey });
    if (!v.ok) {
      show();
      return;
    }
    if (!v.data.deviceId || v.data.deviceId !== deviceId) {
      show();
      return;
    }
    updateStatus(v.data);
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.visibilityState === "visible") guardOnLoad();
      },
      { once: true },
    );
    setTimeout(() => guardOnLoad(), 10 * 60 * 1000);
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", guardOnLoad);
  else guardOnLoad();

  window.VSHKeyGate = {
    show,
    hide,
    reset() {
      localStorage.removeItem(LS.KEY);
      show();
    },
  };
})();
