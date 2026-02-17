    // Navbar scroll effect
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

        // Scroll reveal animation
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
        checkReveal(); // Check on load

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // In a real implementation, you would send this to your backend
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will respond within 24 hours.')
            this.reset();
        });

        // ══════════════════════════════════════
        // TOURNAMENT MODAL LOGIC
        // ══════════════════════════════════════
        const openBtn    = document.getElementById('openTournamentModal');
        const tourModal  = document.getElementById('tournamentModal');
        const closeBtn   = document.getElementById('closeModal');
        const tForm      = document.getElementById('tournamentForm');
        const successDiv = document.getElementById('modalSuccess');
        const formWrap   = document.getElementById('modalFormWrap');

        function openModal() {
            tourModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            tourModal.classList.remove('open');
            document.body.style.overflow = '';
            setTimeout(() => {
                successDiv.style.display = 'none';
                formWrap.style.display   = 'block';
                tForm.reset();
            }, 400);
        }

        openBtn .addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);
        tourModal.addEventListener('click', e => { if (e.target === tourModal) closeModal(); });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && tourModal.classList.contains('open')) closeModal();
        });

        tForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(this));
            console.log('Tournament sign-up:', data);
            formWrap.style.display   = 'none';
            successDiv.style.display = 'block';
            setTimeout(closeModal, 4000);
        });

        // Mobile menu toggle — full-screen overlay
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinksMenu  = document.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = navLinksMenu.classList.toggle('mobile-open');
            // Animate hamburger → X
            this.querySelectorAll('span')[0].style.transform = isOpen ? 'rotate(45deg) translate(5.5px, 5.5px)' : '';
            this.querySelectorAll('span')[1].style.opacity   = isOpen ? '0' : '1';
            this.querySelectorAll('span')[2].style.transform = isOpen ? 'rotate(-45deg) translate(5.5px, -5.5px)' : '';
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when any nav link is clicked
        navLinksMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksMenu.classList.remove('mobile-open');
                mobileMenuBtn.querySelectorAll('span')[0].style.transform = '';
                mobileMenuBtn.querySelectorAll('span')[1].style.opacity   = '1';
                mobileMenuBtn.querySelectorAll('span')[2].style.transform = '';
                document.body.style.overflow = '';
            });
        });

    