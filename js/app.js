/* ══════════════════════════════════════════════
   FOR ANU 💗 — shared script (all pages)
   ══════════════════════════════════════════════ */

const ANU = {
  // ⚠️ keep this webhook secret — anyone with it can post to your Discord
  webhook: "https://discord.com/api/webhooks/1545463947686051961/AhoddjA5rYfy6O11ySzUtk-orQYlTJ5lqGf7WmW7If63KYcM1pgT5ZLGofimzWREGOE8",
  startDate: new Date("2026-07-07T00:00:00"),   // when it all began 💘
  anniversary: new Date("2026-10-07T00:00:00"), // 3rd month 💍
  nicknames: ["Anu", "Cutey", "Bachi", "Chotpoti"]
};

/* ---------- active nav link ---------- */
(function setActiveNav() {
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(a => {
    const target = a.getAttribute("href");
    if (target === here || (here === "" && target === "index.html")) a.classList.add("active");
  });
})();

/* ---------- floating hearts background ---------- */
(function hearts() {
  const canvas = document.getElementById("hearts-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, parts;

  function resize() {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  }

  function make() {
    const n = Math.min(46, Math.floor(W / 26));
    parts = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: H + Math.random() * H,
      s: 6 + Math.random() * 14,
      v: 0.35 + Math.random() * 0.9,
      sway: Math.random() * Math.PI * 2,
      swayV: 0.004 + Math.random() * 0.012,
      a: 0.08 + Math.random() * 0.3,
      hue: Math.random() < 0.7 ? "255,110,169" : "255,158,198"
    }));
  }

  function heart(x, y, size, alpha, hue) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 30, size / 30);
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.bezierCurveTo(0, 8, -2, 4, -7, 4);
    ctx.bezierCurveTo(-14, 4, -14, -4, -14, -4);
    ctx.bezierCurveTo(-14, -10, -9, -13, -6, -13);
    ctx.bezierCurveTo(-3, -13, 0, -10, 0, -8);
    ctx.bezierCurveTo(0, -10, 3, -13, 6, -13);
    ctx.bezierCurveTo(9, -13, 14, -10, 14, -4);
    ctx.bezierCurveTo(14, -4, 14, 4, 7, 4);
    ctx.bezierCurveTo(2, 4, 0, 8, 0, 10);
    ctx.closePath();
    ctx.fillStyle = `rgba(${hue},${alpha})`;
    ctx.fill();
    ctx.restore();
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.y -= p.v;
      p.sway += p.swayV;
      p.x += Math.sin(p.sway) * 0.4;
      if (p.y < -30) { p.y = H + 30; p.x = Math.random() * W; }
      heart(p.x, p.y, p.s, p.a, p.hue);
    }
    requestAnimationFrame(loop);
  }

  addEventListener("resize", () => { resize(); make(); });
  resize(); make(); loop();
})();

/* ---------- typewriter ---------- */
function typeWriter(el, lines, speed = 65, pause = 1600) {
  if (!el) return;
  let li = 0, ci = 0, deleting = false;
  function tick() {
    const line = lines[li];
    if (!deleting) {
      ci++;
      el.textContent = line.slice(0, ci);
      if (ci === line.length) {
        if (lines.length === 1) return;
        deleting = true;
        return setTimeout(tick, pause);
      }
      return setTimeout(tick, speed);
    }
    ci--;
    el.textContent = line.slice(0, ci);
    if (ci === 0) {
      deleting = false;
      li = (li + 1) % lines.length;
      return setTimeout(tick, 400);
    }
    return setTimeout(tick, 30);
  }
  tick();
}

/* ---------- together counter (days / hrs / min / sec) ---------- */
function togetherCounter(el) {
  if (!el) return;
  const nums = el.querySelectorAll(".num");
  const pad = n => String(n).padStart(2, "0");
  function tick() {
    let diff = Date.now() - ANU.startDate.getTime();
    if (diff < 0) diff = 0;
    const d = Math.floor(diff / 864e5);
    const h = Math.floor(diff % 864e5 / 36e5);
    const m = Math.floor(diff % 36e5 / 6e4);
    const s = Math.floor(diff % 6e4 / 1e3);
    if (nums[0]) nums[0].textContent = d;
    if (nums[1]) nums[1].textContent = pad(h);
    if (nums[2]) nums[2].textContent = pad(m);
    if (nums[3]) nums[3].textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------- days-until-anniversary countdown ---------- */
function anniversaryCountdown(el) {
  if (!el) return;
  const nums = el.querySelectorAll(".num");
  const pad = n => String(n).padStart(2, "0");
  function tick() {
    let diff = ANU.anniversary.getTime() - Date.now();
    if (diff < 0) diff = 0;
    const d = Math.floor(diff / 864e5);
    const h = Math.floor(diff % 864e5 / 36e5);
    const m = Math.floor(diff % 36e5 / 6e4);
    const s = Math.floor(diff % 6e4 / 1e3);
    if (nums[0]) nums[0].textContent = d;
    if (nums[1]) nums[1].textContent = pad(h);
    if (nums[2]) nums[2].textContent = pad(m);
    if (nums[3]) nums[3].textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------- confetti ---------- */
function confetti(count = 90) {
  const colors = ["#ff6ea9", "#ff9ec6", "#e0447e", "#ffffff", "#ffd1e3"];
  for (let i = 0; i < count; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDuration = 2.2 + Math.random() * 2.2 + "s";
    c.style.animationDelay = Math.random() * 0.8 + "s";
    c.style.width = 6 + Math.random() * 8 + "px";
    c.style.height = 10 + Math.random() * 10 + "px";
    c.style.opacity = 0.7 + Math.random() * 0.3;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5500);
  }
}

/* ---------- little "+1 💗" pop wherever you click ---------- */
(function heartPops() {
  document.addEventListener("click", e => {
    if (e.target.closest("a, button, textarea, input, .gal figure, .nick-card")) return;
    const p = document.createElement("div");
    p.className = "pop";
    p.textContent = ["+1 💗", "muah 😘", "💗", "✨", "baby 💕"][Math.floor(Math.random() * 5)];
    p.style.left = e.clientX + "px";
    p.style.top = e.clientY - 12 + "px";
    p.style.fontSize = 14 + Math.random() * 10 + "px";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1000);
  });
})();

/* ---------- gallery lightbox (with prev/next + arrow keys) ---------- */
function initLightbox() {
  const lb = document.getElementById("lightbox");
  if (!lb) return;
  const img = lb.querySelector("img");
  const cap = lb.querySelector(".lb-cap");
  const figs = [...document.querySelectorAll(".gal figure")];
  let idx = 0;

  const prev = document.createElement("button");
  prev.className = "lb-nav lb-prev";
  prev.textContent = "‹";
  prev.setAttribute("aria-label", "previous photo");
  const next = document.createElement("button");
  next.className = "lb-nav lb-next";
  next.textContent = "›";
  next.setAttribute("aria-label", "next photo");
  lb.appendChild(prev);
  lb.appendChild(next);

  function show(i) {
    if (!figs.length) return;
    idx = (i + figs.length) % figs.length;
    img.src = figs[idx].querySelector("img").src;
    cap.textContent = figs[idx].querySelector("figcaption")?.textContent || "";
  }
  function open(i) { show(i); lb.classList.add("open"); }
  function close() { lb.classList.remove("open"); }

  figs.forEach((f, i) => f.addEventListener("click", () => open(i)));
  prev.addEventListener("click", e => { e.stopPropagation(); show(idx - 1); });
  next.addEventListener("click", e => { e.stopPropagation(); show(idx + 1); });
  lb.addEventListener("click", e => {
    if (e.target !== img && !e.target.classList.contains("lb-nav")) close();
  });
  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
}

/* ---------- letter lock: she has to win the ring first ---------- */
/* the win is stored on her device, so the letter stays unlocked there forever */
function ringWon() {
  try { return localStorage.getItem("anu_ring_won") === "1"; } catch { return false; }
}

function showRingGate() {
  if (ringWon()) return; // she already earned it here
  let modal = document.getElementById("gate-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "gate-modal";
    modal.className = "gate-modal";
    modal.innerHTML = `
      <div class="gate-box" role="dialog" aria-modal="true">
        <div class="big">🔒💍</div>
        <h3>not so fast, cutey</h3>
        <p>That letter is locked until you <b>win the ring game</b> — catch 10 hearts, then slide the ring onto my finger.
           Win it once and it stays unlocked on this phone. Promise. 😌</p>
        <div class="gate-actions">
          <a class="btn" href="game.html">go win the ring 💍</a>
          <button class="btn ghost" type="button" data-gate-close>maybe later</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener("click", e => {
      if (e.target === modal || e.target.hasAttribute("data-gate-close")) modal.classList.remove("open");
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") modal.classList.remove("open");
    });
  }
  modal.classList.add("open");
}

/* every link that leads to the letter goes through the gate */
(function letterLock() {
  const here = location.pathname.split("/").pop() || "index.html";
  if (here === "letter.html") return; // the letter page shows its own locked state
  document.addEventListener("click", e => {
    const link = e.target.closest('a[href$="letter.html"]');
    if (!link || ringWon()) return;
    e.preventDefault();
    showRingGate();
  });
})();

/* ---------- discord webhook helper (shared by review page) ---------- */
async function sendToDiscord(payload) {
  try {
    const res = await fetch(ANU.webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return res.ok || res.status === 204;
  } catch {
    return false;
  }
}
