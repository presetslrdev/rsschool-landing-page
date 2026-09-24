(function () {
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide-card');
  const dotsContainer = document.querySelector('.slider-dots');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');

  if (!track || slides.length === 0) {
    return;
  }

  const totalSlides = slides.length;
  let currentIndex = 0;
  let isAnimating = false;
  const animationDuration = 450;

  function updateSlider(nextIndex) {
    if (isAnimating || nextIndex === currentIndex) {
      return;
    }
    isAnimating = true;

    const previousIndex = currentIndex;
    currentIndex = nextIndex;

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    if (dots.length > 0) {
      dots[previousIndex].classList.remove('active');
      dots[previousIndex].removeAttribute('aria-current');
      dots[currentIndex].classList.add('active');
      dots[currentIndex].setAttribute('aria-current', 'true');
    }

    setTimeout(() => {
      isAnimating = false;
    }, animationDuration);
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % totalSlides;
    updateSlider(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider(prevIndex);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.slider-dot');
      if (!dot) {
        return;
      }
      const targetIndex = Number(dot.dataset.index);
      if (!Number.isNaN(targetIndex) && targetIndex >= 0 && targetIndex < totalSlides) {
        updateSlider(targetIndex);
      }
    });
  }

  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 40;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) >= swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }, { passive: true });
})();
