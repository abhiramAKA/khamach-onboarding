/* ==========================================================================
   КХАМАЧ — СЕТКА ИГРОВОГО ПОЛЯ MATCH-3 (v5.9.0-sandbox)
   ========================================================================== */

let match3BoardData = [];
let isBoardLocked = false;
let selectedCell = null;

function initMatch3Board() {
    const board = document.getElementById('match3-board-container');
    if (!board) return;
    board.innerHTML = ''; match3BoardData = []; isBoardLocked = false; selectedCell = null;
    
    for (let r = 0; r < 8; r++) {
        match3BoardData[r] = [];
        for (let c = 0; c < 8; c++) {
            match3BoardData[r][c] = ['🔥', '🛡️', '⚡', '💚'][Math.floor(Math.random()*4)];
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
            cell.dataset.row = r; cell.dataset.col = c;
            cell.innerText = match3BoardData[r][c];
            cell.addEventListener('click', handleCellClick);
            setupInputListeners(cell);
            board.appendChild(cell);
        }
    }
}

function handleCellClick(e) {
    if (isBoardLocked) return;
    const cell = e.currentTarget;
    const r = parseInt(cell.dataset.row), c = parseInt(cell.dataset.col);
    
    if (!selectedCell) {
        selectedCell = { row: r, col: c }; cell.style.background = 'rgba(230,194,128,0.3)';
    } else {
        const isNeighbor = Math.abs(r - selectedCell.row) + Math.abs(c - selectedCell.col) === 1;
        if (isNeighbor) animateAndSwapRunes(selectedCell.row, selectedCell.col, r, c);
        selectedCell = null; renderBoardDOM();
    }
}

function animateAndSwapRunes(r1, c1, r2, c2) {
    isBoardLocked = true; playMatch3Sound('swap');
    let temp = match3BoardData[r1][c1]; match3BoardData[r1][c1] = match3BoardData[r2][c2]; match3BoardData[r2][c2] = temp;
    
    let hasMatches = checkMatchesAndExecute();
    if (!hasMatches) {
        temp = match3BoardData[r1][c1]; match3BoardData[r1][c1] = match3BoardData[r2][c2]; match3BoardData[r2][c2] = temp;
        setTimeout(() => { renderBoardDOM(); isBoardLocked = false; }, 200);
    } else {
        isBoardLocked = false;
    }
}
