/* ==========================================================================
   КХАМАЧ — ДВИЖОК ШАГОВ ОБУЧЕНИЯ И ШЛЮЗ РЕДИРЕКТА (ИСПРАВЛЕН - v5.9.1)
   ========================================================================== */

window.launchOnboardingStep = function(modeType) {
    const gothicWin = document.getElementById('onboarding-gothic-window');
    if (gothicWin) gothicWin.style.display = 'none';

    if (modeType === 'battle') {
        const isSecondBattlePhase = localStorage.getItem('khamach_missions_tutorial_done') === 'true';
        if (!isSecondBattlePhase) {
            if (typeof injectCombatInterfaceBaseDOM === 'function') injectCombatInterfaceBaseDOM();
            if (typeof startCombatSession === 'function') startCombatSession(1); 
        } else {
            if (typeof injectTownScreensDOM === 'function') injectTownScreensDOM();
            if (typeof showScreen === 'function') showScreen('dragon-select-screen');
            if (typeof renderDragonSelectionGrid === 'function') renderDragonSelectionGrid();
        }
    } 
    else if (modeType === 'camp') {
        if (typeof injectTownScreensDOM === 'function') injectTownScreensDOM();
        
        // ФИКС ОТКРЫТИЯ СПОРТЗАЛА: Сначала инжектим базовый каркас окна, затем рендерим список
        const specScr = document.getElementById('squad-heroes-spec-screen');
        if (specScr) {
            if (typeof updateSquadHeroesSpecScreenDOM === 'function') updateSquadHeroesSpecScreenDOM();
            specScr.style.display = 'flex';
        }
    } 
    else if (modeType === 'citadel') {
        localStorage.setItem('khamach_gold', '100');
        if (typeof injectSquadInterfaceDOM === 'function') injectSquadInterfaceDOM();
        document.getElementById('squad-screen').style.display = 'flex';
        document.getElementById('close-squad-btn').style.display = 'none';
        
        const tankBtn = document.getElementById('upgrade-tank-btn');
        if (tankBtn) {
            tankBtn.onclick = function() {
                localStorage.setItem('khamach_gold', '0'); 
                localStorage.setItem('khamach_build_tank', '2'); 
                localStorage.setItem('khamach_citadel_tutorial_done', 'true');
                window.location.href = 'gate.html?t=' + Date.now();
            };
        }
    } 
    else if (modeType === 'missions') {
        if (typeof injectTownScreensDOM === 'function') injectTownScreensDOM();
        const container = document.getElementById('missions-list-container');
        if (container && window.ONBOARDING_MISSIONS_LOCAL_POOL) {
            container.innerHTML = '';
            window.ONBOARDING_MISSIONS_LOCAL_POOL.forEach(mission => {
                const card = document.createElement('div');
                card.style = "background: rgba(25, 20, 18, 0.9); border: 1px solid #544432; padding: 8px 10px; border-radius: 3px; display: flex; flex-direction: column; gap: 4px;";
                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; font-weight: bold; color: #e6c280; font-size: 12px;">
                        <span>${mission.title}</span>
                        <span style="color: #ffd700;">🪙 133</span>
                    </div>
                    <div style="font-size: 11px; color: #bfae96; line-height: 1.3; text-align: left;">${mission.text}</div>
                    <button class="menu-btn" style="padding:4px; font-size:13px; background:#1d3a1e; height:28px; margin-top: 4px;" onclick="window.triggerFinalOnboardingTransfer()">Отправить 🛡️</button>
                `;
                container.appendChild(card);
            });
        }
        document.getElementById('missions-screen').style.display = 'flex';
    }
};

window.triggerFinalOnboardingTransfer = function() {
    localStorage.setItem('khamach_gold', '133');                 
    localStorage.setItem('khamach_dragon_essence', '2');         
    localStorage.setItem('khamach_build_tank', '2');             
    localStorage.setItem('khamach_hero_lvl_tank', '2');          
    localStorage.setItem('khamach_max_tier', '1');               
    
    localStorage.setItem('khamach_combat_tutorial_done', 'true');
    localStorage.setItem('khamach_training_tutorial_done', 'true');
    localStorage.setItem('khamach_citadel_tutorial_done', 'true');
    localStorage.setItem('khamach_missions_tutorial_done', 'true');
    localStorage.setItem('khamach_full_onboarding_complete', 'true');

    let finishPopup = document.createElement('div');
    finishPopup.className = 'game-window combat-help-popup';
    finishPopup.style.display = 'flex'; finishPopup.style.zIndex = '25000';
    finishPopup.innerHTML = `
        <div class="combat-help-content" style="max-width: 390px; padding: 20px; text-align: center;">
            <h2>📜 СЕРВЕР НАЙДЕН</h2>
            <span class="subtitle">Переход в Мир Кхамача</span>
            <p style="font-size: 13px; color: #cdb38c; line-height: 1.5; background:rgba(0,0,0,0.4); padding:12px; border:1px solid #544432; margin-bottom: 20px;">
                Обучение успешно завершено. Все ваши достижения (🪙 133, прокачанный Танк и Гарнизон) упакованы в память Цитадели. Нажмите кнопку ниже, чтобы совершить пространственный прыжок на основной сервер игры!
            </p>
            <button id="onboarding-ultimate-redirect-btn" class="menu-btn" style="width:100%; background:linear-gradient(to bottom, #1d3a1e, #0f2110); padding:12px;">АКТИВИРОВАТЬ ПОРТАЛ 🌋</button>
        </div>
    `;
    document.body.appendChild(finishPopup);
    
    document.getElementById('onboarding-ultimate-redirect-btn').onclick = function() {
        window.location.href = 'https://ТВОЙ_АККАУНТ.github.io/khamach-game/hub.html';
    };
};
