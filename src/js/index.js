const menuBtn = document.querySelector('.header__btn')
const menu = document.querySelector('.main-nav')

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('header__btn--active')
  menu.classList.toggle('main-nav--open')
})