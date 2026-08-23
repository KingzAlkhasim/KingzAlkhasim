/* ==========================================
   KingzAlkhassim Portfolio Logic - 2026
   ========================================== */

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => { if (window.scrollY > 100) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled'); });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

const reveals = document.querySelectorAll('.reveal');
function checkReveal() { reveals.forEach(element => { if (element.getBoundingClientRect().top < window.innerHeight - 150) element.classList.add('active'); }); }
window.addEventListener('scroll', checkReveal); checkReveal();

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinksMenu  = document.querySelector('.nav-links');
mobileMenuBtn.addEventListener('click', function() {
    const isOpen = navLinksMenu.classList.toggle('mobile-open');
    this.querySelectorAll('span')[0].style.transform = isOpen ? 'rotate(45deg) translate(5.5px, 5.5px)' : '';
    this.querySelectorAll('span')[1].style.opacity = isOpen ? '0' : '1';
    this.querySelectorAll('span')[2].style.transform = isOpen ? 'rotate(-45deg) translate(5.5px, -5.5px)' : '';
    document.body.style.overflow = isOpen ? 'hidden' : '';
});
navLinksMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinksMenu.classList.remove('mobile-open');
    mobileMenuBtn.querySelectorAll('span')[0].style.transform = '';
    mobileMenuBtn.querySelectorAll('span')[1].style.opacity = '1';
    mobileMenuBtn.querySelectorAll('span')[2].style.transform = '';
    document.body.style.overflow = '';
}));

async function submitToWeb3Forms(event, successAction) {
    event.preventDefault();
    const form = event.target, submitBtn = form.querySelector('button[type="submit"]'), originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...'; submitBtn.disabled = true;
    try {
        const response = await fetch('https://api.web3forms.com/submit', { method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify(Object.fromEntries(new FormData(form))) });
        const result = await response.json();
        if (result.success) { successAction(); form.reset(); } else alert('Error: ' + result.message);
    } catch (error) { console.error(error); alert('Submission failed. Please check your internet connection.'); }
    finally { submitBtn.textContent = originalBtnText; submitBtn.disabled = false; }
}
document.getElementById('contactForm').addEventListener('submit', e => submitToWeb3Forms(e, () => alert('Thank you for your message! I will respond within 24 hours.')));

const tourModal = document.getElementById('tournamentModal'), formWrap = document.getElementById('modalFormWrap'), successDiv = document.getElementById('modalSuccess');
function closeModal() { tourModal.classList.remove('open'); document.body.style.overflow=''; setTimeout(()=>{successDiv.style.display='none';formWrap.style.display='block';},400); }
document.getElementById('tournamentForm').addEventListener('submit', e => submitToWeb3Forms(e, () => { formWrap.style.display='none'; successDiv.style.display='block'; setTimeout(closeModal,5000); }));
const openBtn=document.getElementById('openTournamentModal'), closeBtn=document.getElementById('closeModal');
openBtn.addEventListener('click',()=>{tourModal.classList.add('open');document.body.style.overflow='hidden';});
closeBtn.addEventListener('click',closeModal); tourModal.addEventListener('click',e=>{if(e.target===tourModal)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&tourModal.classList.contains('open'))closeModal();});

function typeText(elementSelector,text,speed=80,delay=0,cursor=true){const element=document.querySelector(elementSelector);if(!element)return;element.textContent='';if(cursor)element.classList.add('typing-cursor');setTimeout(()=>{let i=0;const typeInterval=setInterval(()=>{if(i<text.length)element.textContent+=text.charAt(i++);else{clearInterval(typeInterval);if(cursor)setTimeout(()=>element.classList.remove('typing-cursor'),1000);}},speed);},delay);}
function initTypingAnimations(){const typingObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting&&!entry.target.dataset.typed){entry.target.dataset.typed='true';typeText('#'+entry.target.id,entry.target.dataset.typeText,parseInt(entry.target.dataset.typeSpeed)||80,parseInt(entry.target.dataset.typeDelay)||0,true);}})},{threshold:.5});document.querySelectorAll('[data-type-text]').forEach(el=>typingObserver.observe(el));}
document.addEventListener('DOMContentLoaded',initTypingAnimations);

// LinkedIn Footer Link
document.addEventListener('DOMContentLoaded',()=>{
    const socialLinks=document.querySelector('.social-links'); if(!socialLinks||socialLinks.querySelector('.sl-linkedin'))return;
    const linkedin=document.createElement('a'); linkedin.href='https://www.linkedin.com/in/alkhassim-lawal-umar-85726942a?trk=contact-info'; linkedin.target='_blank'; linkedin.rel='noopener noreferrer'; linkedin.className='social-link sl-linkedin'; linkedin.title='LinkedIn'; linkedin.setAttribute('aria-label','LinkedIn');
    linkedin.innerHTML=`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V8.999h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.287zM5.337 7.433a2.062 2.062 0 1 1 0-4.123 2.062 2.062 0 0 1 0-4.123 2.062 2.062 0 0 1 0 4.123zM7.119 20.452H3.554V8.999h3.565v11.453zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 .774 0 1.729 0 22.271V1.729C0 .774 0 .774 0 .774 0 0 .774 0 1.771 0z"/></svg>`;
    socialLinks.appendChild(linkedin);
});

// Portfolio conversion + performance enhancements
const enhancementScript=document.createElement('script'); enhancementScript.src='js/portfolio-enhancements.js'; document.body.appendChild(enhancementScript);

// Portfolio update notice
document.addEventListener('DOMContentLoaded',()=>{
    if(document.getElementById('site-update-notice'))return;
    const notice=document.createElement('div');
    notice.id='site-update-notice';
    notice.setAttribute('role','status');
    notice.innerHTML='<span aria-hidden="true">🚧</span><strong>Portfolio update in progress</strong><span>Some sections may change temporarily while I improve the site.</span>';
    const style=document.createElement('style');
    style.textContent='#site-update-notice{display:flex;align-items:center;justify-content:center;gap:.55rem;flex-wrap:wrap;padding:.65rem 1rem;background:rgba(15,15,22,.96);border-bottom:1px solid rgba(0,240,255,.16);color:var(--text-secondary);font-size:.82rem;line-height:1.4;text-align:center;position:relative;z-index:1000}#site-update-notice strong{color:var(--text-primary)}#site-update-notice span[aria-hidden="true"]{font-size:.95rem}@media(max-width:600px){#site-update-notice{font-size:.75rem;padding:.55rem .8rem;gap:.4rem}}';
    document.head.appendChild(style);
    document.body.insertBefore(notice,document.body.firstChild);
});
