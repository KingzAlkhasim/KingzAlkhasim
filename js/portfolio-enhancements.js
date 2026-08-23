/* Portfolio conversion + performance enhancements */
(function () {
    'use strict';

    const lowEnd = document.documentElement.classList.contains('ldm') ||
        (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reduce expensive visual effects on low-end devices.
    if (lowEnd) {
        const style = document.createElement('style');
        style.textContent = `
            .deco-orb, .hero-code-ticker, .section-watermark { display:none !important; }
            .reveal, .service-card, .project-card, .game-card, .latest-video-card { animation:none !important; transition:none !important; }
            .floating-card { animation:none !important; }
            html { scroll-behavior:auto !important; }
        `;
        document.head.appendChild(style);

        // Stop the heavy ambient layer if it has already been created.
        document.querySelectorAll('.deco-orb').forEach(el => el.remove());
    }

    // 1. Sharper positioning in the hero.
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero .subtitle');
    const heroPrimary = document.querySelector('.hero .btn-primary');
    const heroSecondary = document.querySelector('.hero .btn-secondary');
    if (heroTitle) heroTitle.innerHTML = 'Full-Stack Developer & <span class="highlight">AI Builder</span>';
    if (heroSubtitle) heroSubtitle.textContent = 'I build fast, modern web applications and AI-powered products for businesses, startups, and ambitious ideas.';
    if (heroPrimary) heroPrimary.textContent = 'Hire Me';
    if (heroSecondary) heroSecondary.textContent = 'View My Work';
    if (heroSecondary) heroSecondary.href = '#projects';

    // 2. Add a concise availability strip directly after the hero.
    const hero = document.querySelector('.hero');
    if (hero && !document.getElementById('availability-strip')) {
        const availability = document.createElement('div');
        availability.id = 'availability-strip';
        availability.innerHTML = `
            <span class="availability-dot" aria-hidden="true"></span>
            <strong>Available for freelance & remote projects</strong>
            <span class="availability-separator">·</span>
            <span>Web development, full-stack apps & AI integrations</span>
            <a href="#contact">Start a project →</a>
        `;
        hero.insertAdjacentElement('afterend', availability);
    }

    // 3. Add a "Why work with me" section after Services.
    const services = document.getElementById('services');
    if (services && !document.getElementById('why-work-with-me')) {
        const section = document.createElement('section');
        section.id = 'why-work-with-me';
        section.innerHTML = `
            <div class="section-header">
                <span class="section-label">Why Me</span>
                <h2 class="section-title">Built for Performance. Designed for People.</h2>
                <p class="section-subtitle">I focus on practical engineering, clean interfaces, and products that are easy to use and maintain.</p>
            </div>
            <div class="why-grid">
                <article class="why-card"><span>⚡</span><h3>Performance-first</h3><p>Fast loading experiences with unnecessary visual overhead kept under control.</p></article>
                <article class="why-card"><span>📱</span><h3>Mobile-first</h3><p>Responsive interfaces that work well across phones, tablets, and desktops.</p></article>
                <article class="why-card"><span>🤖</span><h3>AI integration</h3><p>Experience building AI-powered products, APIs, assistants, and developer tools.</p></article>
                <article class="why-card"><span>🛠️</span><h3>End-to-end ownership</h3><p>From UI and APIs to databases, Git workflows, deployment, and optimization.</p></article>
            </div>
        `;
        services.insertAdjacentElement('afterend', section);
    }

    // 4. Add a clean technology section after About.
    const about = document.getElementById('about');
    if (about && !document.getElementById('core-stack')) {
        const stack = document.createElement('section');
        stack.id = 'core-stack';
        stack.innerHTML = `
            <div class="section-header">
                <span class="section-label">Tech Stack</span>
                <h2 class="section-title">Tools I Build With</h2>
                <p class="section-subtitle">A practical stack for modern web products, backend systems, and AI-powered applications.</p>
            </div>
            <div class="stack-pills">
                <span>HTML</span><span>CSS</span><span>JavaScript</span><span>PHP</span><span>MySQL</span>
                <span>React</span><span>Node.js</span><span>REST APIs</span><span>Git & GitHub</span><span>AI / LLMs</span>
            </div>
        `;
        about.insertAdjacentElement('afterend', stack);
    }

    // 5. Add a live project link to the KingxTech project card.
    const kingxProject = document.querySelector('#projects .project-card');
    if (kingxProject && !kingxProject.querySelector('.project-live-link')) {
        const content = kingxProject.querySelector('.project-content');
        if (content) {
            const link = document.createElement('a');
            link.className = 'project-live-link';
            link.href = 'https://kingxtech.name.ng';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = 'View KingxTech Live →';
            content.appendChild(link);
        }
    }

    // 6. Add a project-oriented budget selector without replacing the existing form.
    const serviceSelect = document.getElementById('service');
    if (serviceSelect && !document.getElementById('budget')) {
        const group = document.createElement('div');
        group.className = 'form-group';
        group.innerHTML = `
            <label for="budget">Estimated Budget</label>
            <select id="budget" name="budget">
                <option value="">Select a range...</option>
                <option value="under-500">Under $500</option>
                <option value="500-1500">$500 – $1,500</option>
                <option value="1500-3000">$1,500 – $3,000</option>
                <option value="3000-plus">$3,000+</option>
                <option value="not-sure">Not sure yet</option>
            </select>
        `;
        serviceSelect.closest('.form-group').insertAdjacentElement('afterend', group);
    }

    // 7. Improve social/SEO metadata available to crawlers that execute DOM scripts.
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Alkhassim Lawal Umar is a full-stack developer and AI builder creating fast web applications, AI-powered products, APIs, and digital experiences.');

    // 8. Give the LinkedIn profile the same structured-data presence as other profiles.
    const ld = document.querySelector('script[type="application/ld+json"]');
    if (ld) {
        try {
            const data = JSON.parse(ld.textContent);
            data.sameAs = Array.from(new Set([...(data.sameAs || []), 'https://www.linkedin.com/in/alkhassim-lawal-umar-85726942']));
            ld.textContent = JSON.stringify(data);
        } catch (_) { /* Leave existing structured data untouched if invalid. */ }
    }
})();
