/* ==========================================================================
   КХАМАЧ — МАТРИЧНЫЙ АЛГОРИТМ ПРОВЕРКИ СОВПАДЕНИЙ (ФИКС ОКОН И ПАДЕНИЯ)
   ========================================================================== */

function checkMatchesAndExecute() {
    let matched = Array(8).fill().map(() => Array(8).fill(false));
    let found = false;
    let detectedAdvancedCombo = false;
    
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
        
        // ФИКС ОДНОКРАТНОСТИ: Показываем окно комбо строго 1 раз за всю историю обучения
        const isComboTutorialDone = localStorage.getItem('khamach_combo_tut_done') === 'true';
        if (detectedAdvancedCombo && !isComboTutorialDone) {
            const comboScr = document.getElementById('combat-combo-tutorial-screen');
            if (comboScr) {
                comboScr.style.display = 'flex';
                // Сразу взрываем текущие ячейки в памяти, чтобы они очистились
                for (let r = 0; r < 8; r++) {
                    for (let c = 0; c < 8; c++) {
                        if (matched[r][c] && match3BoardData[r][c]) {
                            effects[match3BoardData[r][c]]++;
                            match3BoardData[r][c] = null;
                        }
                    }
                }
                return found; // Замораживаем выполнение кода, прерывая падение
            }
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

        window.executePostComboGravity = function() {
            const RUNE_TYPES = ['🔥', '🛡️', '⚡', '💚'];
            let newRunesCoords = [];
            
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
                    
                    newRunesCoords.push({ row: r, col: c });
                }
            }
            
            if (typeof chargeHeroSuperpowers === 'function') chargeHeroSuperpowers(effects);
            
            // ЧЕСТНАЯ ГРАВИТАЦИЯ: Перерисовываем доску с анимационным классом падения рун сверху
            const board = document.getElementById('match3-board-container');
            if (board) {
                board.innerHTML = '';
                for (let r = 0; r < 8; r++) {
                    for (let c = 0; c < 8; c++) {
                        const cell = document.createElement('div');
                        cell.className = 'rune-cell';
                        cell.dataset.row = r; cell.dataset.col = c;
                        cell.innerText = match3BoardData[r][c] || '';
                        
                        if (newRunesCoords.some(coord => coord.row === r && coord.col === c)) {
                            cell.classList.add('rune-fall');
                        }
                        
                        cell.addEventListener('click', handleCellClick);
                        if (typeof setupInputListeners === 'function') setupInputListeners(cell);
                        board.appendChild(cell);
                    }
                }
            }
            
            setTimeout(() => {
                let chainMatched = checkMatchesAndExecute();
                if (!chainMatched) {
                    isBoardLocked = false;
                    if (typeof usePlayerActionPoint === 'function') usePlayerActionPoint();
                }
            }, 220);
        };
        
        setTimeout(() => { window.executePostComboGravity(); }, 250);
    }
    return found;
}
