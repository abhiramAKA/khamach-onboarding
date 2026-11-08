/* ==========================================================================
   КХАМАЧ — СЕТКА ИГРОВОГО ПОЛЯ MATCH-3 (ПЛАВНЫЙ СВОП И СВОП-БЭК)
   ========================================================================== */

let match3BoardData = [];
let isBoardLocked = false;
let selectedCell = null;

function initMatch3Board() {
    const board = document.getElementById('match3-board-container');
    if (!board) return;
    board.innerHTML = ''; 
    match3BoardData = []; 
    isBoardLocked = false; 
    selectedCell = null;
    
    const RUNE_TYPES = ['🔥', '🛡️', '⚡', '💚'];
    
    for (let r = 0; r < 8; r++) {
        match3BoardData[r] = [];
        for (let c = 0; c < 8; c++) {
            let allowedTypes = RUNE_TYPES.filter(type => {
                if (r >= 2 && match3BoardData[r-1][c] === type && match3BoardData[r-2][c] === type) return false;
                if (c >= 2 && match3BoardData[r][c-1] === type && match3BoardData[r][c-2] === type) return false;
                return true;
            });
            
            let randomType = allowedTypes.length > 0 
                ? allowedTypes[Math.floor(Math.random() * allowedTypes.length)] 
                : RUNE_TYPES[Math.floor(Math.random() * RUNE_TYPES.length)];
                
            match3BoardData[r][c] = randomType;
        }
    }
    renderBoardDOM();
}

function renderBoardDOM() {
    const board = document.getElementById('match3-board-container');
    if (!board) return;
    board.innerHTML = '';
    
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const cell = document.createElement('div');
            cell.className = 'rune-cell rune-appear';
            cell.dataset.row = r; 
            cell.dataset.col = c;
            cell.innerText = match3BoardData[r][c] || '';
            cell.addEventListener('click', handleCellClick);
            if (typeof setupInputListeners === 'function') setupInputListeners(cell);
            board.appendChild(cell);
        }
    }
}

function handleCellClick(e) {
    if (isBoardLocked) return;
    const cell = e.currentTarget;
    const r = parseInt(cell.dataset.row);
    const c = parseInt(cell.dataset.col);
    
    if (!selectedCell) {
        selectedCell = { row: r, col: c }; 
        cell.style.background = 'rgba(230,194,128,0.3)';
    } else {
        const isNeighbor = Math.abs(r - selectedCell.row) + Math.abs(c - selectedCell.col) === 1;
        if (isNeighbor) {
            animateAndSwapRunes(selectedCell.row, selectedCell.col, r, c);
        } else {
            renderBoardDOM();
            selectedCell = { row: r, col: c };
            const currentCell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
            if (currentCell) currentCell.style.background = 'rgba(230,194,128,0.3)';
        }
    }
}

function animateAndSwapRunes(r1, c1, r2, c2) {
    isBoardLocked = true; 
    if (typeof playMatch3Sound === 'function') playMatch3Sound('swap');
    
    const cell1 = document.querySelector(`[data-row="${r1}"][data-col="${c1}"]`);
    const cell2 = document.querySelector(`[data-row="${r2}"][data-col="${c2}"]`);
    if (!cell1 || !cell2) { isBoardLocked = false; return; }
    
    // ВЫЧИСЛЕНИЕ СКОЛЬЖЕНИЯ: Сдвигаем элементы плавно навстречу друг другу
    const deltaX = cell2.offsetLeft - cell1.offsetLeft;
    const deltaY = cell2.offsetTop - cell1.offsetTop;
    cell1.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    cell2.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`;
    
    setTimeout(() => {
        let temp = match3BoardData[r1][c1]; 
        match3BoardData[r1][c1] = match3BoardData[r2][c2]; 
        match3BoardData[r2][c2] = temp;
        
        let hasMatches = typeof checkMatchesAndExecute === 'function' ? checkMatchesAndExecute() : false;
        if (!hasMatches) {
            // СВОП-БЭК: Если триада не собралась, плавно возвращаем руны назад
            cell1.style.transform = 'translate(0, 0)';
            cell2.style.transform = 'translate(0, 0)';
            temp = match3BoardData[r1][c1]; 
            match3BoardData[r1][c1] = match3BoardData[r2][c2]; 
            match3BoardData[r2][c2] = temp;
            setTimeout(() => { renderBoardDOM(); isBoardLocked = false; }, 220);
        } else {
            selectedCell = null;
            isBoardLocked = false;
        }
    }, 220);
}
