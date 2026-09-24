(function () {
  const burgerBtn = document.querySelector('.burger-btn');
  const nav = document.querySelector('.nav');
  const overlay = document.querySelector('.menu-overlay');
  if (!burgerBtn || !nav) {
    return;
  }

  function openMenu() {
    burgerBtn.classList.add('active');
    burgerBtn.setAttribute('aria-expanded', 'true');
    nav.classList.add('is-open');
    if (overlay) {
      overlay.classList.add('is-active');
    }
    document.documentElement.classList.add('menu-open');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burgerBtn.classList.remove('active');
    burgerBtn.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    if (overlay) {
      overlay.classList.remove('is-active');
    }
    document.documentElement.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = nav.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  burgerBtn.addEventListener('click', toggleMenu);

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  const navLinks = nav.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('is-open')) {
      closeMenu();
    }
  });
})();
