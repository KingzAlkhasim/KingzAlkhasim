/* ═══════════════════════════════════════════════════════════
   HERO PARTICLE NETWORK
   Lightweight canvas animation for the hero background.
   - Auto-pauses when the hero scrolls out of view
   - Respects Lite Mode (html.ldm) and prefers-reduced-motion
   - Density scales to viewport, capped for low-end perf
   ═══════════════════════════════════════════════════════════ */
(function () {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;

    const hero = canvas.closest('.hero');
    const ctx = canvas.getContext('2d');
    const root = document.documentElement;

    const COLORS = ['0,240,255', '168,85,247', '236,72,153']; // cyan, purple, pink — matches --accent-* vars
    const LINK_DIST = 130;
    const MOUSE_DIST = 160;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w, h, dpr, nodes = [];
    let visible = true;
    let frame = null;

    function isLite() {
        return root.classList.contains('ldm');
    }

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = hero.clientWidth;
        h = hero.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        initNodes();
    }

    function initNodes() {
        const count = Math.min(60, Math.floor((w * h) / 22000));
        nodes = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.22,
            vy: (Math.random() - 0.5) * 0.22,
            r: Math.random() * 1.5 + 0.6,
            c: COLORS[Math.floor(Math.random() * COLORS.length)]
        }));
    }

    const mouse = { x: -9999, y: -9999, active: false };
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
    });
    hero.addEventListener('mouseleave', () => { mouse.active = false; });

    function drawFrame() {
        ctx.clearRect(0, 0, w, h);

        for (const n of nodes) {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > w) n.vx *= -1;
            if (n.y < 0 || n.y > h) n.vy *= -1;

            if (mouse.active) {
                const dx = mouse.x - n.x, dy = mouse.y - n.y;
                const dist = Math.hypot(dx, dy);
                if (dist < MOUSE_DIST) {
                    n.x += dx * 0.0025;
                    n.y += dy * 0.0025;
                }
            }

            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${n.c},0.85)`;
            ctx.shadowColor = `rgba(${n.c},0.85)`;
            ctx.shadowBlur = 6;
            ctx.fill();
        }
        ctx.shadowBlur = 0;

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i], b = nodes[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.hypot(dx, dy);
                if (dist < LINK_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(168,150,255,${(1 - dist / LINK_DIST) * 0.16})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    function loop() {
        if (!visible || isLite()) { frame = null; return; }
        drawFrame();
        frame = requestAnimationFrame(loop);
    }

    function start() {
        if (frame || isLite() || prefersReduced) return;
        frame = requestAnimationFrame(loop);
    }

    // Pause/resume when hero scrolls in/out of view (perf on long pages)
    const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
    }, { threshold: 0.05 });
    observer.observe(hero);

    // React live to the Lite Mode toggle button without a page reload
    const liteToggle = document.getElementById('ldmToggle');
    if (liteToggle) {
        liteToggle.addEventListener('click', () => {
            // applyLite() runs first (toggles the class), so check shortly after
            setTimeout(() => { if (!isLite()) start(); else drawFrame(); }, 0);
        });
    }

    window.addEventListener('resize', resize);
    resize();

    if (prefersReduced || isLite()) {
        // Render one static frame instead of animating
        drawFrame();
    } else {
        start();
    }
})();
