/* ==========================================================================
   КХАМАЧ — ХОЛСТ ЖИВЫХ ИСКР КОСТРА (v5.9.0-sandbox)
   ========================================================================== */

(function() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    resize();

    class Spark {
        constructor() { this.reset(); this.y = Math.random() * canvas.height; }
        reset() {
            this.x = Math.random() * canvas.width; this.y = canvas.height + 10;
            this.size = Math.random() * 2 + 1; this.speedY = Math.random() * 1.2 + 0.5;
            this.alpha = Math.random() * 0.6 + 0.4;
        }
        update() {
            this.y -= this.speedY; this.alpha -= 0.003;
            if (this.alpha <= 0 || this.y < 0) this.reset();
        }
        draw() {
            ctx.save(); ctx.globalAlpha = this.alpha; ctx.fillStyle = '#ff7315';
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill(); ctx.restore();
        }
    }

    for(let i=0; i<30; i++) particles.push(new Spark());
    function loop() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    }
    loop();
})();
