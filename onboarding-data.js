/* ==========================================================================
   КХАМАЧ — МОДУЛЬ ИНИЦИАЛИЗАЦИИ И СБРОСА КЭША ПЕСОЧНИЦЫ (v1.0.2)
   ========================================================================== */

window.ONBOARDING_MISSIONS_LOCAL_POOL = [
    { id: "m_t1", allowedHero: "tank", heroName: "Защитник", heroIcon: "🛡️", rewardGold: 133, title: "Охрана южных рубежей", text: "Местные фермеры жалуются на набеги диких кабанов из болот. Защитнику предстоит встать живым заслоном у частокола." }
];

window.checkAndRenderOnboardingMainButton = function() {
    const isVictory = localStorage.getItem('khamach_combat_tutorial_done') === 'true';
    const isTrained = localStorage.getItem('khamach_training_tutorial_done') === 'true';
    const isCitadelBuilt = localStorage.getItem('khamach_citadel_tutorial_done') === 'true';
    const isMissionsDone = localStorage.getItem('khamach_missions_tutorial_done') === 'true';
    const btnZone = document.getElementById('onboarding-buttons-zone');
    if (!btnZone) return;
    
    if (!isVictory) {
        document.getElementById('onboarding-title').innerText = "ПРИКЛЮЧЕНИЕ";
        document.getElementById('onboarding-subtitle').innerText = "Первый шаг в Горнило";
        document.getElementById('onboarding-description').innerText = "Древние подземелья Абхирамбурга пробудились. Соберите волю в кулак, управляйте камнями стихий и сокрушите огнедышащих тварей в тактических битвах!";
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
};

document.addEventListener("DOMContentLoaded", function() {
    if (!sessionStorage.getItem('khamach_session_fresh_start')) {
        sessionStorage.setItem('khamach_session_fresh_start', 'true');
        localStorage.removeItem('khamach_combat_tutorial_done');
        localStorage.removeItem('khamach_training_tutorial_done');
        localStorage.removeItem('khamach_citadel_tutorial_done');
        localStorage.removeItem('khamach_missions_tutorial_done');
        localStorage.removeItem('khamach_full_onboarding_complete');
        
        localStorage.setItem('khamach_dragon_essence', '1');
        localStorage.setItem('khamach_gold', '0');
        localStorage.setItem('khamach_hero_lvl_tank', '1');
        localStorage.setItem('khamach_build_tank', '0');
    }
    window.checkAndRenderOnboardingMainButton();
});
