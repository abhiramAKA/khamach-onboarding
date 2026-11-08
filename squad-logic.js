/* ==========================================================================
   КХАМАЧ — ИНТЕРФЕЙС И ТРЕНИРОВКА СПОРТЗАЛА ОБУЧЕНИЯ (БЕЗ АЛЕРТОВ)
   ========================================================================== */

const ONBOARDING_HERO_LORE = {
    tank: { title: "🛡️ ЗАЩИТНИК", statBonus: "+20 Max HP" },
    damage: { title: "🔥 ВОИН", statBonus: "+15 урон ульты" },
    archer: { title: "⚡ СТРЕЛОК", statBonus: "+10 урон молнии" },
    mage: { title: "💚 МАГ", statBonus: "+5 к масс-хилу" }
};

function updateSquadHeroesSpecScreenDOM() {
    const container = document.getElementById('heroes-upgrade-list-container');
    if (!container) return; container.innerHTML = '';
    
    container.style.display = "grid"; container.style.gridTemplateColumns = "1fr 1fr"; container.style.gap = "6px";
    
    const heroesData = [{ id: "tank" }, { id: "damage" }, { id: "archer" }, { id: "mage" }];
    
    heroesData.forEach(h => {
        const lore = ONBOARDING_HERO_LORE[h.id];
        let actionBtnHTML = '';
        
        if (h.id === 'tank') {
            actionBtnHTML = `<button class="menu-btn" style="padding:2px; font-size:10px; background:#1d3a1e; height:22px; line-height:1;" onclick="executeOnboardingCampUpgrade()">Тренировать</button>`;
        } else {
            actionBtnHTML = `<button class="menu-btn disabled" style="padding:2px; font-size:9px; background:#221a1a; border-color:#3a2525; color:#665555; cursor:not-allowed;" disabled>Заблокирован</button>`;
        }
        
        let cardInner = `
            <div style="display:flex; justify-content:space-between; font-weight:bold; color:#e6c280; font-size:11px;">
                <span>${lore.title}</span>
                <span style="color:#ffd700;">Ур. 1</span>
            </div>
            <div style="font-size:10px; color:#2ecc71; line-height:1.1; margin-top:2px;">Бонус: ${lore.statBonus}</div>
            <div style="font-size:10px; color:#e6c280; margin: 6px 0 4px 0; font-weight: bold;">Цена: 1 👑</div>
            <div style="margin-top:auto;">${actionBtnHTML}</div>
        `;
        
        const card = document.createElement('div');
        card.style = "background: rgba(25, 20, 18, 0.95); border: 1px solid #544432; padding: 6px 8px; border-radius: 3px; display: flex; flex-direction: column; justify-content: space-between; gap: 2px; box-sizing: border-box;";
        card.innerHTML = cardInner;
        container.appendChild(card);
    });
}

function executeOnboardingCampUpgrade() {
    localStorage.setItem('khamach_training_tutorial_done', 'true');
    localStorage.setItem('khamach_dragon_essence', '0');
    
    // БЕЗ АЛЕРТОВ: Закрываем окно Спортзала и бесшовно возвращаем на обновленный gate.html
    document.getElementById('squad-heroes-spec-screen').style.display = 'none';
    if (typeof window.reloadOnboardingCoreState === 'function') {
        window.reloadOnboardingCoreState();
    } else {
        window.location.href = 'gate.html?t=' + Date.now();
    }
}

function injectSquadInterfaceDOM() {
    const screen = document.getElementById('squad-screen'); 
    if(!screen) return;
    
    // ВОЗВРАЩАЕМ ВСЕ 4 ЗДАНЬЯ: С фиксом клика по активному Гарнизону
    screen.innerHTML = `
        <h2>Цитадель</h2>
        <span class="subtitle">Инфраструктура строений</span>
        <div style="display: flex; flex-direction: column; width: 100%; box-sizing: border-box; gap: 4px;">
            <div class="menu-row"><button id="upgrade-tank-btn" class="menu-btn" style="background:linear-gradient(to bottom, #3a2a18, #1c130a); border-color:#8a7350;">⚒️ Построить Гарнизон Защитника (Цена: 🪙 100)</button></div>
            <div class="menu-row"><button class="menu-btn disabled" style="background:#0f0d0b; border-color:#26211c; color:#4a453f;" disabled>⚒️ Построить Казармы Воинов (Ур. 1)</button></div>
            <div class="menu-row"><button class="menu-btn disabled" style="background:#0f0d0b; border-color:#26211c; color:#4a453f;" disabled>⚒️ Построить Стрельбище Лучникова (Ур. 1)</button></div>
            <div class="menu-row"><button class="menu-btn disabled" style="background:#0f0d0b; border-color:#26211c; color:#4a453f;" disabled>⚒️ Построить Обитель Магов (Ур. 1)</button></div>
        </div>
    `;
    
    // Вешаем прослушиватель событий намертво
    const btn = document.getElementById('upgrade-tank-btn');
    if (btn && typeof window.executeOnboardingCitadelBuild === 'function') {
        btn.onclick = window.executeOnboardingCitadelBuild;
    }
}
