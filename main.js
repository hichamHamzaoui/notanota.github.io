/* ============================================
   NOTA NOTA — main.js
   ============================================ */

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── MOBILE MENU ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  spans.forEach(s => s.style.transition = 'all 0.3s ease');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity    = '0';
    spans[2].style.transform  = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform  = '';
    spans[1].style.opacity    = '1';
    spans[2].style.transform  = '';
  }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
  });
});

// ── VIDEO TABS ──
const vtabs  = document.querySelectorAll('.vtab');
const panels = document.querySelectorAll('.video-panel');

vtabs.forEach(tab => {
  tab.addEventListener('click', () => {
    vtabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    document.querySelector(`.video-panel[data-panel="${target}"]`).classList.add('active');
  });
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll(
  '.about-grid, .about-stat-bar, .video-card, .member-card, .date-item, .social-card, .contact-grid, .section-title, .section-label, .section-sub'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Stagger for grids
document.querySelectorAll('.members-grid .member-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 120}ms`;
});
document.querySelectorAll('.dates-list .date-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});
document.querySelectorAll('.social-grid .social-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});
document.querySelectorAll('.vgrid .video-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 100}ms`;
});

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link:not(.nav-cta)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinkEls.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent)';
    }
  });
}, { passive: true });

// ── CONTACT FORM ──
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submitContactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('contactName').value.trim();
    const email   = document.getElementById('contactEmailInput').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      // Basic validation shake
      contactForm.style.animation = 'shake 0.4s ease';
      setTimeout(() => { contactForm.style.animation = ''; }, 400);
      return;
    }

    // Simulate sending
    submitBtn.textContent = 'Envoi en cours…';
    submitBtn.disabled = true;

    setTimeout(() => {
      formSuccess.style.display = 'flex';
      contactForm.reset();
      submitBtn.textContent = 'Envoyer le message';
      submitBtn.disabled = false;

      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);
    }, 1200);
  });
}

// Shake animation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-8px); }
  40%       { transform: translateX(8px); }
  60%       { transform: translateX(-5px); }
  80%       { transform: translateX(5px); }
}
`;
document.head.appendChild(shakeStyle);

// ── CURSOR GLOW (subtle) ──
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 300px; height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%);
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s;
  opacity: 0;
`;
document.body.appendChild(cursorGlow);

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
});

function animateCursor() {
  glowX += (mouseX - glowX) * 0.1;
  glowY += (mouseY - glowY) * 0.1;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top  = glowY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ── HERO PARALLAX ──
window.addEventListener('scroll', () => {
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    const scrolled = window.scrollY;
    heroImg.style.transform = `scale(1.05) translateY(${scrolled * 0.25}px)`;
  }
}, { passive: true });

// ── VIDEO PLACEHOLDER RIPPLE ──
document.querySelectorAll('.play-btn-large').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      width: 100%; height: 100%;
      border-radius: 50%;
      background: rgba(201,169,110,0.3);
      animation: rippleOut 0.6s ease forwards;
      pointer-events: none;
    `;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const rippleOutStyle = document.createElement('style');
rippleOutStyle.textContent = `
@keyframes rippleOut {
  from { transform: scale(0.5); opacity: 1; }
  to   { transform: scale(2.5); opacity: 0; }
}
`;
document.head.appendChild(rippleOutStyle);

console.log('%c🎵 NOTA NOTA — Trio Électro-Acoustique', 'color:#c9a96e; font-size:16px; font-weight:bold;');
console.log('%cFolk · Électro · Traditionnel · World Music', 'color:#9d9a95; font-size:12px;');
