/* ==========================================================================
   КХАМАЧ — ОГРАНИЧЕННАЯ КАРТА ОБУЧЕНИЯ (v5.9.0-sandbox)
   ========================================================================== */

function showScreen(id) {
    const arr = ['dragon-select-screen', 'combat-screen'];
    arr.forEach(s => {
        const el = document.getElementById(s);
        if(el) el.style.style.display = (s === id) ? 'flex' : 'none';
    });
}

function renderDragonSelectionGrid() {
    const gridContainer = document.getElementById('dragon-levels-grid');
    if (!gridContainer) return;
    gridContainer.innerHTML = '';
    
    const row = document.createElement('div');
    row.className = 'menu-row';
    
    const btn = document.createElement('button');
    btn.className = 'menu-btn';
    btn.style.background = "linear-gradient(to bottom, #3b1717, #1c0a0a)";
    btn.style.borderColor = "#9c2a2a";
    btn.style.color = "#ff8c8c";
    btn.innerHTML = "🐛 Тир 1 : Личинка Разлома [Огонь] — 120 HP";
    
    btn.onclick = function() {
        showScreen('combat-screen');
        if (typeof startCombatSession === 'function') startCombatSession(1);
    };
    
    row.appendChild(btn);
    gridContainer.appendChild(row);
}
