/* ==========================================================================
   КХАМАЧ — ИНТЕРФЕЙС БОЕВОГО ЭКРАНА (v5.9.0-sandbox)
   ========================================================================== */

function injectCombatInterfaceBaseDOM() {
    const parent = document.getElementById('dynamic-combat-screen');
    if (!parent) return;
    
    parent.innerHTML = `
        <div id="combat-screen" class="game-window" style="display:flex; max-width:460px; padding:8px 12px; flex-direction:column; align-items:center;">
            <div id="dragon-raid-zone" style="position:relative; width:100%;"></div>
            <div id="boss-panel">
                <div id="boss-name">ЛИЧИНКА РАЗЛОМА (ТИР 1)</div>
                <div class="hp-bar-container"><div id="boss-hp-bar" class="hp-bar" style="width:100%;"></div><div id="boss-hp-text">120 / 120</div></div>
            </div>
            <div id="battle-status-panel" style="justify-content:space-between; font-size:12px;">
                <div id="combat-round-display">Раунд: 1</div><div style="color:#ffd700;">Сделайте ход на поле!</div>
            </div>
            <div id="squad-matrix" style="display:grid; grid-template-columns:repeat(4,1fr); gap:4px; margin-bottom:4px; width:100%;"></div>
            <div id="match3-board-container" class="match3-board"></div>
        </div>
        <div id="dynamic-combat-popups"></div>
    `;
    injectCombatPopupsDOM();
}

function buildDragonDOM() {
    const zone = document.getElementById('dragon-raid-zone'); if(!zone) return;
    zone.innerHTML = '<div class="dragon-container"><div id="dragon-model">🐛</div></div>';
}

function updateCombatInterfaceDOM() {
    const hpBar = document.getElementById('boss-hp-bar'); const hpText = document.getElementById('boss-hp-text');
    if (hpBar && hpText) {
        let pct = (combatData.dragonHP / combatData.dragonMaxHP) * 100;
        hpBar.style.width = pct + '%'; hpText.innerText = `${combatData.dragonHP} / ${combatData.dragonMaxHP}`;
    }
    const m = document.getElementById('squad-matrix'); if(!m) return; m.innerHTML = '';
    combatData.squad.forEach(hero => {
        const card = document.createElement('div'); card.className = 'hero-gothic-card';
        if(hero.sp >= 100 && hero.hp > 0) card.classList.add('ready-glow');
        card.innerHTML = `
            <div class="hero-card-avatar" style="color:${hero.color};">${hero.icon}</div>
            <div class="hero-card-name">${hero.name}</div>
            <div class="hero-bar-container"><div class="hero-bar-fill hp-fill" style="width:${(hero.hp/hero.maxHP)*100}%;"></div><div class="hero-bar-text">${hero.hp}</div></div>
            <div class="hero-bar-container"><div class="hero-bar-fill sp-fill" style="width:${hero.sp}%;"></div><div class="hero-bar-text">SP</div></div>
        `;
        card.onclick = () => { if (hero.sp >= 100 && typeof activateHeroSuperpower === 'function') activateHeroSuperpower(hero.id); };
        m.appendChild(card);
    });
}
