/* ==========================================================================
   КХАМАЧ — ВИЗУАЛЬНЫЕ ЭФФЕКТЫ РУН (v5.9.0-sandbox)
   ========================================================================== */

function spawnRuneExplosionSparks(r, c, type) {
    const board = document.getElementById('match3-board-container');
    const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
    if (!board || !cell) return;
    
    const startX = cell.offsetLeft + cell.offsetWidth / 2;
    const startY = cell.offsetTop + cell.offsetHeight / 2;
    
    for (let i = 0; i < 6; i++) {
        const spark = document.createElement('div');
        spark.className = 'rune-spark';
        spark.style.left = `${startX}px`; spark.style.top = `${startY}px`;
        spark.style.background = '#ffd700';
        
        const angle = (i * 60) * (Math.PI / 180);
        const dx = Math.cos(angle) * 35;
        const dy = Math.sin(angle) * 35;
        
        spark.style.setProperty('--dx', `${dx}px`);
        spark.style.setProperty('--dy', `${dy}px`);
        board.appendChild(spark);
        setTimeout(() => spark.remove(), 400);
    }
}
function triggerMatch3Haptic() {}
