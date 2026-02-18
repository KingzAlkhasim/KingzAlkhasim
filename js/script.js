/* ==========================================
   KingzAlkhassim Portfolio Logic - 2026
   ========================================== */

// 1. Navigation & Scroll Effects
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 2. Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');
function checkReveal() {
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}
window.addEventListener('scroll', checkReveal);
checkReveal(); 

// 3. Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinksMenu  = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', function() {
    const isOpen = navLinksMenu.classList.toggle('mobile-open');
    this.querySelectorAll('span')[0].style.transform = isOpen ? 'rotate(45deg) translate(5.5px, 5.5px)' : '';
    this.querySelectorAll('span')[1].style.opacity   = isOpen ? '0' : '1';
    this.querySelectorAll('span')[2].style.transform = isOpen ? 'rotate(-45deg) translate(5.5px, -5.5px)' : '';
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinksMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksMenu.classList.remove('mobile-open');
        mobileMenuBtn.querySelectorAll('span')[0].style.transform = '';
        mobileMenuBtn.querySelectorAll('span')[1].style.opacity   = '1';
        mobileMenuBtn.querySelectorAll('span')[2].style.transform = '';
        document.body.style.overflow = '';
    });
});

// 4. Form Submission Logic (Web3Forms AJAX)
async function submitToWeb3Forms(event, successAction) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: json
        });

        const result = await response.json();
        if (result.success) {
            successAction();
            form.reset();
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error(error);
        alert("Submission failed. Please check your internet connection.");
    } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
}

// Handle Contact Form
document.getElementById('contactForm').addEventListener('submit', (e) => {
    submitToWeb3Forms(e, () => {
        alert('Thank you for your message! I will respond within 24 hours.');
    });
});

// Handle Tournament Form
const tourModal  = document.getElementById('tournamentModal');
const formWrap   = document.getElementById('modalFormWrap');
const successDiv = document.getElementById('modalSuccess');

function closeModal() {
    tourModal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
        successDiv.style.display = 'none';
        formWrap.style.display   = 'block';
    }, 400);
}

document.getElementById('tournamentForm').addEventListener('submit', (e) => {
    submitToWeb3Forms(e, () => {
        formWrap.style.display   = 'none';
        successDiv.style.display = 'block';
        setTimeout(closeModal, 5000);
    });
});

// 5. Tournament Modal Open/Close
const openBtn    = document.getElementById('openTournamentModal');
const closeBtn   = document.getElementById('closeModal');

openBtn.addEventListener('click', () => {
    tourModal.classList.add('open');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', closeModal);

tourModal.addEventListener('click', e => { 
    if (e.target === tourModal) closeModal(); 
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && tourModal.classList.contains('open')) closeModal();
});


// ═══════════════════════════════════════════════════════════
// TYPING ANIMATION SYSTEM
// Add this to your existing script.js file at the bottom
// ═══════════════════════════════════════════════════════════

/**
 * Typing Animation Function
 * @param {string} elementSelector - CSS selector for the element
 * @param {string} text - Text to type out
 * @param {number} speed - Typing speed in milliseconds (default: 80)
 * @param {number} delay - Delay before starting (default: 0)
 * @param {boolean} cursor - Show blinking cursor (default: true)
 */
function typeText(elementSelector, text, speed = 80, delay = 0, cursor = true) {
    const element = document.querySelector(elementSelector);
    if (!element) return;

    // Store original text
    const originalText = text;
    element.textContent = '';
    
    // Add cursor if enabled
    if (cursor) {
        element.classList.add('typing-cursor');
    }

    setTimeout(() => {
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < originalText.length) {
                element.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                // Remove cursor after typing completes
                if (cursor) {
                    setTimeout(() => {
                        element.classList.remove('typing-cursor');
                    }, 1000);
                }
            }
        }, speed);
    }, delay);
}

/**
 * Typing Animation for Multiple Lines
 * Types out text line by line with pauses
 */
function typeMultiline(elementSelector, lines, speed = 80, linePause = 500) {
    const element = document.querySelector(elementSelector);
    if (!element) return;

    element.textContent = '';
    element.classList.add('typing-cursor');
    
    let currentLine = 0;
    let currentChar = 0;

    function typeNextChar() {
        if (currentLine >= lines.length) {
            element.classList.remove('typing-cursor');
            return;
        }

        const line = lines[currentLine];
        
        if (currentChar < line.length) {
            element.textContent += line.charAt(currentChar);
            currentChar++;
            setTimeout(typeNextChar, speed);
        } else {
            // Finished current line, move to next after pause
            if (currentLine < lines.length - 1) {
                element.textContent += '\n';
            }
            currentLine++;
            currentChar = 0;
            setTimeout(typeNextChar, linePause);
        }
    }

    typeNextChar();
}

/**
 * Initialize typing animations when elements come into view
 */
function initTypingAnimations() {
    // Create IntersectionObserver for scroll-triggered typing
    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.typed) {
                entry.target.dataset.typed = 'true';
                const text = entry.target.dataset.typeText;
                const speed = parseInt(entry.target.dataset.typeSpeed) || 80;
                const delay = parseInt(entry.target.dataset.typeDelay) || 0;
                
                typeText(`#${entry.target.id}`, text, speed, delay, true);
            }
        });
    }, { threshold: 0.5 });

    // Observe elements with data-type-text attribute
    document.querySelectorAll('[data-type-text]').forEach(el => {
        typingObserver.observe(el);
    });
}


// ═══════════════════════════════════════════════════════════
// TYPING ANIMATION SYSTEM
// Add this to your existing script.js file at the bottom
// ═══════════════════════════════════════════════════════════

/**
 * Typing Animation Function
 * @param {string} elementSelector - CSS selector for the element
 * @param {string} text - Text to type out
 * @param {number} speed - Typing speed in milliseconds (default: 80)
 * @param {number} delay - Delay before starting (default: 0)
 * @param {boolean} cursor - Show blinking cursor (default: true)
 */
function typeText(elementSelector, text, speed = 80, delay = 0, cursor = true) {
    const element = document.querySelector(elementSelector);
    if (!element) return;

    // Store original text
    const originalText = text;
    element.textContent = '';
    
    // Add cursor if enabled
    if (cursor) {
        element.classList.add('typing-cursor');
    }

    setTimeout(() => {
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < originalText.length) {
                element.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                // Remove cursor after typing completes
                if (cursor) {
                    setTimeout(() => {
                        element.classList.remove('typing-cursor');
                    }, 1000);
                }
            }
        }, speed);
    }, delay);
}

/**
 * Typing Animation for Multiple Lines
 * Types out text line by line with pauses
 */
function typeMultiline(elementSelector, lines, speed = 80, linePause = 500) {
    const element = document.querySelector(elementSelector);
    if (!element) return;

    element.textContent = '';
    element.classList.add('typing-cursor');
    
    let currentLine = 0;
    let currentChar = 0;

    function typeNextChar() {
        if (currentLine >= lines.length) {
            element.classList.remove('typing-cursor');
            return;
        }

        const line = lines[currentLine];
        
        if (currentChar < line.length) {
            element.textContent += line.charAt(currentChar);
            currentChar++;
            setTimeout(typeNextChar, speed);
        } else {
            // Finished current line, move to next after pause
            if (currentLine < lines.length - 1) {
                element.textContent += '\n';
            }
            currentLine++;
            currentChar = 0;
            setTimeout(typeNextChar, linePause);
        }
    }

    typeNextChar();
}

/**
 * Initialize typing animations when elements come into view
 */
function initTypingAnimations() {
    // Create IntersectionObserver for scroll-triggered typing
    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.typed) {
                entry.target.dataset.typed = 'true';
                const text = entry.target.dataset.typeText;
                const speed = parseInt(entry.target.dataset.typeSpeed) || 80;
                const delay = parseInt(entry.target.dataset.typeDelay) || 0;
                
                typeText(`#${entry.target.id}`, text, speed, delay, true);
            }
        });
    }, { threshold: 0.5 });

    // Observe elements with data-type-text attribute
    document.querySelectorAll('[data-type-text]').forEach(el => {
        typingObserver.observe(el);
    });
}

// ═══════════════════════════════════════════════════════════
// APPLY TYPING ANIMATIONS TO YOUR SITE
// ═══════════════════════════════════════════════════════════

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. TYPE OUT THE MAIN HERO HEADLINE (delay so page loads first)
    setTimeout(() => {
        const heroH1 = document.querySelector('.hero-content h1');
        if (heroH1) {
            const fullText = heroH1.textContent;
            typeText('.hero-content h1', fullText, 60, 300, true);
        }
    }, 500);

    // 2. Hero subtitle - DISABLED (no typing animation needed)
    // setTimeout(() => {
    //     const subtitle = document.querySelector('.hero-content .subtitle');
    //     if (subtitle) {
    //         const fullText = subtitle.textContent;
    //         typeText('.hero-content .subtitle', fullText, 40, 0, false);
    //     }
    // }, 3500);

    // 3. GAMING SECTION - Type gamer tagline on scroll
    const gamerSubtitle = document.querySelector('#gaming .section-subtitle');
    if (gamerSubtitle) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !gamerSubtitle.dataset.typed) {
                    gamerSubtitle.dataset.typed = 'true';
                    const text = gamerSubtitle.textContent;
                    typeText('#gaming .section-subtitle', text, 50, 200, true);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(gamerSubtitle);
    }

    // 4. SERVICES SECTION - Type the "What I Offer" subtitle
    const servicesSubtitle = document.querySelector('#services .section-subtitle');
    if (servicesSubtitle) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !servicesSubtitle.dataset.typed) {
                    servicesSubtitle.dataset.typed = 'true';
                    const text = servicesSubtitle.textContent;
                    typeText('#services .section-subtitle', text, 45, 300, false);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(servicesSubtitle);
    }

   