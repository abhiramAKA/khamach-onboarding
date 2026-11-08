/* ==========================================================================
   КХАМАЧ — ИНТЕРФЕЙС И ТРЕНИРОВКА СПОРТЗАЛА ОБУЧЕНИЯ (v5.9.0-sandbox)
   ========================================================================== */

function updateSquadHeroesSpecScreenDOM() {
    const container = document.getElementById('heroes-upgrade-list-container');
    if (!container) return; container.innerHTML = '';
    
    container.style.display = "grid"; container.style.gridTemplateColumns = "1fr"; container.style.width = "100%";
    
    const card = document.createElement('div');
    card.style = "background:rgba(25,20,18,0.95); border:1px solid #544432; padding:10px; border-radius:3px; display:flex; flex-direction:column; gap:4px; text-align:left;";
    card.innerHTML = `
        <div style="display:flex; justify-content:space-between; font-weight:bold; color:#e6c280; font-size:14px;">
            <span>🛡️ ЗАЩИТНИК</span><span style="color:#ffd700;">Ур. 1</span>
        </div>
        <div style="font-size:12px; color:#2ecc71; margin:4px 0;">Бонус: +20 Max HP</div>
        <div style="font-size:12px; color:#e6c280; font-weight:bold; margin-bottom:8px;">Цена: 1 👑 Харизма</div>
        <button class="menu-btn" style="background:#1d3a1e; padding:6px; font-size:13px;" onclick="executeOnboardingCampUpgrade()">Тренировать</button>
    `;
    container.appendChild(card);
}

function executeOnboardingCampUpgrade() {
    localStorage.setItem('khamach_training_tutorial_done', 'true');
    localStorage.setItem('khamach_dragon_essence', '0');
    alert("Тренировка успешна! Защитник развился до 2 уровня. Получено стартовое золото казны!");
    window.location.href = 'gate.html?t=' + Date.now();
}

function injectSquadInterfaceDOM() {
    const screen = document.getElementById('squad-screen'); if(!screen) return;
    screen.innerHTML = `
        <h2>Цитадель</h2>
        <span class="subtitle">Строительство Казарм</span>
        <div class="menu-row">
            <button id="upgrade-tank-btn" class="menu-btn" style="background:linear-gradient(to bottom, #3a2a18, #1c130a); border-color:#8a7350;">⚒️ Построить Гарнизон Защитника (Цена: 🪙 100)</button>
        </div>
    `;
}
