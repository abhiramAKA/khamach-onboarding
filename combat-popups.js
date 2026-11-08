/* ==========================================================================
   КХАМАЧ — АВТОНОМНЫЕ ОКНА ОБУЧЕНИЯ И СЛУЖЕБНЫЕ ПОП-АПЫ (ЗАМОРОЗКА КАДИРОВА)
   ========================================================================== */

function injectCombatPopupsDOM() {
    const parent = document.getElementById('dynamic-combat-popups');
    if (!parent) return;
    
    parent.innerHTML = `
        <!-- ================= ОКНО ОБУЧЕНИЯ ПЕРВОГО БОЯ (3 ПУНКТА) ================= -->
        <div id="combat-welcome-tutorial-screen" class="combat-help-popup" style="display:none;">
            <div class="combat-help-content" style="max-width: 380px;">
                <h2>ОБУЧЕНИЕ БОЯ</h2>
                <span class="subtitle">Первый Вход в Горнило</span>
                <div style="font-size:13px; color:#cdb38c; text-align:left; display:flex; flex-direction:column; gap:10px; background:rgba(0,0,0,0.4); padding:12px; border:1px solid #544432; border-radius:4px; box-sizing:border-box;">
                    <div><strong>1. Собирай одинаковые триады рун:</strong> Это не наносит урона, но копит энергию для соответсвующих героев твоего боевого отряда (🔥 🛡️ ⚡ 💚).</div>
                    <div><strong>2. Нажимай на карточку героя, когда она засияет:</strong> Значит шкала энергии дошла до 100%, and можно применить способность героя.</div>
                    <div><strong>3. Действуй обдуманно:</strong> После каждых трех твоих действий с рунами враг тоже совершает одну атаку.</div>          
                </div>
                <button class="menu-btn" style="width:100%; margin-top:15px; background:linear-gradient(to bottom, #1d3a1e, #0f2110); padding:10px; font-weight:bold;" onclick="document.getElementById('combat-welcome-tutorial-screen').style.display='none';">В бой!</button>
            </div>
        </div>

        <!-- ================= ОКНО ОСОБЫХ КОМБИНАЦИЙ (С ОТТАИВАНИЕМ КАДИРОВА) ================= -->
        <div id="combat-combo-tutorial-screen" class="combat-help-popup" style="display:none;">
            <div class="combat-help-content" style="max-width: 380px;">
                <h2>Продвинутое Комбо!</h2>
                <span class="subtitle">Усиленный ряд рун</span>
                <div style="font-size:13px; color:#ffb3ba; line-height:1.4; background:rgba(40,10,10,0.5); padding:12px; border:1px solid #6e3131; border-radius:4px; text-align:left; box-sizing:border-box;">
                    Вы собрали усиленный ряд из 4 или 5 рун! В данный момент эти продвинутые комбинации <strong>неактивны</strong>. Чтобы разблокировать их силу, посети 🏋️"Тренировочный лагерь" после сражения и усиль своих бойцов!
                </div>
                <button id="close-combo-tutorial-btn" class="menu-btn" style="width:100%; margin-top:15px; background:linear-gradient(to bottom, #2d2621, #171311); padding:10px;">Понятно</button>
            </div>
        </div>
    `;

    // Привязываем размораживание каскада и падение рун напрямую к клику по кнопке
    document.getElementById('close-combo-tutorial-btn').onclick = function() {
        document.getElementById('combat-combo-tutorial-screen').style.display = 'none';
        if (typeof window.executePostComboGravity === 'function') {
            window.executePostComboGravity(); // Только теперь руны падают вниз!
        }
    };
}
