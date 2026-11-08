/* ==========================================================================
   КХАМАЧ — ЯДРО БОЯ ОБУЧЕНИЯ (v5.9.0-sandbox)
   ========================================================================== */

let combatData = { dragonHP: 120, dragonMaxHP: 120, playerAP: 3, currentRound: 1, squad: [] };

function startCombatSession() {
    combatData.dragonHP = 120;
    combatData.dragonMaxHP = 120;
    combatData.playerAP = 3;
    combatData.currentRound = 1;
    
    combatData.squad = [
        { id: "tank", name: "Защитник", hp: 150, maxHP: 150, sp: 0, maxSP: 100, icon: "🛡️", color: "#4a90e2" },
        { id: "damage", name: "Воин", hp: 90, maxHP: 90, sp: 0, maxSP: 100, icon: "🔥", color: "#ff4500" },
        { id: "archer", name: "Стрелок", hp: 100, maxHP: 100, sp: 0, maxSP: 100, icon: "⚡", color: "#f1c40f" },
        { id: "mage", name: "Маг", hp: 80, maxHP: 80, sp: 0, maxSP: 100, icon: "💚", color: "#2ecc71" }
    ];

    if (typeof injectCombatInterfaceBaseDOM === 'function') injectCombatInterfaceBaseDOM();
    if (typeof buildDragonDOM === 'function') buildDragonDOM();
    if (typeof updateCombatInterfaceDOM === 'function') updateCombatInterfaceDOM();
    if (typeof initMatch3Board === 'function') initMatch3Board();
    
    const welcome = document.getElementById('combat-welcome-tutorial-screen');
    if (welcome) welcome.style.display = 'flex';
}

function usePlayerActionPoint() {
    combatData.playerAP--;
    if (combatData.playerAP <= 0) {
        // Дракон кусает в ответ
        setTimeout(() => {
            let target = combatData.squad.find(h => h.hp > 0);
            if (target) target.hp = Math.max(0, target.hp - 16);
            combatData.playerAP = 3;
            combatData.currentRound++;
            if (typeof updateCombatInterfaceDOM === 'function') updateCombatInterfaceDOM();
            
            if (combatData.squad.every(h => h.hp <= 0)) {
                alert("Отряд пал! Начнем бой сначала.");
                startCombatSession();
            }
        }, 400);
    }
    if (typeof updateCombatInterfaceDOM === 'function') updateCombatInterfaceDOM();
}

function activateHeroSuperpower(heroId) {
    let hero = combatData.squad.find(h => h.id === heroId);
    if (!hero || hero.sp < 100) return;
    hero.sp = 0;
    
    if (heroId === 'damage') combatData.dragonHP = Math.max(0, combatData.dragonHP - 135);
    else combatData.dragonHP = Math.max(0, combatData.dragonHP - 30);
    
    if (typeof updateCombatInterfaceDOM === 'function') updateCombatInterfaceDOM();
    
    if (combatData.dragonHP <= 0) {
        localStorage.setItem('khamach_combat_tutorial_done', 'true');
        alert("ВЕЛИКАЯ ПОБЕДА! Дракон повержен!");
        window.location.href = 'gate.html?t=' + Date.now();
    }
}

function chargeHeroSuperpowers(effects) {
    combatData.squad.forEach(hero => {
        if (effects && effects[hero.icon]) hero.sp = Math.min(100, hero.sp + effects[hero.icon] * 15);
    });
}
