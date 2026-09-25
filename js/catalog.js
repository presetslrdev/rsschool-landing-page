(function () {
  const catalogGrid = document.querySelector('.catalog-grid');
  const tabsContainer = document.querySelector('.category-tabs');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const loadMoreBtn = document.querySelector('.btn-load-more');
  const catalogActions = document.querySelector('.catalog-actions');

  if (!catalogGrid || typeof SERVICES_DATA === 'undefined') {
    return;
  }

  let activeCategory = 'haircuts';
  let isExpanded = false;
  const initialMobileCount = 4;

  function createCardElement(item) {
    const article = document.createElement('article');
    article.className = 'catalog-card';
    article.setAttribute('data-id', item.id);

    const mediaDiv = document.createElement('div');
    mediaDiv.className = 'catalog-card-media';

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;
    img.width = 400;
    img.height = 300;
    img.loading = 'lazy';
    mediaDiv.appendChild(img);

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'catalog-card-body';

    const tagSpan = document.createElement('span');
    tagSpan.className = 'card-tag';
    tagSpan.textContent = item.tag;

    const titleH3 = document.createElement('h3');
    titleH3.className = 'card-title';
    titleH3.textContent = item.title;

    const descP = document.createElement('p');
    descP.className = 'card-desc';
    descP.textContent = item.desc;

    const footerDiv = document.createElement('div');
    footerDiv.className = 'card-footer';

    const metaDiv = document.createElement('div');
    metaDiv.className = 'card-meta';

    const priceSpan = document.createElement('span');
    priceSpan.className = 'card-price';
    priceSpan.textContent = `${item.price} BYN`;

    const durationSpan = document.createElement('span');
    durationSpan.className = 'card-duration';
    durationSpan.textContent = item.duration;

    metaDiv.appendChild(priceSpan);
    metaDiv.appendChild(durationSpan);

    const actionBtn = document.createElement('button');
    actionBtn.type = 'button';
    actionBtn.className = 'btn-card';
    actionBtn.setAttribute('data-id', item.id);
    actionBtn.textContent = 'Записаться';

    footerDiv.appendChild(metaDiv);
    footerDiv.appendChild(actionBtn);

    bodyDiv.appendChild(tagSpan);
    bodyDiv.appendChild(titleH3);
    bodyDiv.appendChild(descP);
    bodyDiv.appendChild(footerDiv);

    article.appendChild(mediaDiv);
    article.appendChild(bodyDiv);

    return article;
  }

  function renderCatalog() {
    const items = SERVICES_DATA[activeCategory] || [];
    const isMobile = window.innerWidth <= 768;
    const itemsToDisplay = isMobile && !isExpanded ? items.slice(0, initialMobileCount) : items;

    catalogGrid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < itemsToDisplay.length; i += 1) {
      fragment.appendChild(createCardElement(itemsToDisplay[i]));
    }

    catalogGrid.appendChild(fragment);

    if (catalogActions) {
      if (isMobile && !isExpanded && items.length > initialMobileCount) {
        catalogActions.style.display = 'flex';
      } else {
        catalogActions.style.display = 'none';
      }
    }
  }

  if (tabsContainer) {
    tabsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) {
        return;
      }

      const targetCategory = btn.dataset.category;
      if (!targetCategory || targetCategory === activeCategory) {
        return;
      }

      for (let i = 0; i < tabButtons.length; i += 1) {
        tabButtons[i].classList.remove('active');
      }
      btn.classList.add('active');

      activeCategory = targetCategory;
      isExpanded = false;
      renderCatalog();
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      const items = SERVICES_DATA[activeCategory] || [];
      const currentDisplayed = catalogGrid.children.length;
      const remainingItems = items.slice(currentDisplayed);

      if (remainingItems.length > 0) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < remainingItems.length; i += 1) {
          fragment.appendChild(createCardElement(remainingItems[i]));
        }
        catalogGrid.appendChild(fragment);
      }

      isExpanded = true;
      if (catalogActions) {
        catalogActions.style.display = 'none';
      }
    });
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(() => {
      renderCatalog();
    }, 150);
  });

  renderCatalog();
})();
