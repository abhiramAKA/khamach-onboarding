/* ==========================================================================
   КХАМАЧ — ОБРАБОТЧИК СВАЙПОВ И КЛИКОВ МЫШИ (v5.9.0-sandbox)
   ========================================================================== */

let swipeStartX = 0, swipeStartY = 0, swipeStartRow = null, swipeStartCol = null, isTracking = false;

function setupInputListeners(cell) {
    cell.addEventListener('mousedown', (e) => {
        if (isBoardLocked) return;
        isTracking = true;
        swipeStartRow = parseInt(cell.dataset.row); swipeStartCol = parseInt(cell.dataset.col);
        swipeStartX = e.pageX; swipeStartY = e.pageY;
    });
    cell.addEventListener('mousemove', (e) => {
        if (!isTracking || swipeStartRow === null) return;
        const dx = e.pageX - swipeStartX; const dy = e.pageY - swipeStartY;
        if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
            isTracking = false;
            let tRow = swipeStartRow, tCol = swipeStartCol;
            if (Math.abs(dx) > Math.abs(dy)) tCol = dx > 0 ? swipeStartCol + 1 : swipeStartCol - 1;
            else tRow = dy > 0 ? swipeStartRow + 1 : swipeStartRow - 1;
            if (tRow >= 0 && tRow < 8 && tCol >= 0 && tCol < 8) {
                if (typeof animateAndSwapRunes === 'function') animateAndSwapRunes(swipeStartRow, swipeStartCol, tRow, tCol);
            }
        }
    });
}
window.addEventListener('mouseup', () => { isTracking = false; });
