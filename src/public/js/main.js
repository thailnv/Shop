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
//remove localStorage when close tab
window.onbeforeunload = function (e) {
  window.localStorage.unloadTime = JSON.stringify(new Date());
};
window.onload = function () {
  let loadTime = new Date();
  let unloadTime = new Date(JSON.parse(window.localStorage.unloadTime));
  let refreshTime = loadTime.getTime() - unloadTime.getTime();
  if (refreshTime > 3000)//3000 milliseconds
  {
    console.log('remove localStg');
    window.localStorage.removeItem('cart_info');
  }
  calcNItem();
};
//hide cart at admin page
if(window.location.href === 'http://localhost:3000/admin'){
  document.querySelector('.cart').style.display = 'none';
  document.querySelector('.nav-header').style.display = 'none';
  document.querySelector('.nav-header-space').style.display = 'none';
  document.querySelector('.footer').style.display = 'none';
  document.querySelector('.pre-footer').style.display = 'none';
}
else{
  document.querySelector('.setting').style.display = 'none';
}


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
function calcTotalPrice(){
  var total_price = 0;
  let cart_info = JSON.parse(localStorage.getItem('cart_info'));
  for (let i = 0; i < cart_info.length; i++) {
    total_price += cart_info[i].num * cart_info[i].price;
  }
  document.querySelector('.cart-total').innerHTML = `
  <div class="total-txt">Total</div>
  <div class="total-price">$${total_price}</div>
  `
}
function createCart() {
  if (localStorage.getItem('cart_info') !== null) {
    document.querySelector('.cart-item').innerHTML = '';
    let cart_info = JSON.parse(localStorage.getItem('cart_info'));
    for (let i = 0; i < cart_info.length; i++) {
      document.querySelector('.cart-item').innerHTML += `
      <div class="item">
        <div class="item-img">
          <img src="${cart_info[i].img}" alt="">
        </div>
        <div class="item-info">
          <div class="item-name-price">
            <div class="item-name">${cart_info[i].name}r</div>
            <div class="item-price">$${cart_info[i].price}</div>
          </div>
          <input type="number" class="item-quantity" name="" min="0" value="${cart_info[i].num}" id="">
          <button id="remove-item-btn">
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
      `
    }
    calcTotalPrice();
  }
}
const cart_popup = document.querySelector('.cart-popup');
const cart_form = document.querySelector('.cart-form');
const cart_btn = document.querySelector('#cart-btn-2');
cart_btn.addEventListener('click', () => {
  createCart();
  cart_popup.style.display = 'block';
  cart_form.classList.add('cart-show');
  cart_form.classList.remove('cart-hide');
});
window.onclick = (e) => {
  if (e.target == cart_popup) {
    cart_form.classList.add('cart-hide');
    cart_form.classList.remove('cart-show');
  }
};
cart_form.addEventListener('animationend', () => {
  if (cart_form.classList.contains('cart-hide')) {
    cart_popup.style.display = 'none';
  }
});

//cart
localStorage.setItem('nCartItem', '0');
function calcNItem(){
 // console.log('haha');
  if(localStorage.getItem('cart_info') !== null){
    cart_info = JSON.parse(localStorage.getItem('cart_info'));
    document.querySelector('.cart-nitem').textContent = cart_info.length;
  return
  }
  else{
    document.querySelector('.cart-nitem').textContent = 0;
  }
};
calcNItem();
const lst_products = document.querySelectorAll('.product-card');
for (let i = 0; i < lst_products.length; i++) {
  let product_card = lst_products[i];
  product_card.querySelector('.btn-addcart').addEventListener('click', () => {
    let product_name = product_card.querySelector('.product-name').textContent.trim();
    let product_img = product_card.querySelector('.product-img img').src.replace('http://localhost:3000', '');
    let product_price = product_card.querySelector('.product-price').textContent.replace('$', '').trim();
    let cart_info = [];
    if (localStorage.getItem('cart_info') === null) {
      let product_info = {
        name: product_name,
        price: parseInt(product_price),
        img: product_img,
        num: 1,
      }
      cart_info.push(product_info);
      localStorage.setItem('cart_info', JSON.stringify(cart_info));
    }
    else {
      cart_info = JSON.parse(localStorage.getItem('cart_info'));
      let product_info = {
        name: product_name,
        price: parseInt(product_price),
        img: product_img,
        num: 1,
      }
      let j = 0;
      for (j = 0; j < cart_info.length; j++) {
        if (cart_info[j].name == product_name) {
          cart_info[j].num++;
          break;
        }
      }
      if (j == cart_info.length)
        cart_info.push(product_info);
      localStorage.setItem('cart_info', JSON.stringify(cart_info));
    }
    document.querySelector('.cart-nitem').textContent = cart_info.length;
    console.log(JSON.parse(localStorage.getItem('cart_info')));
  })
};

