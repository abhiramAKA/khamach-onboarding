/* ==========================================================================
   КХАМАЧ — ИНЪЕКТОР СТАТИЧЕСКИХ ИНТЕРФЕЙСОВ ТУТОРИАЛА (v5.9.0-sandbox)
   ========================================================================== */

function injectTownScreensDOM() {
    const selectScr = document.getElementById('dragon-select-screen');
    if (selectScr) {
        selectScr.innerHTML = `
            <h2>Выбор Испытания</h2>
            <span class="subtitle">Карта Кампании Онбординга</span>
            <div id="dragon-levels-grid" style="display:flex; flex-direction:column; gap:6px; margin-bottom:15px; width:100%;"></div>
        `;
    }

    const storageScr = document.getElementById('storage-screen');
    if (storageScr) {
        storageScr.innerHTML = `
            <h2>Склад Цитадели</h2>
            <span class="subtitle">Ресурсы обучения</span>
            <div style="background:rgba(0,0,0,0.5); padding:10px; border:1px solid #544432; font-size:14px; text-align:left; color:#ffd700;">
                🪙 Казна: 133 золотых
            </div>
        `;
    }
}
