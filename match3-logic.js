/* ==========================================================================
   КХАМАЧ — МАТРИЧНЫЙ АЛГОРИТМ ПРОВЕРКИ СОВПАДЕНИЙ (ИСПРАВЛЕН ФИКС МИГАНИЯ)
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
                    match3BoardData[r][c] = ['🔥', '🛡️', '⚡', '💚'][Math.floor(Math.random()*4)];
                }
            }
            if (typeof chargeHeroSuperpowers === 'function') chargeHeroSuperpowers(effects);
            
            // ИСПРАВЛЕНО: Вместо грубой перезагрузки DOM обновляем только текстовые значения ячеек матрицы
            for (let r = 0; r < 8; r++) {
                for (let c = 0; c < 8; c++) {
                    const cellEl = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                    if (cellEl) {
                        cellEl.innerText = match3BoardData[r][c];
                        cellEl.className = 'rune-cell'; // Сбрасываем старые анимационные взрывы
                    }
                }
            }
            
            isBoardLocked = false;
            if (typeof usePlayerActionPoint === 'function') usePlayerActionPoint();
        }, 250);
    }
    return found;
}
