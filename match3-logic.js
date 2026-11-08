/* ==========================================================================
   КХАМАЧ — МАТРИЧНЫЙ АЛГОРИТМ ПРОВЕРКИ СОВПАДЕНИЙ (КАСКАДНЫЙ СБОР + КОМБО)
   ========================================================================== */

function checkMatchesAndExecute() {
    let matched = Array(8).fill().map(() => Array(8).fill(false));
    let found = false;
    let detectedAdvancedCombo = false;
    
    // 1. Поиск триад по горизонтали
    for (let r = 0; r < 8; r++) {
        let matchLength = 1;
        for (let c = 0; c < 8; c++) {
            if (c < 7 && match3BoardData[r][c] === match3BoardData[r][c+1] && match3BoardData[r][c] !== null) {
                matchLength++;
            } else {
                if (matchLength >= 3) {
                    if (matchLength >= 4) detectedAdvancedCombo = true;
                    for (let i = c - matchLength + 1; i <= c; i++) { matched[r][i] = true; }
                    found = true;
                }
                matchLength = 1;
            }
        }
    }
    
    // 2. Поиск триад по вертикали
    for (let c = 0; c < 8; c++) {
        let matchLength = 1;
        for (let r = 0; r < 8; r++) {
            if (r < 7 && match3BoardData[r][c] === match3BoardData[r+1][c] && match3BoardData[r][c] !== null) {
                matchLength++;
            } else {
                if (matchLength >= 3) {
                    if (matchLength >= 4) detectedAdvancedCombo = true;
                    for (let i = r - matchLength + 1; i <= r; i++) { matched[i][c] = true; }
                    found = true;
                }
                matchLength = 1;
            }
        }
    }
    
    if (found) {
        isBoardLocked = true;
        let effects = { '🔥': 0, '🛡️': 0, '⚡': 0, '💚': 0 };
        
        // Вызов поп-апа продвинутых комбинаций обучения
        if (detectedAdvancedCombo) {
            const comboScr = document.getElementById('combat-combo-tutorial-screen');
            if (comboScr) comboScr.style.display = 'flex';
        }
        
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (matched[r][c] && match3BoardData[r][c]) {
                    let type = match3BoardData[r][c];
                    effects[type]++;
                    if (typeof spawnRuneExplosionSparks === 'function') {
                        spawnRuneExplosionSparks(r, c, type);
                    }
                    match3BoardData[r][c] = null;
                }
            }
        }
        
        setTimeout(() => {
            const RUNE_TYPES = ['🔥', '🛡️', '⚡', '💚'];
            
            for (let c = 0; c < 8; c++) {
                let emptyRow = 7;
                for (let r = 7; r >= 0; r--) {
                    if (match3BoardData[r][c] !== null) {
                        match3BoardData[emptyRow][c] = match3BoardData[r][c];
                        if (r !== emptyRow) match3BoardData[r][c] = null;
                        emptyRow--;
                    }
                }
                
                for (let r = emptyRow; r >= 0; r--) {
                    let allowedTypes = RUNE_TYPES.filter(type => {
                        if (r >= 2 && match3BoardData[r-1][c] === type && match3BoardData[r-2][c] === type) return false;
                        if (c >= 2 && match3BoardData[r][c-1] === type && match3BoardData[r][c-2] === type) return false;
                        return true;
                    });
                    
                    match3BoardData[r][c] = allowedTypes.length > 0 
                        ? allowedTypes[Math.floor(Math.random() * allowedTypes.length)] 
                        : RUNE_TYPES[Math.floor(Math.random() * RUNE_TYPES.length)];
                }
            }
            
            if (typeof chargeHeroSuperpowers === 'function') chargeHeroSuperpowers(effects);
            
            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    const cellEl = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                    if (cellEl) {
                        cellEl.innerText = match3BoardData[r][c];
                        cellEl.className = 'rune-cell';
                    }
                }
            }
            
            setTimeout(() => {
                let chainMatched = checkMatchesAndExecute();
                if (!chainMatched) {
                    isBoardLocked = false;
                    if (typeof usePlayerActionPoint === 'function') usePlayerActionPoint();
                }
            }, 200);
            
        }, 250);
    }
    return found;
}
