//*
//* -----------Functions-------------
//*

function removeNoJsFallback() {
  document.querySelector('.main-nav').classList.remove('main-nav--no-js');
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
}

// function that launches all scripts according to the current page and screen size
function checkDeviceWidth() {
  removeNoJsFallback();

  const tabletWidth = window.matchMedia('(min-width: 768px)');
  const desktopWidth = window.matchMedia('(min-width: 1400px)');
  const currentPage = document.querySelector('.page-header');

  if (desktopWidth.matches) {
    switch (currentPage.id) {
      case 'js-indexPage':
        break;
      case 'js-catalogPage':
        break;
      case 'js-formPage':
        break;
    }
  } else if (tabletWidth.matches) {
    switch (currentPage.id) {
      case 'js-indexPage':
        break;
      case 'js-catalogPage':
        break;
      case 'js-formPage':
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
        break;
      case 'js-formPage':
        break;
    }
  }
}

//*
//* -----------Function calls-------------
//*

checkDeviceWidth();
