//*
//* -----------Functions-------------
//*

function removeNoJsFallback() {
  document.querySelector('.main-nav').classList.remove('main-nav--no-js');
  document.querySelector('.page-header').classList.remove('page-header--no-js');
}

function removeLogoLinksMobileVersion() {
  document
    .querySelector('.page-header__logo-link-mobile-only')
    .removeAttribute('href');
  document.querySelector('.page-header__logo-link').removeAttribute('href');
}

function navMenuOpenClose() {
  const navMenu = document.querySelector('.main-nav');
  const pageHeader = document.querySelector('.page-header');
  const hamburgerIcon = document.querySelector('.page-header__hamburger > use');

  pageHeader.addEventListener('click', (evt) => {
    if (navMenu.classList.contains('main-nav--closed')) {
      navMenu.classList.remove('main-nav--closed');
      navMenu.classList.add('main-nav--opened');
      hamburgerIcon.setAttribute(
        'href',
        'img/sprite/sprite.svg#hamburger_close'
      );
    } else {
      navMenu.classList.add('main-nav--closed');
      navMenu.classList.remove('main-nav--opened');
      hamburgerIcon.setAttribute(
        'href',
        'img/sprite/sprite.svg#hamburger_open'
      );
    }
  });
}

function imgCompareButtons() {
  const btnBefore = document.querySelector('.comparison__button--before');
  const btnAfter = document.querySelector('.comparison__button--after');
  const imgBefore = document.querySelector('.comparison__img--before');
  const imgAfter = document.querySelector('.comparison__img--after');
  const images = document.querySelectorAll('.comparison__img');
  const slider = document.querySelector('.comparison__slider-background');

  function switchToImgAfter() {
    imgBefore.classList.add('visually-hidden');
    imgAfter.classList.remove('visually-hidden');
    btnAfter.classList.add('comparison__button-indicator-after');
    btnBefore.classList.remove('comparison__button-indicator-before');
  }

  function switchToImgBefore() {
    imgBefore.classList.remove('visually-hidden');
    imgAfter.classList.add('visually-hidden');
    btnAfter.classList.remove('comparison__button-indicator-after');
    btnBefore.classList.add('comparison__button-indicator-before');
  }

  btnBefore.addEventListener('click', switchToImgBefore);
  btnAfter.addEventListener('click', switchToImgAfter);
  images.forEach((image) =>
    image.addEventListener('click', (evt) => {
      if (btnBefore.classList.contains('comparison__button-indicator-before'))
        switchToImgAfter();
      else if (
        btnAfter.classList.contains('comparison__button-indicator-after')
      )
        switchToImgBefore();
    })
  );
  slider.addEventListener('click', (evt) => {
    // switch images if the slider itself is clicked
    if (evt.offsetX >= 42) switchToImgAfter();
    else switchToImgBefore();
  });
}

function catalogExpandCollapse() {
  const expandButton = document.querySelector('.catalog__expand-button');
  const catalogItems = document.querySelectorAll('.catalog__item ');
  const hiddenCatalogItems = document.querySelectorAll(
    '.catalog__item--hidden'
  );
  let itemsHidden = true;
  let lastItemPositon = 0;

  // get the Y position of the last non-hidden item
  catalogItems.forEach((item) => {
    if (
      !item.classList.contains('catalog__item--hidden') &&
      !item.classList.contains('catalog__item--expand')
    ) {
      lastItemPositon = item.offsetTop;
    }
  });

  expandButton.addEventListener('click', expandCollapse);

  function expandCollapse() {
    if (itemsHidden) {
      hiddenCatalogItems.forEach((item) => {
        item.style.display = 'grid';
      });

      window.scrollTo({
        top: lastItemPositon - 160,
        behavior: 'smooth',
      });

      expandButton.querySelector('.catalog__expand-heading').innerText =
        'Скрыть 100500 товаров';
      expandButton.querySelector('.catalog__expand-text').innerText =
        'Теперь я знаю что вкусов гораздо больше!';
      expandButton.querySelector('.catalog__btn-expand').innerText =
        'Скрыть товары';

      itemsHidden = false;
    } else {
      hiddenCatalogItems.forEach((item) => {
        item.style.display = 'none';
      });

      expandButton.scrollIntoView({ behavior: 'smooth', block: 'start' });

      expandButton.querySelector('.catalog__expand-heading').innerText =
        'Показать ещё 100500 товаров';
      expandButton.querySelector('.catalog__expand-text').innerText =
        'На самом деле вкусов гораздо больше!';
      expandButton.querySelector('.catalog__btn-expand').innerText =
        'Показать все';

      itemsHidden = true;
    }
  }
}

function catalogShowAmountOfItems(itemsToShow) {
  const hiddenCatalogItems = document.querySelectorAll(
    '.catalog__item--hidden'
  );
  const catalogItemsAmount =
    document.querySelectorAll('.catalog__item').length - 1; // -1 because last catalog__item is an "expand all" button, we don't count it as an actual catalog item
  const itemsShown = catalogItemsAmount - hiddenCatalogItems.length;

  if (itemsToShow > itemsShown) {
    const numberOfItemstoShow = itemsToShow - itemsShown;
    for (let i = 0; i < numberOfItemstoShow; i++) {
      hiddenCatalogItems[i].classList.remove('catalog__item--hidden');
    }
  }
}

function scrollMenuToggle() {
  const header = document.querySelector('.page-header');
  let lastScrollPosition = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // if we are at the top of the page: remove page-header--scroll-up class
    if (currentScroll <= 0) {
      header.classList.remove('page-header--scroll-up');
      return;
    }

    // add page-header--scroll-down class if we scroll down
    if (
      currentScroll > lastScrollPosition &&
      !header.classList.contains('page-header--scroll-down')
    ) {
      header.classList.remove('page-header--scroll-up');
      header.classList.add('page-header--scroll-down');
    }
    // addpage-header--scroll-up if we scroll up
    else if (
      currentScroll < lastScrollPosition &&
      header.classList.contains('page-header--scroll-down')
    ) {
      header.classList.remove('page-header--scroll-down');
      header.classList.add('page-header--scroll-up');
    }

    // update the last scroll position
    lastScrollPosition = currentScroll;
  });
}

function formSubmit() {
  const form = document.querySelector('form');
  const requiredItems = document.querySelectorAll('[required]');
  const submitBtn = document.querySelector('.program__submit-button');

  // remove error class if the input value is inputed by user
  requiredItems.forEach((item) =>
    item.addEventListener('input', (evt) => {
      if (item.classList.contains('program__text-input--error'))
        item.classList.remove('program__text-input--error');
    })
  );

  // try to submit the form, if not all of the required inputs are filled don't submit the form and tell user to fill them
  submitBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    let allRequiredInputsFilled = true;

    requiredItems.forEach((item) => {
      if (!item.validity.valid) {
        item.scrollIntoView({ behavior: 'smooth', block: 'end' });
        item.classList.add('program__text-input--error');
        allRequiredInputsFilled = false;
      }
    });

    if (allRequiredInputsFilled) {
      form.submit();
      submitBtn.disabled = true;
    }
  });
}

// function that launches all scripts according to the current page and screen size
function checkDeviceWidth() {
  const tabletWidth = window.matchMedia('(min-width: 768px)');
  const desktopWidth = window.matchMedia('(min-width: 1400px)');
  const currentPage = document.querySelector('.page-header');

  if (desktopWidth.matches) {
    switch (currentPage.id) {
      case 'js-indexPage':
        imgCompareButtons();
        break;

      case 'js-catalogPage':
        catalogShowAmountOfItems(7);
        catalogExpandCollapse();
        break;

      case 'js-formPage':
        formSubmit();
        break;
    }
  } else if (tabletWidth.matches) {
    switch (currentPage.id) {
      case 'js-indexPage':
        imgCompareButtons();
        break;

      case 'js-catalogPage':
        catalogShowAmountOfItems(5);
        catalogExpandCollapse();
        break;

      case 'js-formPage':
        formSubmit();
        break;
    }
  } else {
    removeLogoLinksMobileVersion();
    navMenuOpenClose();

    switch (currentPage.id) {
      case 'js-indexPage':
        imgCompareButtons();
        break;

      case 'js-catalogPage':
        catalogExpandCollapse();
        break;

      case 'js-formPage':
        formSubmit();
        break;
    }
  }
}

//*
//* -----------Function calls-------------
//*

removeNoJsFallback();
scrollMenuToggle();
checkDeviceWidth();
