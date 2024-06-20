'use strict';

//USER'S CART VARIABLES
const cartIcon = document.querySelector('#cart--icon');
const cartSize = document.querySelector('#cart-size')
const userCart = document.querySelector('#userCart');
const message = document.querySelector('.message');
const cartItem = document.querySelector('.cartItem');
const userPurchase = document.querySelector('.userPurchase');
// const cartItem_Img = document.querySelector('.cartItem-img');
const purchaseAmt = document.querySelector('#itemAmt');
const itemTotal = document.querySelector('#item_total');
const deleteBtn = document.querySelector('#delete');
const checkoutBtn = document.querySelector('.checkoutBtn');

// MAIN PRODUCT IMAGE VARIABLES
const thumbnails = document.querySelectorAll('.thumb-img');
const mainProductImg = document.querySelector('.mainProduct-img');

// ADD_TO_CART VARIABLES
const cartAmount = document.querySelector('#cartAmount');
const addBtn = document.querySelector('#addBtn');
const reduceBtn = document.querySelector('#removeBtn');
const addToCartBtn = document.querySelector('.main-cartBtn');
const INIT_CART_AMT = 0;

// MODAL VARIABLES
const overlay = document.querySelector('.overlay');
const modalView = document.querySelector('.modal');
const moveToLeftBtn = document.querySelector('.slider_btnLeft');
const moveToRightBtn = document.querySelector('.slider_btnRight');
const closeBtn = document.querySelector('.btn--close');
const modalImg = document.querySelector('.modal-img');
const modalThumbnails = document.querySelectorAll('.modal-thumbnail');

const SHOE_PRICE = 125.00;
let priceTotal;
let purchase;

// const userLog = {
//     userCart: []
// }

class SneakerView {
    _clicked;
    _curSlide = 0;
    _maxSlide = modalThumbnails.length;

    constructor() {
        this._toMainImg('.thumbnails', mainProductImg, thumbnails, 'active--thumbnail');
        this._toMainImg('.modal--thumbnails', modalImg, modalThumbnails, 'active--modal');

        mainProductImg.addEventListener('click', this._openModalView.bind(this));
        closeBtn.addEventListener('click', this._closeModal.bind(this));
        cartIcon.addEventListener('click', this._displayCart.bind(this));
        document.addEventListener('click', this._hideCart.bind(this));
        document.addEventListener('keydown', this._closeModalEnterKey.bind(this));
        
        moveToRightBtn.addEventListener('click', this._nextSlide.bind(this));
        moveToLeftBtn.addEventListener('click', this._prevSlide.bind(this));
        this._goToSlide(0);
    }

    _toMainImg(selector, mainImg, thumbImgs, activeClass){
        document.querySelector(selector).addEventListener('click', function (e) {
            if (e.target.classList.contains('thumb-img') || e.target.classList.contains('modal-thumbnail')) {
                    
                mainImg.setAttribute('src', `images/image-product-${e.target.dataset.thumbnail}.jpg`);
                
                thumbImgs.forEach(t => t.classList.remove(activeClass));
                e.target.classList.add(activeClass);
            }
        })
    }

    _openModalView() {
            overlay.classList.remove('hidden');
            modalView.classList.remove('hidden');

            this._clicked = mainProductImg.getAttribute('src');
            let img = this._clicked.slice(0, 22);
            modalThumbnails.forEach(mt => {
                mt.classList.remove('active--modal');

                if (img === mt.getAttribute('src').slice(0, 22)) mt.classList.add('active--modal');
            });

            modalImg.setAttribute('src', this._clicked);
    }
    
    _closeModal() {
        overlay.classList.add('hidden');
        modalView.classList.add('hidden');

        this._clicked = modalImg.getAttribute('src');
        mainProductImg.setAttribute('src', this._clicked); 

        let img = this._clicked.slice(0, 22);
        thumbnails.forEach(t => {
        t.classList.remove('active--thumbnail');

        if (img === t.getAttribute('src').slice(0, 22)) t.classList.add('active--thumbnail');
        });
    }

    _closeModalEnterKey(e) {
        if (e.key !== 'Enter') return;

        this._closeModal();
    }

    _displayCart() {
        userCart.classList.remove('hidden');
    }

    _hideCart(e) {
        if(e.target !== cartIcon) userCart.classList.add('hidden');
    }

    _goToSlide(img) {
        modalImg.setAttribute('src', `images/image-product-${img + 1}.jpg`)
    }

    _activeModalThumbnail(img) {
        modalThumbnails.forEach(mt => mt.classList.remove('active--modal'))

        document.querySelector(`.modal-thumbnail[data-thumbnail="${img + 1}"]`).classList.add('active--modal');
    }

    _nextSlide() {
        if (this._curSlide === this._maxSlide - 1) {
            this._curSlide = 0;
        } else{
            this._curSlide++;
        }

        this._goToSlide(this._curSlide);
        this._activeModalThumbnail(this._curSlide);
    }

    _prevSlide() {
        if (this._curSlide === 0) {
            this._curSlide = this._maxSlide - 1;
        } else {
            this._curSlide--;
        }

        this._goToSlide(this._curSlide);
        this._activeModalThumbnail(this._curSlide);
    }
}

class SneakerOrder extends SneakerView{
    _amount = 1;
    _negAmt;
    _itemNum = 1;
    _cartImg;

    constructor() {
        super();

        cartAmount.textContent = INIT_CART_AMT;
        addBtn.addEventListener('click', this._increaseToCart.bind(this));
        reduceBtn.addEventListener('click', this._reduceFromCart.bind(this));
        addToCartBtn.addEventListener('click', this._addToCart.bind(this));
    }

    _increaseToCart() {
        if (this._amount >= 0) cartAmount.textContent = this._amount++;
    }

    _reduceFromCart() {
        this._negAmt = this._amount--;
        if (this._negAmt < 2) return;

        cartAmount.textContent = this._amount-1;
    }

    _addToCart() {
        if (this._amount === 1) return;
        
        cartSize.classList.remove('hidden');
        cartSize.textContent = this._itemNum++;
        this._renderOrder();
    }

    _renderOrder() {
        message.classList.add('hidden');
        cartItem.classList.remove('hidden');

        priceTotal = SHOE_PRICE * this._amount;
        this._cartImg = document.querySelector('.thumb-img.active--thumbnail').getAttribute('src');

        const html = `<div class="itemPurchase">
                    <img src="${this._cartImg}" alt="" class="cartItem-img">
  
                    <div class="item_info">
                      <p class="item--name">fall limited edition sneakers</p>
                      <p class="item--price">$${SHOE_PRICE}.00 x <span id="itemAmt">${this._amount - 1}</span> <span id="item_total">$${priceTotal}.00</span></p>
  
                    </div>
                    <img src="images/icon-delete.svg" alt="" id="delete">
                  </div>`;
        
        
        userPurchase.insertAdjacentHTML('afterbegin', html);
    }
}

const userView = new SneakerView();
const userOrder = new SneakerOrder();

userView;
userOrder;