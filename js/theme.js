(function () {
  const STORAGE_KEY = 'eval_barbershop_theme';
  const EASTER_EGG_STORAGE_KEY = 'eval_barbershop_easter_egg';

  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';

  const EASTER_EGG_DARK = '🌑';
  const EASTER_EGG_LIGHT = '🌕';

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === THEME_DARK || saved === THEME_LIGHT) {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? THEME_LIGHT
      : THEME_DARK;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    const icon = theme === THEME_LIGHT
      ? EASTER_EGG_LIGHT
      : EASTER_EGG_DARK;

    localStorage.setItem(EASTER_EGG_STORAGE_KEY, icon);

    const toggleBtns = document.querySelectorAll('.theme-toggle');
    toggleBtns.forEach((btn) => {
      const isLight = theme === THEME_LIGHT;
      btn.setAttribute('aria-label', isLight ? 'Включить тёмную тему' : 'Включить светлую тему');
      btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
      btn.classList.toggle('is-light', isLight);
    });
  }

  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(localStorage.getItem(STORAGE_KEY) || currentTheme);

    const toggleBtns = document.querySelectorAll('.theme-toggle');
    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme') || THEME_DARK;
        const newTheme = activeTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
        applyTheme(newTheme);
      });
    });
  });
})();

