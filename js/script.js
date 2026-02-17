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
