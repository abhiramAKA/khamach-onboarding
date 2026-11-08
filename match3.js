/* ==========================================================================
   КХАМАЧ — СЕТКА ИГРОВОГО ПОЛЯ MATCH-3 (УМНАЯ БЕЗОПАСНАЯ ГЕНЕРАЦИЯ)
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
            // ФИКС САМОВЗРЫВОВ: Фильтруем типы рун, исключая дубликаты по горизонтали и вертикали
            let allowedTypes = RUNE_TYPES.filter(type => {
                if (r >= 2 && match3BoardData[r-1][c] === type && match3BoardData[r-2][c] === type) return false;
                if (c >= 2 && match3BoardData[r][c-1] === type && match3BoardData[r][c-2] === type) return false;
                return true;
            });
            // Берем случайный только из разрешенных
            let randomType = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
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
            cell.innerText = match3BoardData[r][c];
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
        }
        selectedCell = null; 
        renderBoardDOM();
    }
}

function animateAndSwapRunes(r1, c1, r2, c2) {
    isBoardLocked = true; 
    if (typeof playMatch3Sound === 'function') playMatch3Sound('swap');
    
    let temp = match3BoardData[r1][c1]; 
    match3BoardData[r1][c1] = match3BoardData[r2][c2]; 
    match3BoardData[r2][c2] = temp;
    
    let hasMatches = typeof checkMatchesAndExecute === 'function' ? checkMatchesAndExecute() : false;
    if (!hasMatches) {
        // Если совпадений нет — возвращаем камни обратно сочным отскоком
        temp = match3BoardData[r1][c1]; 
        match3BoardData[r1][c1] = match3BoardData[r2][c2]; 
        match3BoardData[r2][c2] = temp;
        setTimeout(() => { renderBoardDOM(); isBoardLocked = false; }, 200);
    } else {
        isBoardLocked = false;
    }
}
