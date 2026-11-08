/* ==========================================================================
   КХАМАЧ — МАТРИЧНЫЙ АЛГОРИТМ ПРОВЕРКИ СОВПАДЕНИЙ (БЕЗОПАСНОЕ ПАДЕНИЕ)
   ========================================================================== */

function checkMatchesAndExecute() {
    let matched = Array(8).fill().map(() => Array(8).fill(false));
    let found = false;
    
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 6; c++) {
            if (match3BoardData[r][c] && match3BoardData[r][c] === match3BoardData[r][c+1] && match3BoardData[r][c] === match3BoardData[r][c+2]) {
                matched[r][c] = matched[r][c+1] = matched[r][c+2] = true; found = true;
            }
        }
    }
    for (let c = 0; c < 8; c++) {
        for (let r = 0; r < 6; r++) {
            if (match3BoardData[r][c] && match3BoardData[r][c] === match3BoardData[r+1][c] && match3BoardData[r][c] === match3BoardData[r+2][c]) {
                matched[r][c] = matched[r+1][c] = matched[r+2][c] = true; found = true;
            }
        }
    }
    
    if (found) {
        isBoardLocked = true;
        let effects = { '🔥': 0, '🛡️': 0, '⚡': 0, '💚': 0 };
        
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (matched[r][c]) {
                    effects[match3BoardData[r][c]]++;
                    if (typeof spawnRuneExplosionSparks === 'function') {
                        spawnRuneExplosionSparks(r, c, match3BoardData[r][c]);
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
                // ФИКС ПАДЕНИЯ: Новые падающие руны тоже фильтруются от случайных комбо
                for (let r = emptyRow; r >= 0; r--) {
                    let allowedTypes = RUNE_TYPES.filter(type => {
                        if (r >= 2 && match3BoardData[r-1][c] === type && match3BoardData[r-2][c] === type) return false;
                        if (c >= 2 && match3BoardData[r][c-1] === type && match3BoardData[r][c-2] === type) return false;
                        return true;
                    });
                    match3BoardData[r][c] = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
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
            
            isBoardLocked = false;
            if (typeof usePlayerActionPoint === 'function') usePlayerActionPoint();
        }, 250);
    }
    return found;
}
