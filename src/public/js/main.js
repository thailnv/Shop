
//slick slider
$('.second-carousel').slick({
  slidesToShow: 5,
  infinite: true,
  slidesToScroll: 1,
  prevArrow: '#pBtn',
  nextArrow: '#nBtn',
})

$('.brand-slider').slick({
  slidesToShow: 6,
  infinite: true,
  slidesToScroll: 1,
  prevArrow: '#pBtn',
  nextArrow: '#nBtn',
})

$('.third-carousel').slick({
  slidesToShow: 4,
  infinite: true,
  slidesToScroll: 1,
  prevArrow: '#p1Btn',
  nextArrow: '#n1Btn',
})

$('.slider-info-img').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.slider-nav'
})

$('.slider-nav').slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  asNavFor: '.slider-info-img',
  focusOnSelect: true,
  arrows: false,
})

//function & base define
const lstType = ['Chair', 'Table', 'Decor', 'Bed'];

function prepareAdmin() {
  document.querySelector('.cart').style.display = 'none';
  document.querySelector('.nav-header').style.display = 'none';
  document.querySelector('.nav-header-space').style.display = 'none';
  document.querySelector('.footer').style.display = 'none';
  document.querySelector('.pre-footer').style.display = 'none';
  document.querySelector('.setting').style.display = 'block';
}

function calcCartItem() {
  if (localStorage.getItem('cart_info') !== null) {
    cart_info = JSON.parse(localStorage.getItem('cart_info'));
    document.querySelector('.cart-nitem').textContent = cart_info.length;
    return
  }
  else {
    document.querySelector('.cart-nitem').textContent = 0;
  }
}

function calcTotalPrice() {
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

function createCartItem(name, img, price, num) {
  document.querySelector('.cart-item').innerHTML += `
  <div class="item">
    <div class="item-img">
      <img src="${img}" alt="">
    </div>
    <div class="item-info">
      <div class="item-name-price">
        <div class="item-name">${name}</div>
        <div class="item-price">$${price}</div>
      </div>
      <input type="number" class="item-quantity" name="" min="0" value="${num}" id="">
      <button class="remove-item-btn">
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
  </div>
  `
}

function createCart() {
  if (localStorage.getItem('cart_info') !== null) {
    document.querySelector('.cart-item').innerHTML = '';
    let cart_info = JSON.parse(localStorage.getItem('cart_info'));
    for (let i = 0; i < cart_info.length; i++) {
      createCartItem(cart_info[i].name, cart_info[i].img, cart_info[i].price, cart_info[i].num);
    }
    calcTotalPrice();
  }
}

function manageProduct() {
  let lst_product = document.querySelectorAll('.product-data');
  let edit_popup = document.querySelector('.edit-product-popup');
  let edit_form = document.querySelector('.edit-product-form');
  let edit_form_name = edit_form.querySelector('#pename');
  let edit_form_img = edit_form.querySelector('.edit-form-image img');
  let edit_form_price = edit_form.querySelector('#peprice');
  let edit_form_number = edit_form.querySelector('#penumber');
  let close_edit_btn = edit_popup.querySelector('.close-edit-btn');
  for (let i = 0; i < lst_product.length; i++) {
    let product = lst_product[i];
    let typeid = product.querySelector('.pinfotype').textContent;
    let typename = lstType[parseInt(typeid) - 1];
    product.querySelector('.pinfotype').textContent = typename;
    product.querySelector('.btn-edit').addEventListener('click', () => {
      edit_popup.style.display = 'block';
      edit_form.classList.add('show');
      edit_form_name.value = product.querySelector('.pinfoname').textContent;
      edit_form_price.value = product.querySelector('.pinfoprice').textContent;
      edit_form_number.value = product.getAttribute('number');
      edit_form_img.src = product.getAttribute('link');
      edit_form.querySelector(`#petype${typename.toLowerCase()}`).checked = true;
    })
  }
  close_edit_btn.addEventListener('click', () => {
    edit_form.classList.remove('show');
    edit_form.classList.add('hide');
  });
  edit_form.addEventListener('animationend', () => {
    if (edit_form.classList.contains('hide')) {
      edit_form.classList.remove('hide');
      edit_popup.style.display = 'none';
    }
  })
}

function manageSupplier() {
  let lst_supplier = document.querySelectorAll('.supplier-data');
  let edit_popup = document.querySelector('.edit-supplier-popup');
  let edit_form = document.querySelector('.edit-supplier-form');
  let edit_form_img = edit_form.querySelector('.edit-form-image img');
  let edit_form_name = edit_form.querySelector('#sename');
  let edit_form_address = edit_form.querySelector('#seaddress');
  let edit_form_pnumber = edit_form.querySelector('#sepnumber');
  let close_edit_btn = edit_popup.querySelector('.close-edit-btn');
  for (let i = 0; i < lst_supplier.length; i++) {
    let supplier = lst_supplier[i];
    supplier.querySelector('.btn-edit').addEventListener('click', () => {
      edit_popup.style.display = 'block';
      edit_form.classList.add('show');
      edit_form_name.value = supplier.querySelector('.sinfoname').textContent;
      edit_form_address.value = supplier.querySelector('.sinfoaddress').textContent;
      edit_form_pnumber.value = supplier.querySelector('.sinfopnumber').textContent;
      edit_form_img.src = supplier.getAttribute('link');
    })
  }
  close_edit_btn.addEventListener('click', () => {
    edit_form.classList.remove('show');
    edit_form.classList.add('hide');
  });
  edit_form.addEventListener('animationend', () => {
    if (edit_form.classList.contains('hide')) {
      edit_form.classList.remove('hide');
      edit_popup.style.display = 'none';
    }
  })
}

function createLoginFunction() {
  let login_btn = document.querySelector('#login-btn');
  let close_btn = document.querySelector('#close-login-btn');
  let login_popup = document.querySelector('.login-popup');
  let login_form = document.querySelector('.login-form');
  login_btn.addEventListener('click', () => {
    login_popup.style.display = 'block';
    login_form.classList.remove('hide');
    login_form.classList.add('show');
  })
  close_btn.addEventListener('click', () => {
    login_popup.classList.remove('show');
    login_form.classList.add('hide');
  })
  login_form.addEventListener('animationend', () => {
    if (login_form.classList.contains('hide')) {
      login_form.classList.remove('hide');
      login_popup.style.display = 'none';
    }
  })
}

function createCartItemFunction(){
  let lstItemQuantity = document.querySelectorAll('.item .item-info .item-quantity');
  for(let i = 0 ; i < lstItemQuantity.length ; i++){
    lstItemQuantity[i].addEventListener('input', ()=>{
      let cart_info = JSON.parse(localStorage.getItem('cart_info'));
      for (let j = 0; j < cart_info.length; j++) {
        if(cart_info[j].name === lstItemQuantity[i].parentElement.querySelector('.item-name').textContent){
          cart_info[j].num = lstItemQuantity[i].value;
          if(cart_info[j].num == 0){
            lstItemQuantity[i].parentElement.parentElement.remove();
            cart_info.splice(j, 1);
          }
          localStorage.setItem('cart_info', JSON.stringify(cart_info));
        }
      }
      calcTotalPrice();
      calcCartItem();
    })
  }
}

function createCartFunction() {
  let cart_popup = document.querySelector('.cart-popup');
  let cart_form = document.querySelector('.cart-form');
  let cart_btn = document.querySelector('#cart-btn-2');
  let cart_action = document.querySelector('.cart-action');
  let checkout_btn = cart_form.querySelector('#checkout-btn');
  cart_btn.addEventListener('click', () => {
    createCart();
    createCartItemFunction();
    cart_popup.style.display = 'block';
    cart_action.classList.remove('cart-hide-item');
    cart_action.classList.add('cart-show-item');
  })
  checkout_btn.onclick = ()=>{
    cart_action.classList.remove('cart-show-item');
    cart_action.classList.add('cart-show-checkout');
    document.querySelector('.checkout-form .provisional-cost').textContent =
     cart_form.querySelector('.cart-total .total-price').textContent;
  }
  window.onclick = (e) => {
    if (e.target == cart_popup) {
      if(cart_action.classList.contains('cart-show-item')){
        cart_action.classList.remove('cart-show-item');
        cart_action.classList.add('cart-hide-item');
      }
      else if(cart_action.classList.contains('cart-show-checkout')){
        cart_action.classList.remove('cart-show-checkout');
        cart_action.classList.add('cart-hide-checkout');
      }
    }
  }
  cart_action.addEventListener('animationend', ()=>{
    if(cart_action.classList.contains('cart-show-item')){
      cart_action.classList.add('cart-action-item');
    }
    if(cart_action.classList.contains('cart-show-checkout')){
      cart_action.classList.remove('cart-action-item');
      cart_action.classList.add('cart-action-checkout');
    }
    if(cart_action.classList.contains('cart-hide-item')){
      cart_action.classList.remove('cart-action-item');
      cart_popup.style.display = 'none';
    }
    if(cart_action.classList.contains('cart-hide-checkout')){
      cart_action.classList.remove('cart-action-checkout');
      cart_action.classList.remove('cart-hide-checkout');
      cart_popup.style.display = 'none';
    }
  })
}

function createProductFunction() {
  let lst_products = document.querySelectorAll('.product-card');
  for (let i = 0; i < lst_products.length; i++) {
    let product = lst_products[i];
    product.querySelector('.btn-addcart').addEventListener('click', () => {
      let product_name = product.querySelector('.product-name').textContent.trim();
      let product_img = product.querySelector('.product-img img').src.replace('http://localhost:3000', '');
      let product_price = product.querySelector('.product-price').textContent.replace('$', '').trim();
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
    })
  }
}

function createProduct(){
  let submit = document.querySelector('#product-submit');
  submit.onclick = function () {
    let product = document.querySelector('.add-product-form');
    let name = product.querySelector('#pname').value;
    let type = product.querySelector('input[name = "type"]').value;
    let price = product.querySelector('#price').value;
    let number = product.querySelector('#number').value;
    let supplier = product.querySelector('#supplier').value;
    let image = product.querySelector('#image').value.replace('C:\\fakepath\\','');
    let product2Insert = {
      name, 
      type,
      price,
      supplier,
      image,
      number
    }
      console.log(product2Insert);
      fetch('/admin', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },      
        body: JSON.stringify(product2Insert),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.status);
        if(data.status == 'success'){
          window.alert("Create new product successfully!");
          window.location = 'http://localhost:3000/admin';
        }
      })
  }
}
//remove localStorage when close tab
window.onbeforeunload = function (e) {
  window.localStorage.unloadTime = JSON.stringify(new Date());
}

window.onload = function () {
  let loadTime = new Date();
  let unloadTime = new Date(JSON.parse(window.localStorage.unloadTime));
  let refreshTime = loadTime.getTime() - unloadTime.getTime();
  if (refreshTime > 3000)//3000 milliseconds
  {
    console.log('remove localStg');
    window.localStorage.removeItem('cart_info');
  }
  calcCartItem();
}

//admin function - normal function
if (window.location.href === 'http://localhost:3000/admin') {
  prepareAdmin();
  manageProduct();
  manageSupplier();
  createProduct();
}
else {
  document.querySelector('.cart').style.display = 'block';
  createLoginFunction();
  createCartFunction();
  createProductFunction();
}



