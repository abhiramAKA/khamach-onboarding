/* ==========================================================================
   КХАМАЧ — ИНФОРМАЦИОННЫЕ ОКНА БОЯ (ИСПРАВЛЕН ОЛЬ СДВИГА)
   ========================================================================== */

function injectCombatPopupsDOM() {
    const parent = document.getElementById('dynamic-combat-popups');
    if (!parent) return;
    
    parent.innerHTML = `
        <div id="combat-welcome-tutorial-screen" class="combat-help-popup" style="display:none;">
            <div class="combat-help-content">
                <h2>ОБУЧЕНИЕ БОЯ</h2>
                <span class="subtitle">Вход в Горнило Рун</span>
                <div style="font-size:13px; color:#cdb38c; text-align:left; display:flex; flex-direction:column; gap:10px; background:rgba(0,0,0,0.4); padding:12px; border:1px solid #544432; border-radius:4px; box-sizing:border-box;">
                    <div><strong>1. Собирай ряды из 3 рун:</strong> Это копит супер-энергию соответствующего героя отряда (🔥 🛡️ ⚡ 💚).</div>
                    <div><strong>2. Дождись свечения:</strong> Когда шкала дойдет до 100%, нажми на карточку Воина (🔥), чтобы нанести сокрушительный удар!</div>
                </div>
                <button class="menu-btn" style="width:100%; margin-top:15px; background:linear-gradient(to bottom, #1d3a1e, #0f2110); padding:10px; font-weight:bold;" onclick="document.getElementById('combat-welcome-tutorial-screen').style.display='none';">В бой!</button>
            </div>
        </div>
    `;
}
