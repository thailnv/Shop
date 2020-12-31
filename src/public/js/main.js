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
$(document).ready(function() {
    $('.navbar-collapse').click(() => {
        $(".search-product").css('display', 'block');
    });
    $('.search-product-button').click(() => {
        let temp = 'product/name=' + $(".search-product-text").val();
        $(".search-product").attr('action', temp);
        $(".search-product-text").val("");

    });
});

//function & base define
const lstType = ['Chair', 'Table', 'Decor', 'Bed'];
const lstSupplier = ['Chair', 'Table', 'Decor', 'Bed'];

function displayMessage(msg) {
    let message = document.querySelector('.message-popup');
    message.style.display = 'block';
    message.querySelector('.waiting').style.display = 'none';
    message.querySelector('.message').style.display = 'block';
    message.querySelector('.message .content').textContent = msg;
}

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
    } else {
        document.querySelector('.cart-nitem').textContent = 0;
    }
}

function calcTotalPrice() {
    var total_price = 0;
    if (localStorage.getItem('cart_info')) {
        let cart_info = JSON.parse(localStorage.getItem('cart_info'));
        for (let i = 0; i < cart_info.length; i++) {
            total_price += cart_info[i].num * cart_info[i].price;
        }
        document.querySelector('.cart-checkout .provisional-cost').textContent = '$' + total_price;
        document.querySelector('.cart-checkout .total-cost').textContent = '$' + (50 + total_price);
    } else {
        total_price = 0;
        document.querySelector('.cart-checkout .transportation-cost').textContent = '$0';
        document.querySelector('.cart-checkout .provisional-cost').textContent = '$0';
        document.querySelector('.cart-checkout .total-cost').textContent = '$0';
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
    let edit_form_discount = edit_form.querySelector('#pediscount');
    let edit_form_number = edit_form.querySelector('#penumber');
    let edit_form_supplier = edit_form.querySelectorAll('#pesupplier option');
    let close_edit_btn = edit_popup.querySelector('.close-edit-btn');
    for (let i = 0; i < lst_product.length; i++) {
        let product = lst_product[i];
        let typeid = product.querySelector('.pinfotype').textContent;
        let typename = lstType[parseInt(typeid) - 1];
        product.querySelector('.pinfotype').textContent = typename;
        product.querySelector('.btn-edit').addEventListener('click', () => {
            edit_popup.style.display = 'block';
            edit_popup.setAttribute('pid', lst_product[i].getAttribute('pid'));
            edit_form.classList.add('show');
            edit_form_name.value = product.querySelector('.pinfoname').textContent;
            edit_form_price.value = product.querySelector('.pinfoprice').textContent;
            edit_form_number.value = product.getAttribute('number');
            edit_form_discount.value = product.getAttribute('discount');
            edit_form_img.src = product.getAttribute('link');
            edit_form_supplier[parseInt(product.getAttribute('supplier') - 1)].selected = true;
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
            edit_popup.setAttribute('sid', supplier.getAttribute('sid'));
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

function manageStaff() {
    let lst_staff = document.querySelectorAll('.staff-data');
    let edit_popup = document.querySelector('.edit-staff-popup');
    let edit_form = document.querySelector('.edit-staff-form');
    let edit_form_name = edit_form.querySelector('#stename');
    let edit_form_pid = edit_form.querySelector('#stepid');
    let edit_form_pnumber = edit_form.querySelector('#stepnumber');
    let edit_form_role = edit_form.querySelector('#sterole');
    let edit_form_status = edit_form.querySelector('#stestatus');
    let close_edit_btn = edit_popup.querySelector('.close-edit-btn');
    for (let i = 0; i < lst_staff.length; i++) {
        let staff = lst_staff[i];
        staff.querySelector('.btn-edit').addEventListener('click', () => {
            edit_popup.style.display = 'block';
            edit_form.classList.add('show');
            edit_form_name.value = staff.querySelector('.infoname').textContent;
            edit_form_pnumber.value = staff.querySelector('.infopnumber').textContent;
            edit_form_pid.value = staff.getAttribute('pid');
            edit_popup.setAttribute('stid', staff.getAttribute('stid'));
            edit_form_role[parseInt(staff.getAttribute('role') - 1)].selected = true;
            edit_form_status[parseInt(staff.getAttribute('status') - 1)].selected = true;
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
    let logout_btn = document.querySelector('.logout-btn');

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
            let name = document.getElementById('uName');
            let address = document.getElementById('uAddress');
            let phonenumber = document.getElementById('uPnumber');
            let username = document.getElementById('uUsername');
            let password = document.getElementById('uPassword');
            let loginpass = document.getElementById('Password');
            let loginusernam = document.getElementById('Username');
            let icons = document.querySelectorAll('.signup-icon, .login-icon');
            let message = document.querySelectorAll('.wrong-input-message');
            name.classList.remove('wrong-input');
            loginpass.classList.remove('wrong-input');
            loginusernam.classList.remove('wrong-input');
            address.classList.remove('wrong-input');
            phonenumber.classList.remove('wrong-input');
            username.classList.remove('wrong-input');
            password.classList.remove('wrong-input');
            name.value = '';
            address.value = '';
            phonenumber.value = '';
            username.value = '';
            password.value = '';
            for (let i = 0; i < icons.length; i++) {
                icons[i].classList.remove('wrong-icon');
            }
            for (let i = 0; i < message.length; i++) {
                message[i].style.display = 'none';
            }
        }
    })

    logout_btn.onclick = () => {
        fetch('/api/logout', {
            method: 'POST',
        }).then(
            () => {
                localStorage.removeItem('account_info');
                location.reload();
            }
        )
    }
}

function createCartItemFunction() {
    let lstItemQuantity = document.querySelectorAll('.item .item-info .item-quantity');
    for (let i = 0; i < lstItemQuantity.length; i++) {
        lstItemQuantity[i].addEventListener('input', () => {
            let cart_info = JSON.parse(localStorage.getItem('cart_info'));
            for (let j = 0; j < cart_info.length; j++) {
                if (cart_info[j].name === lstItemQuantity[i].parentElement.querySelector('.item-name').textContent) {
                    cart_info[j].num = lstItemQuantity[i].value;
                    if (cart_info[j].num == 0) {
                        lstItemQuantity[i].parentElement.parentElement.remove();
                        cart_info.splice(j, 1);
                    }
                    if (cart_info.length === 0)
                        localStorage.removeItem('cart_info');
                    else
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
    let order_btn = document.getElementById('order-btn');

    cart_btn.addEventListener('click', () => {
        createCart();
        createCartItemFunction();
        cart_popup.style.display = 'block';
        cart_action.classList.remove('cart-hide-item');
        cart_action.classList.add('cart-show-item');
    })

    checkout_btn.onclick = () => {
        calcTotalPrice();
        cart_action.classList.remove('cart-show-item');
        cart_action.classList.add('cart-show-checkout');
        document.querySelector('.checkout-form .provisional-cost').textContent =
            cart_form.querySelector('.cart-total .total-price').textContent;
        if (localStorage.getItem('account_info') != null) {
            let customer_info = JSON.parse(localStorage.getItem('account_info'));
            document.getElementById('cusname').value = customer_info.name;
            if (customer_info.role == 4) {
                document.getElementById('cusaddress').value = customer_info.address;
                document.getElementById('cusphone').value = customer_info.phone;
            }
        }
    }

    order_btn.onclick = () => {
        let data = {};
        if (localStorage.getItem('cart_info') != null) {
            let cart_info = JSON.parse(localStorage.getItem('cart_info'));
            data.order = cart_info;
            data.totalprice = document.querySelector('.cart-checkout .total-cost').textContent.slice(1, 30);
        } else {
            data.order = [];
        }
        if (localStorage.getItem('account_info') != null) {
            let account_info = JSON.parse(localStorage.getItem('account_info'));
            data.customer_id = account_info.id;
        } else {
            data.customer_id = 'Unknown'
        }
        console.log(JSON.stringify(data));
        fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.status);
                if (data.status == 'success') {
                    displayMessage('Order successfully!');
                    localStorage.removeItem('cart_info');
                }
            })
    }

    window.onclick = (e) => {
        if (e.target == cart_popup) {
            if (cart_action.classList.contains('cart-show-item')) {
                cart_action.classList.remove('cart-show-item');
                cart_action.classList.add('cart-hide-item');
            } else if (cart_action.classList.contains('cart-show-checkout')) {
                cart_action.classList.remove('cart-show-checkout');
                cart_action.classList.add('cart-hide-checkout');
            }
        }
    }

    cart_action.addEventListener('animationend', () => {
        if (cart_action.classList.contains('cart-show-item')) {
            cart_action.classList.add('cart-action-item');
        }
        if (cart_action.classList.contains('cart-show-checkout')) {
            cart_action.classList.remove('cart-action-item');
            cart_action.classList.add('cart-action-checkout');
        }
        if (cart_action.classList.contains('cart-hide-item')) {
            cart_action.classList.remove('cart-action-item');
            cart_popup.style.display = 'none';
        }
        if (cart_action.classList.contains('cart-hide-checkout')) {
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
            let product_id = product.getAttribute('pid');
            let cart_info = [];
            if (localStorage.getItem('cart_info') === null) {
                let product_info = {
                    id: product_id,
                    name: product_name,
                    price: parseInt(product_price),
                    img: product_img,
                    num: 1,
                }
                cart_info.push(product_info);
                localStorage.setItem('cart_info', JSON.stringify(cart_info));
            } else {
                cart_info = JSON.parse(localStorage.getItem('cart_info'));
                let product_info = {
                    id: product_id,
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

document.querySelector('.message-popup .next-btn').onclick = () => {
    location.reload();
}

async function uploadimage(img, result) {
    var form = new FormData();
    form.append('image', img);
    let key = '92bd8c2c76657d6c7d7dd0eb1e7dc4d0';
    let url = `https://api.imgbb.com/1/upload?key=${key}`;
    let config = {
        method: 'POST',
        header: {
            'processData': false,
            'mimeType': 'multipart/form-data',
            'contentType': false,
        },
        body: form
    }
    await fetch(url, config)
        .then(response => response.json())
        .then(data => {
            result.url = data.data.url;
        })
}

async function createProduct() {
    let submit = document.querySelector('#product-submit');
    submit.onclick = async function() {
        let product = document.querySelector('.add-product-form');
        let name = product.querySelector('#pname').value;
        let radios = product.querySelectorAll('input[name = "type"]');
        let type = 0;
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                console.log(radios[i].value);
                type = radios[i].value;
            }
        }
        let price = product.querySelector('#price').value;
        let number = product.querySelector('#number').value;
        let supplier = product.querySelector('#supplier').value;
        let image = product.querySelector('#image').value.replace('C:\\fakepath\\', '');
        let wrongCount = 0;
        let message = product.querySelectorAll('.wrong-input-message');
        if (name === '') {
            wrongCount++;
            message[0].style.display = 'block';
        } else {
            message[0].style.display = 'none';
        }
        if (type == 0) {
            wrongCount++;
            message[1].style.display = 'block';
        } else {
            message[1].style.display = 'none';
        }
        if (price === '') {
            wrongCount++;
            message[2].style.display = 'block';
        } else {
            message[2].style.display = 'none';
        }
        if (image === '') {
            image = 'shortcut.png';
        }
        if (wrongCount === 0) {
            let product2Insert = {
                name,
                type,
                price,
                supplier,
                image,
                number
            }
            let message = document.querySelector('.message-popup');
            message.style.display = 'block';
            message.querySelector('.message').style.display = 'none';
            message.querySelector('.waiting').style.display = 'block';
            let img = product.querySelector('#image').files[0];
            await uploadimage(img, product2Insert);
            console.log(product2Insert);
            fetch('/api/create/product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product2Insert),
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.status);
                    if (data.status == 'success') {
                        message.querySelector('.waiting').style.display = 'none';
                        message.querySelector('.message').style.display = 'block';
                        message.querySelector('.message .content').textContent = 'Adding product successfully!';
                    }
                })
        }
    }
}

async function createSupplier() {
    let submit = document.querySelector('#supplier-submit');
    submit.onclick = async function() {
        let supplier = document.querySelector('.add-supplier-form');
        let name = supplier.querySelector('#sname').value;
        let address = supplier.querySelector('#saddress').value;
        let phonenumber = supplier.querySelector('#spnumber').value;
        let image = supplier.querySelector('#simage').value.replace('C:\\fakepath\\', '');
        let wrongCount = 0;
        let message = supplier.querySelectorAll('.wrong-input-message');
        if (name === '') {
            wrongCount++;
            message[0].style.display = 'block';
        } else {
            message[0].style.display = 'none';
        }
        if (address === '') {
            wrongCount++;
            message[1].style.display = 'block';
        } else {
            message[1].style.display = 'none';
        }
        if (phonenumber === '') {
            wrongCount++;
            message[2].style.display = 'block';
        } else {
            message[2].style.display = 'none';
        }
        if (image === '') {
            image = 'shortcut.png';
        }
        if (wrongCount === 0) {
            let supplier2Insert = {
                name,
                address,
                phonenumber,
                image
            }
            let message = document.querySelector('.message-popup');
            message.style.display = 'block';
            message.querySelector('.message').style.display = 'none';
            message.querySelector('.waiting').style.display = 'block';
            let img = supplier.querySelector('#simage').files[0];
            await uploadimage(img, supplier2Insert);
            console.log(supplier2Insert);
            fetch('/api/create/supplier', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(supplier2Insert),
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.status);
                    if (data.status == 'success') {
                        message.querySelector('.waiting').style.display = 'none';
                        message.querySelector('.message').style.display = 'block';
                        message.querySelector('.message .content').textContent = 'Adding supplier successfully!';
                    }
                })
        }
    }
}

function createStaff() {
    let submit = document.querySelector('#staff-submit');
    submit.onclick = function() {
        let staff = document.querySelector('.add-staff-form');
        let name = staff.querySelector('#stname').value;
        let id = staff.querySelector('#stid').value;
        let phonenumber = staff.querySelector('#stpnumber').value;
        let type = staff.querySelector('#sttype').value;
        let username = staff.querySelector('#stusername').value;
        let password = staff.querySelector('#stpassword').value;
        let wrongCount = 0;
        let message = staff.querySelectorAll('.wrong-input-message');
        if (name === '') {
            wrongCount++;
            message[0].style.display = 'block';
        } else {
            message[0].style.display = 'none';
        }
        if (id === '') {
            wrongCount++;
            message[1].style.display = 'block';
        } else {
            message[1].style.display = 'none';
        }
        if (phonenumber === '') {
            wrongCount++;
            message[2].style.display = 'block';
        } else {
            message[2].style.display = 'none';
        }
        if (username === '') {
            wrongCount++;
            message[3].style.display = 'block';
        } else {
            message[3].style.display = 'none';
        }
        if (password === '') {
            wrongCount++;
            message[4].style.display = 'block';
        } else {
            message[4].style.display = 'none';
        }
        if (wrongCount === 0) {
            let staff2Insert = {
                name,
                id,
                phonenumber,
                type,
                username,
                password
            }
            console.log(staff2Insert);
            fetch('/api/create/staff', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(staff2Insert),
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.status);
                    if (data.status == 'success') {
                        let message = document.querySelector('.message-popup');
                        message.querySelector('.content').textContent = 'Adding staff successfully!';
                        message.style.display = 'block';
                    }
                })
        }
    }
}

function updateProduct() {
    let submitbtn = document.querySelector('.edit-product-submit');
    let name = document.querySelector('#pename');
    let supplier = document.querySelector('#pesupplier');
    let price = document.querySelector('#peprice');
    let number = document.querySelector('#penumber');
    let status = document.querySelector('#pestatus');
    let discount = document.querySelector('#pediscount');
    let radios = document.querySelectorAll('.edit-product-container input[type = "radio"]');
    let type = 0;
    submitbtn.onclick = () => {
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                type = radios[i].value;
            }
        }
        let id = document.querySelector('.edit-product-popup').getAttribute('pid');
        let upProduct = {
            id: id,
            name: name.value,
            supplier: supplier.value,
            price: price.value,
            number: number.value,
            status: status.value,
            type,
            discount: discount.value,
        }
        console.log(upProduct);
        fetch('/api/update/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(upProduct),
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status == 'success') {
                    location.reload();
                }
            })
    }
}

function updateSupplier() {
    let submitbtn = document.querySelector('.edit-supplier-submit');
    let name = document.getElementById('sename');
    let address = document.getElementById('seaddress');
    let pnumber = document.getElementById('sepnumber');
    submitbtn.onclick = () => {
        let id = document.querySelector('.edit-supplier-popup').getAttribute('sid');
        let upSupplier = {
            id: id,
            name: name.value,
            address: address.value,
            pnumber: pnumber.value,
        }
        fetch('/api/update/supplier', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(upSupplier),
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status == 'success') {
                    location.reload();
                }
            })
    }
}

function updateStaff() {
    let submitbtn = document.querySelector('.edit-staff-submit');
    let name = document.getElementById('stename');
    let personalID = document.getElementById('stepid');
    let pnumber = document.getElementById('stepnumber');
    let role = document.getElementById('sterole');
    let status = document.getElementById('stestatus');
    submitbtn.onclick = () => {
        let id = document.querySelector('.edit-staff-popup').getAttribute('stid');
        let upStaff = {
            id: id,
            name: name.value,
            personalID: personalID.value,
            pnumber: pnumber.value,
            role: role.value,
            status: status.value
        }
        fetch('/api/update/staff', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(upStaff),
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data.status);
                if (data.status == 'success') {
                    location.reload();
                }
            })
    }
}

function register() {
    let signupbtn = document.querySelector('.sign-up #signup-btn');
    let name = document.getElementById('uName');
    let address = document.getElementById('uAddress');
    let phonenumber = document.getElementById('uPnumber');
    let username = document.getElementById('uUsername');
    let password = document.getElementById('uPassword');
    let icons = document.querySelectorAll('.signup-icon');
    let message = document.querySelectorAll('.input-container p');
    signupbtn.onclick = () => {
        let wrongCount = 0; {
            if (name.value === '') {
                wrongCount++;
                name.classList.add('wrong-input');
                icons[0].classList.add('wrong-icon');
                message[0].style.display = 'block';
            } else {
                name.classList.remove('wrong-input');
                icons[0].classList.remove('wrong-icon');
                message[0].style.display = 'none';
            }
            if (address.value === '') {
                wrongCount++;
                address.classList.add('wrong-input');
                icons[1].classList.add('wrong-icon');
                message[1].style.display = 'block';
            } else {
                address.classList.remove('wrong-input');
                icons[1].classList.remove('wrong-icon');
                message[1].style.display = 'none';
            }
            if (phonenumber.value === '') {
                wrongCount++;
                phonenumber.classList.add('wrong-input');
                icons[2].classList.add('wrong-icon');
                message[2].style.display = 'block';
            } else {
                phonenumber.classList.remove('wrong-input');
                icons[2].classList.remove('wrong-icon');
                message[2].style.display = 'none';
            }
            if (username.value === '' || username.value.trim().includes(' ')) {
                wrongCount++;
                username.classList.add('wrong-input');
                icons[3].classList.add('wrong-icon');
                if (username.value.trim().includes(' ')) {
                    message[3].innerHTML = 'Username must not contain space!';
                }
                message[3].style.display = 'block';
            } else {
                username.classList.remove('wrong-input');
                icons[3].classList.remove('wrong-icon');
                message[3].style.display = 'none';
            }
            if (password.value === '') {
                wrongCount++;
                password.classList.add('wrong-input');
                icons[4].classList.add('wrong-icon');
                message[4].style.display = 'block';
            } else {
                password.classList.remove('wrong-input');
                icons[4].classList.remove('wrong-icon');
                message[4].style.display = 'none';
            }
        }
        if (wrongCount === 0) {
            let customer = {
                name: name.value,
                address: address.value,
                phonenumber: phonenumber.value,
                username: username.value,
                password: password.value
            }
            fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(customer),
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.status);
                    if (data.status == 'success') {
                        console.log(data);
                        localStorage.setItem('account_info', JSON.stringify(data));
                        location.reload();
                    } else {
                        username.classList.add('wrong-input');
                        icons[3].classList.add('wrong-icon');
                        message[3].innerHTML = 'Username already exists!';
                        message[3].style.display = 'block';
                    }
                })
        }
    }
}

function login() {
    document.querySelector('.login #login-submit').onclick = () => {
        let wrongCount = 0;
        let username = document.querySelector('.login #Username');
        let password = document.querySelector('.login #Password');
        let message = document.querySelectorAll('.login .wrong-input-message');
        let icons = document.querySelectorAll('.login .login-icon');
        if (username.value == '') {
            username.classList.add('wrong-input');
            icons[0].classList.add('wrong-icon');
            message[0].style.display = 'block';
            wrongCount++;
        } else {
            username.classList.remove('wrong-input');
            icons[0].classList.remove('wrong-icon');
            message[0].style.display = 'none';
        }
        if (password.value == '') {
            password.classList.add('wrong-input');
            icons[1].classList.add('wrong-icon');
            message[1].style.display = 'block';
            wrongCount++;
        } else {
            password.classList.remove('wrong-input');
            icons[1].classList.remove('wrong-icon');
            message[1].style.display = 'none';
        }
        if (wrongCount === 0) {
            let user = {
                username: username.value,
                password: password.value
            }
            fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.status);
                    if (data.status == 'success') {
                        console.log(data);
                        localStorage.setItem('account_info', JSON.stringify(data));
                        if (data.role == 2) {
                            console.log('redirec');
                            window.location.href = 'http://localhost:3000/admin';
                        } else
                            location.reload();
                    } else {
                        message[2].style.display = 'block';
                    }
                })
        }
    }
}

function prepareNormal() {
    console.log('prepare normal'); {
        console.log('calc time to remove');
        let loadTime = new Date();
        let unloadTime = new Date(JSON.parse(window.localStorage.unloadTime));
        let refreshTime = loadTime.getTime() - unloadTime.getTime();
        if (refreshTime > 3000) //3000 milliseconds
        {
            console.log('remove localStg');
            window.localStorage.removeItem('cart_info');
            localStorage.removeItem('account_info');
        }
        calcCartItem();
    }
    document.querySelector('.cart').style.display = 'block';
    if (localStorage.getItem('account_info') === null) {
        console.log('deleted')
        document.querySelector('.login-info').style.display = 'block';
        document.querySelector('.account-info').style.display = 'none';
    } else {
        console.log('not deleted')
        document.querySelector('.account-info').style.display = 'block';
        document.querySelector('.login-info').style.display = 'none';
        document.querySelector('.account-info .account-name').innerHTML =
            JSON.parse(localStorage.getItem('account_info')).name;
    }
}
//remove localStorage when close tab
window.onbeforeunload = function(e) {
    window.localStorage.unloadTime = JSON.stringify(new Date());
}

//admin function - normal function
if (window.location.href === 'http://localhost:3000/admin') {
    prepareAdmin();
    manageProduct();
    manageStaff();
    manageSupplier();
    createProduct();
    createStaff();
    createSupplier();
    updateProduct();
    updateSupplier();
    updateStaff();
} else {
    prepareNormal();
    createLoginFunction();
    register();
    login();
    createCartFunction();
    createProductFunction();
}