/* ==========================================================================
   КХАМАЧ — МОДУЛЬ ДАННЫХ И ИНИЦИАЛИЗАЦИИ ОБУЧЕНИЯ (ИЗОЛИРОВАННЫЙ)
   ========================================================================== */

window.ONBOARDING_MISSIONS_LOCAL_POOL = [
    { id: "m_t1", allowedHero: "tank", heroName: "Защитник", heroIcon: "🛡️", rewardGold: 133, title: "Охрана южных рубежей", text: "Местные фермеры жалуются на набеги диких кабанов из болот. Защитнику предстоит встать живым заслоном у частокола." }
];

document.addEventListener("DOMContentLoaded", function() {
    // Чистим старые флаги принудительно, чтобы обучение всегда шло с чистого листа
    if (!localStorage.getItem('khamach_onboarding_state')) {
        localStorage.setItem('khamach_onboarding_state', '1');
        localStorage.setItem('khamach_dragon_essence', '1');
        localStorage.setItem('khamach_gold', '0');
    }

    const isVictory = localStorage.getItem('khamach_combat_tutorial_done') === 'true';
    const isTrained = localStorage.getItem('khamach_training_tutorial_done') === 'true';
    const isCitadelBuilt = localStorage.getItem('khamach_citadel_tutorial_done') === 'true';
    const isMissionsDone = localStorage.getItem('khamach_missions_tutorial_done') === 'true';
    const btnZone = document.getElementById('onboarding-buttons-zone');
    if (!btnZone) return;
    
    if (!isVictory) {
        btnZone.innerHTML = `<button class="emoji-grid-btn" style="width: 110px; height: 110px; font-size: 54px; border-radius: 4px;" onclick="loadGameModulesAndExecute('battle')">🌋</button>`;
    } else if (!isTrained) {
        document.getElementById('onboarding-title').innerText = "СПОРТЗАЛ";
        document.getElementById('onboarding-subtitle').innerText = "Развитие навыков";
        document.getElementById('onboarding-description').innerText = "Дракон повержен! Получена 1 Харизма 👑. Отправляйтесь в Спортзал, чтобы натренировать Защитника до 2-го уровня.";
        btnZone.innerHTML = `<button class="emoji-grid-btn" style="width: 110px; height: 110px; font-size: 54px; border-radius: 4px;" onclick="loadGameModulesAndExecute('camp')">🏋️</button>`;
    } else if (!isCitadelBuilt) {
        document.getElementById('onboarding-title').innerText = "ИНФРАСТРУКТУРА";
        document.getElementById('onboarding-subtitle').innerText = "Строительство Цитадели";
        document.getElementById('onboarding-description').innerText = "Чтобы развиваться дальше, нужно модернизировать Замок. Постройте Гарнизон Защитника за полученное стартовое золото.";
        btnZone.innerHTML = `<button class="emoji-grid-btn" style="width: 110px; height: 110px; font-size: 54px; border-radius: 4px;" onclick="loadGameModulesAndExecute('citadel')">🏰</button>`;
    } else if (!isMissionsDone) {
        document.getElementById('onboarding-title').innerText = "РАТУША";
        document.getElementById('onboarding-subtitle').innerText = "Экспедиции за Золотом";
        document.getElementById('onboarding-description').innerText = "Отлично. Чтобы обеспечивать армию, нужно золото. Отправьте Защитника на выполнение его первого контракта в Ратуше.";
        btnZone.innerHTML = `<button class="emoji-grid-btn" style="width: 110px; height: 110px; font-size: 54px; border-radius: 4px;" onclick="loadGameModulesAndExecute('missions')">💰</button>`;
    } else {
        document.getElementById('onboarding-title').innerText = "БЕСТИАРИЙ";
        document.getElementById('onboarding-subtitle').innerText = "Финальный Шлюз";
        document.getElementById('onboarding-description').innerText = "Ваш герой в пути! Нажмите на Вулкан, чтобы открыть карту кампании. Подтвердите готовность, и шлюз автоматически перенесет вас на основной сервер игры!";
        btnZone.innerHTML = `<button class="emoji-grid-btn" style="width: 110px; height: 110px; font-size: 54px; border-radius: 4px;" onclick="loadGameModulesAndExecute('battle')">🌋</button>`;
    }
});
