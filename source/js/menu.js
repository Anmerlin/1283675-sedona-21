var navMain = document.querySelector('.main-navigation');
var navToggle = document.querySelector('.main-navigation__toggle');

navMain.classList.remove('main-navigation--nojs');

navToggle.addEventListener('click', function () {
  navMain.classList.toggle('main-navigation--show');
});
