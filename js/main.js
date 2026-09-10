/**
 * Little Panda International Montessori School (LPIMS)
 * Kiddy Interactive Controller: 2-Way Switcher (Pastel vs. Glass),
 * Tabs, FAQ Accordion, and WhatsApp Inquiry
 */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundSwitcher();
  initThemeToggle();
  initMobileMenu();
  initProgramTabs();
  initFaqAccordion();
  initInquiryForm();
});

/* --------------------------------------------------------------------------
   0. FIVE-WAY BACKGROUND WALLPAPER SWITCHER
   Supports: 'splashes', 'bamboo', 'clouds', 'blocks', 'minimal'
   -------------------------------------------------------------------------- */
function initBackgroundSwitcher() {
  const bgBtns = document.querySelectorAll('.bg-opt-btn');
  const mobileBgBtn = document.getElementById('mobileBgToggleBtn');
  const bgOptions = ['splashes', 'bamboo', 'clouds', 'blocks', 'minimal'];
  const savedBg = localStorage.getItem('lpims-active-bg') || 'splashes';

  applyBackground(savedBg);

  bgBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetBg = btn.getAttribute('data-bg-set');
      applyBackground(targetBg);
      localStorage.setItem('lpims-active-bg', targetBg);
    });
  });

  if (mobileBgBtn) {
    mobileBgBtn.addEventListener('click', () => {
      const currentBg = document.documentElement.getAttribute('data-bg') || 'splashes';
      const currentIndex = bgOptions.indexOf(currentBg);
      const nextIndex = (currentIndex + 1) % bgOptions.length;
      const nextBg = bgOptions[nextIndex];
      applyBackground(nextBg);
      localStorage.setItem('lpims-active-bg', nextBg);
    });
  }

  function applyBackground(bgName) {
    document.documentElement.setAttribute('data-bg', bgName);
    bgBtns.forEach(btn => {
      if (btn.getAttribute('data-bg-set') === bgName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (mobileBgBtn) {
      const icons = { splashes: '🎨', bamboo: '🎋', clouds: '☁️', blocks: '🧩', minimal: '🐾' };
      mobileBgBtn.innerHTML = `<span>${icons[bgName] || '🖼️'}</span>`;
      mobileBgBtn.title = `Current BG: ${bgName} (Tap to cycle)`;
    }
  }
}

/* --------------------------------------------------------------------------
   1. TWO-WAY THEME SWITCHER: Pastel Playground vs. Frosted Glassmorphism
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const switchBtns = document.querySelectorAll('.switch-btn');
  const mobileToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const savedTheme = localStorage.getItem('lpims-active-theme') || 'pastel';

  applyTheme(savedTheme);

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTheme = btn.getAttribute('data-theme-set');
      applyTheme(targetTheme);
      localStorage.setItem('lpims-active-theme', targetTheme);
    });
  });

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'pastel';
      const nextTheme = currentTheme === 'pastel' ? 'glass' : 'pastel';
      applyTheme(nextTheme);
      localStorage.setItem('lpims-active-theme', nextTheme);
    });
  }

  function applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    switchBtns.forEach(btn => {
      if (btn.getAttribute('data-theme-set') === themeName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (mobileToggleBtn) {
      mobileToggleBtn.title = themeName === 'pastel' ? 'Switch to Frosted Glass' : 'Switch to Pastel Playground';
      mobileToggleBtn.innerHTML = themeName === 'pastel' ? '<span>✨</span>' : '<span>🌸</span>';
    }
  }
}

/* --------------------------------------------------------------------------
   2. MOBILE DRAWER MENU
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeDrawerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileBackdrop');
  const navLinks = document.querySelectorAll('.mobile-drawer-link');

  function openMenu() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => link.addEventListener('click', closeMenu));
}

/* --------------------------------------------------------------------------
   3. ACADEMIC PROGRAM TABS (Pre-KG, LKG, UKG, Day Care)
   -------------------------------------------------------------------------- */
function initProgramTabs() {
  const tabBtns = document.querySelectorAll('.program-tab-btn');
  const programCards = document.querySelectorAll('.program-display-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      programCards.forEach(card => {
        if (card.id === targetId) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-card-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-card-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. ADMISSION FORM & WHATSAPP INTEGRATION
   -------------------------------------------------------------------------- */
function initInquiryForm() {
  const form = document.getElementById('kiddyInquiryForm');
  const modal = document.getElementById('inquiryModal');
  const modalClose = document.getElementById('modalClose');
  const modalOk = document.getElementById('modalOk');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const parentName = document.getElementById('kidParentName').value.trim();
    const phone = document.getElementById('kidPhone').value.trim();
    const program = document.getElementById('kidProgram').value;
    const note = document.getElementById('kidNote').value.trim();

    const schoolPhone = '919524657960';
    const message = `*Hello Little Panda School! 🐼*%0A` +
      `Here is our Admission / Campus Tour Inquiry:%0A%0A` +
      `👤 *Parent Name:* ${encodeURIComponent(parentName)}%0A` +
      `📞 *Phone / WhatsApp:* ${encodeURIComponent(phone)}%0A` +
      `🎒 *Program:* ${encodeURIComponent(program)}%0A` +
      (note ? `💭 *Message:* ${encodeURIComponent(note)}%0A` : '') +
      `📍 *Campus:* Kalkandarkottai, Trichy (Opened 2026)`;

    const whatsappUrl = `https://wa.me/${schoolPhone}?text=${message}`;

    if (modal) {
      modal.classList.add('open');
      const whatsappAction = document.getElementById('modalSendWhatsapp');
      if (whatsappAction) {
        whatsappAction.onclick = () => {
          window.open(whatsappUrl, '_blank');
          modal.classList.remove('open');
          form.reset();
        };
      }
    } else {
      window.open(whatsappUrl, '_blank');
      form.reset();
    }
  });

  if (modalClose) modalClose.addEventListener('click', () => modal.classList.remove('open'));
  if (modalOk) modalOk.addEventListener('click', () => modal.classList.remove('open'));
}
