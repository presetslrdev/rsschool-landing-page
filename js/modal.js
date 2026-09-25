(function () {
  const modalBackdrop = document.getElementById('service-modal');
  const catalogGrid = document.querySelector('.catalog-grid');
  if (!modalBackdrop || !catalogGrid || typeof SERVICES_DATA === 'undefined') {
    return;
  }

  const modalContainer = modalBackdrop.querySelector('.modal-container');
  const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
  const modalImage = document.getElementById('modal-image');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const barberOptionsContainer = document.getElementById('modal-barber-options');
  const careOptionsContainer = document.getElementById('modal-care-options');
  const totalPriceElement = document.getElementById('modal-total-price');
  const submitBtn = document.getElementById('modal-submit-btn');

  const servicesById = {};
  for (const category in SERVICES_DATA) {
    const items = SERVICES_DATA[category];
    for (let i = 0; i < items.length; i += 1) {
      servicesById[items[i].id] = items[i];
    }
  }

  let currentService = null;
  let selectedBarberIndex = 0;
  let selectedCareIndex = 0;

  function updatePrice() {
    if (!currentService) {
      return;
    }
    const base = currentService.price;
    const barberExtra = currentService.options.barber[selectedBarberIndex].extra;
    const careExtra = currentService.options.care[selectedCareIndex].extra;
    const total = base + barberExtra + careExtra;
    totalPriceElement.textContent = `${total} BYN`;
  }

  function renderOptions(container, optionsList, activeIndex, groupName) {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < optionsList.length; i += 1) {
      const opt = optionsList[i];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `modal-option-btn${i === activeIndex ? ' active' : ''}`;
      btn.setAttribute('data-index', String(i));
      btn.setAttribute('data-group', groupName);
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', i === activeIndex ? 'true' : 'false');

      const extraText = opt.extra > 0 ? ` (+${opt.extra} BYN)` : '';
      btn.textContent = `${opt.name}${extraText}`;

      fragment.appendChild(btn);
    }

    container.appendChild(fragment);
  }

  function renderModalData() {
    if (!currentService) {
      return;
    }

    modalImage.src = currentService.image;
    modalImage.alt = currentService.title;
    modalTag.textContent = currentService.tag;
    modalTitle.textContent = currentService.title;
    modalDesc.textContent = currentService.details;

    renderOptions(barberOptionsContainer, currentService.options.barber, selectedBarberIndex, 'barber');
    renderOptions(careOptionsContainer, currentService.options.care, selectedCareIndex, 'care');
    updatePrice();
  }

  function openModal(serviceId) {
    const service = servicesById[serviceId];
    if (!service) {
      return;
    }

    currentService = service;
    selectedBarberIndex = 0;
    selectedCareIndex = 0;
    renderModalData();

    modalBackdrop.classList.add('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');

    if (closeBtn) {
      closeBtn.focus();
    }
  }

  function closeModal() {
    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
    currentService = null;
  }

  catalogGrid.addEventListener('click', (e) => {
    const card = e.target.closest('[data-id]');
    if (!card) {
      return;
    }
    const serviceId = card.getAttribute('data-id');
    if (!serviceId) {
      return;
    }
    openModal(serviceId);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  if (barberOptionsContainer) {
    barberOptionsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.modal-option-btn');
      if (!btn) {
        return;
      }
      const idx = Number(btn.getAttribute('data-index'));
      if (Number.isNaN(idx) || idx === selectedBarberIndex) {
        return;
      }

      const buttons = barberOptionsContainer.querySelectorAll('.modal-option-btn');
      for (let i = 0; i < buttons.length; i += 1) {
        buttons[i].classList.remove('active');
        buttons[i].setAttribute('aria-checked', 'false');
      }
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');

      selectedBarberIndex = idx;
      updatePrice();
    });
  }

  if (careOptionsContainer) {
    careOptionsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.modal-option-btn');
      if (!btn) {
        return;
      }
      const idx = Number(btn.getAttribute('data-index'));
      if (Number.isNaN(idx) || idx === selectedCareIndex) {
        return;
      }

      const buttons = careOptionsContainer.querySelectorAll('.modal-option-btn');
      for (let i = 0; i < buttons.length; i += 1) {
        buttons[i].classList.remove('active');
        buttons[i].setAttribute('aria-checked', 'false');
      }
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');

      selectedCareIndex = idx;
      updatePrice();
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      if (!currentService) {
        return;
      }
      const barberName = currentService.options.barber[selectedBarberIndex].name;
      const careName = currentService.options.care[selectedCareIndex].name;
      const total = totalPriceElement.textContent;
      alert(`Вы успешно записаны на услугу "${currentService.title}"!\nМастер: ${barberName}\nДоп. уход: ${careName}\nСтоимость: ${total}\nЖдём вас в EVAL Barbershop (Минск, ул. Жореса Алферова, 7)!`);
      closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
      closeModal();
    }
  });
})();
