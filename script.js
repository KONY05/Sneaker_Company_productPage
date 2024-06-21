'use strict';

//USER'S CART VARIABLES
const cartIcon = document.querySelector('#cart--icon');
const cartSize = document.querySelector('#cart-size');
const clearUserCart = document.querySelector('#clear--cart');
const userCart = document.querySelector('#userCart');
const message = document.querySelector('.message');
const cartItem = document.querySelector('.cartItem');
const cartInfo = document.querySelector('.cartInfo');
const userPurchase = document.querySelector('.userPurchase');
// const cartItem_Img = document.querySelector('.cartItem-img');
const purchaseAmt = document.querySelector('#itemAmt');
const itemTotal = document.querySelector('#item_total');
let deleteBtn;
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

// console.log(deleteBtn);

const SHOE_PRICE = 125.00;
let priceTotal;
let purchase;

let userItems = [];


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

        userCart.addEventListener('click', function (e) {
            if(e.target === userCart) userCart.classList.remove('hidden');
        })
    }

    _toMainImg(selector, mainImg, thumbImgs, activeClass) {
        // Event listener to allow thumbnail and modal thumbnail display on the mainDiv
        document.querySelector(selector).addEventListener('click', function (e) {
            if (e.target.classList.contains('thumb-img') || e.target.classList.contains('modal-thumbnail')) {
                    
                mainImg.setAttribute('src', `images/image-product-${e.target.dataset.thumbnail}.jpg`);
                
                thumbImgs.forEach(t => t.classList.remove(activeClass));
                e.target.classList.add(activeClass);
            }
        })
    }

    _openModalView() {
        // Function to display modal view on mainDiv click and display last viewed image along with active modal thumbnail
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
        // Function to close modal view on closeBtn click and display last viewed image
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
        // Function to close modal view on Enter keypress and display last viewed image
        if (e.key !== 'Enter') return;

        this._closeModal();
    }

    _displayCart() {
        // Function to display user cart on cart icon click
        userCart.classList.remove('hidden');   
    }

    _hideCart(e) {
        // Function to hide cartItem once body is clicked
        if(e.target !== cartInfo && e.target !== cartIcon) userCart.classList.add('hidden');
    }

    _goToSlide(img) {
        // Function to go to the next/prev image
        modalImg.setAttribute('src', `images/image-product-${img + 1}.jpg`)
    }

    _activeModalThumbnail(img) {
        // Functiion to match the current image and activate its thumbnail
        modalThumbnails.forEach(mt => mt.classList.remove('active--modal'))

        document.querySelector(`.modal-thumbnail[data-thumbnail="${img + 1}"]`).classList.add('active--modal');
    }

    _nextSlide() {
        // Function to move to the next image
        if (this._curSlide === this._maxSlide - 1) {
            this._curSlide = 0;
        } else{
            this._curSlide++;
        }

        this._goToSlide(this._curSlide);
        this._activeModalThumbnail(this._curSlide);
    }

    _prevSlide() {
        // Function to move to the prev image
        if (this._curSlide === 0) {
            this._curSlide = this._maxSlide - 1;
        } else {
            this._curSlide--;
        }

        this._goToSlide(this._curSlide);
        this._activeModalThumbnail(this._curSlide);
    }
}

let data, size;

class SneakerOrder extends SneakerView{
    _amount = 1;
    _negAmt;
    _itemNum = 0;
    _itemImg;


    constructor() {
        super();

        clearUserCart.addEventListener('click', this._clearStorage.bind(this));

        cartAmount.textContent = INIT_CART_AMT;
        addBtn.addEventListener('click', this._increaseToCart.bind(this));
        reduceBtn.addEventListener('click', this._reduceFromCart.bind(this));
        addToCartBtn.addEventListener('click', this._addToCart.bind(this));
        userPurchase.addEventListener('click', this._deleteItem.bind(this));

        this._getStorage();
    }

    _increaseToCart() {
        // Function to increase purchase amount
        if (this._amount >= 0) cartAmount.textContent = this._amount++;
    }

    _reduceFromCart() {
        // Function to reduce from purchase amount
        this._negAmt = this._amount--;
        // 2 because amount is ahead of negAmt by 1 and ahead of INIT_CART_AMT by 2
        if (this._negAmt < 2) return;

        cartAmount.textContent = this._amount-1;
    }

    _addToCart() {
        // Function to display cart size when user adds a purchase to their cart
        if (this._amount === 1) return;
        
        cartSize.classList.remove('hidden');
        
        this._displayCartItems();
        this._reset();
    }

    _displayCartItems() {
        // Function to display user's items to their cart and save it to their window
        message.classList.add('hidden');
        cartItem.classList.remove('hidden');

        this._renderOrder();
        this._setStorage();
    }

    _renderOrder() {
        // Function to render markup to each cart item
        priceTotal = SHOE_PRICE * (this._amount - 1);
        this._itemImg = document.querySelector('.thumb-img.active--thumbnail').getAttribute('src');

        purchase = {
            itemImage: this._itemImg,
            item_shoePrice: SHOE_PRICE,
            itemAmt: this._amount,
            item_total: priceTotal
        };

        userItems.push(purchase);

        userPurchase.innerHTML = '';

        const filteredCartItems = userItems.filter(el => el.itemAmt > 1);

        filteredCartItems.forEach(item => this._cartMarkup(item));
    }

    _cartMarkup(item) {
        // Function to create and add HTML markup to the User Purchases div
        const html = `<div class="itemPurchase">
                    <img src="${item.itemImage}" alt="" class="cartItem-img">
  
                    <div class="item_info">
                      <p class="item--name">fall limited edition sneakers</p>
                      <p class="item--price">$${item.item_shoePrice}.00 x <span id="itemAmt">${item.itemAmt - 1}</span> <span id="item_total">$${item.item_total}.00</span></p>
  
                    </div>
                    <img src="images/icon-delete.svg" alt="" class="delete">
                  </div>`;
        
             
        userPurchase.insertAdjacentHTML('afterbegin', html);
    }

    _deleteItem(e) {
        // Function to delete selected item from the DOM and local storage
        if (e.target.classList.contains('delete')) {
            const itemElem = e.target.closest('.itemPurchase');
            const itemIndex = Array.from(userPurchase.children).indexOf(itemElem);

            // Remove item from userItems array
            userItems.splice(itemIndex, 1);

            // Remove item from DOM
            itemElem.remove();

            // Update local storage
            this._setStorage();

            // Update cart size
            if (userItems.length !== 0) return; 
            cartSize.classList.add('hidden');
            message.classList.remove('hidden');
            cartItem.classList.add('hidden');
        }
    }

    _setStorage() {
        // Function to create a local storage item
        localStorage.setItem('userItems', JSON.stringify(userItems));
    }

    _clearStorage() {
        // Function to clear the local storage item aswell as the user's cart
        localStorage.clear('userItems');

        userItems = [];
        cartSize.textContent = '';
        cartSize.classList.add('hidden');
        cartItem.classList.add('hidden');
        message.classList.remove('hidden');
    }

    _getStorage() {
        // Function to get storage and render it to the User Purchase div
         data = JSON.parse(localStorage.getItem('userItems'));

        if (!data) return;

        userItems = data;

        if (userItems.length > 0) {
            cartSize.classList.remove('hidden');
        }

        message.classList.add('hidden');
        cartItem.classList.remove('hidden');
      
        userItems.forEach((items) => {
            this._renderOrder(items);
        })
    }

    _reset() {
        // Function to start the counting of amount from the beginning
        cartAmount.textContent = INIT_CART_AMT;
        this._amount = 1;
    }
}

const userView = new SneakerView();
const userOrder = new SneakerOrder();