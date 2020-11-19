$('.second-carousel').slick({
  slidesToShow: 5,
  infinite: true,
  slidesToScroll: 1,
  prevArrow: '#pBtn',
  nextArrow: '#nBtn',
});
$('.brand-slider').slick({
  slidesToShow: 6,
  infinite: true,
  slidesToScroll: 1,
  prevArrow: '#pBtn',
  nextArrow: '#nBtn',
});
$('.third-carousel').slick({
  slidesToShow: 4,
  infinite: true,
  slidesToScroll: 1,
  prevArrow: '#p1Btn',
  nextArrow: '#n1Btn',
});
$('.slider-info-img').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  asNavFor: '.slider-info-img',
  focusOnSelect: true,
  arrows: false,
});

//define
const lstType = ['Chair', 'Table', 'Decor', 'Bed'];
//open popup
const login_btn = document.querySelector('#login-btn');
const close_btn = document.querySelector('#close-login-btn');
const login_popup = document.querySelector('.login-popup');
const login_form = document.querySelector('.login-form');
if (login_btn) {
  login_btn.addEventListener('click', () => {
    login_popup.style.display = 'block';
    login_form.classList.remove('hide');
    login_form.classList.add('show');
  })
}
//close popup
if (close_btn) {
  close_btn.addEventListener('click', () => {
    login_popup.classList.remove('show');
    login_form.classList.add('hide');
  })
}
if (login_form) {
  login_form.addEventListener('animationend', () => {
    if (login_form.classList.contains('hide')) {
      login_form.classList.remove('hide');
      login_popup.style.display = 'none';
    }
  })
}

var lst_product = document.querySelectorAll('.product-data');
if (lst_product.length > 0) { 
  const edit_popup = document.querySelector('.edit-product-popup');
  const edit_form = document.querySelector('.edit-product-form');
  const edit_form_name = edit_form.querySelector('#pename');
  const edit_form_img = edit_form.querySelector('.edit-form-image img');
  const edit_form_price = edit_form.querySelector('#peprice');
  const edit_form_number = edit_form.querySelector('#penumber');
  const close_edit_btn = document.querySelector('#close-edit-btn');
  close_edit_btn.addEventListener('click', () => {
    edit_form.classList.remove('show');
    edit_form.classList.add('hide');
  })
  for (let i = 0; i < lst_product.length; i++) {
    let pdata = lst_product[i];
    let typeid = pdata.querySelector('.pinfotype').textContent;
    let typename = lstType[parseInt(typeid) - 1];
    pdata.querySelector('.pinfotype').textContent = typename;
    pdata.querySelector('.btn-edit').addEventListener('click', () => {
      edit_popup.style.display = 'block';
      edit_form.classList.add('show');
      edit_form_name.value = pdata.querySelector('.pinfoname').textContent;
      edit_form_price.value = pdata.querySelector('.pinfoprice').textContent;
      edit_form_number.value = pdata.getAttribute('number');
      edit_form_img.src = pdata.getAttribute('link');
      edit_form.querySelector(`#petype${typename.toLowerCase()}`).checked = true;
    })
  }
  edit_form.addEventListener('animationend', () => {
    if (edit_form.classList.contains('hide')) {
      edit_form.classList.remove('hide');
      edit_popup.style.display = 'none';
    }
  })
}

