/* ==========================================================================
   КХАМАЧ — СЕРВИСНЫЙ АУДИО-СИНТЕЗАТОР ОБУЧЕНИЯ (v5.9.0-sandbox)
   ========================================================================== */

let audioCtx = null;

function initAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playMatch3Sound(type) {
    try {
        initAudioContext();
        if (!audioCtx || audioCtx.state === 'suspended') return;
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        const now = audioCtx.currentTime;
        osc.type = 'sine';
        
        if (type === 'swap') {
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            osc.start(now); osc.stop(now + 0.1);
        } else {
            osc.frequency.setValueAtTime(300, now);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.start(now); osc.stop(now + 0.2);
        }
    } catch (e) {}
}
function startBackgroundMusic() { initAudioContext(); }
