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
    console.log('header');
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

// function that launches all scripts according to the current page and screen size
function checkDeviceWidth() {
  const tabletWidth = window.matchMedia('(min-width: 768px)');
  const desktopWidth = window.matchMedia('(min-width: 1200px)');
  const currentPage = document.querySelector('.page-header');

  removeNoJsFallback();

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
