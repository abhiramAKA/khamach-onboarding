/* ==========================================================================
   КХАМАЧ — КАРТОЧКА ОБЯЗАТЕЛЬНОЙ ОНБОРДИНГ-МИССИИ (v5.9.0-sandbox)
   ========================================================================== */

function renderMissionsDOM() {
    const container = document.getElementById('missions-list-container');
    if (!container) return; container.innerHTML = '';
    
    const card = document.createElement('div');
    card.style = "background:rgba(25,20,18,0.9); border:1px solid #544432; padding:8px 10px; border-radius:3px; display:flex; flex-direction:column; gap:4px; text-align:left; width:100%; box-sizing:border-box;";
    card.innerHTML = `
        <div style="display:flex; justify-content:space-between; font-weight:bold; color:#e6c280; font-size:12px;">
            <span>Охрана южных рубежей [ОБУЧЕНИЕ]</span><span style="color:#ffd700;">🪙 133</span>
        </div>
        <div style="font-size:11px; color:#bfae96; line-height:1.3; margin:2px 0;">
            Местные фермеры жалуются на набеги диких кабанов из болот. Защитнику предстоит встать живым заслоном у частокола.
        </div>
        <button class="menu-btn" style="padding:4px; font-size:13px; background:#1d3a1e; height:28px; margin-top:4px;" onclick="window.triggerFinalOnboardingTransfer()">Отправить 🛡️</button>
    `;
    container.appendChild(card);
}
function getCurrentResetResourceCost() { return { icon: "🌋", name: "Плазма дракона" }; }
