'use strict';

//USER'S CART VARIABLES
const cartIcon = document.querySelector('#cart--icon');
const cartSize = document.querySelector('#cart-size')
const userCart = document.querySelector('#userCart');
const message = document.querySelector('.message');
const cartItem = document.querySelector('.cartItem');
const userPurchase = document.querySelector('.userPurchase');
const cartItem_Img = document.querySelector('.cartItem-img');
const purchaseAmt = document.querySelector('#itemAmt');
const itemTotal = document.querySelector('#item_total');
const deleteBtn = document.querySelector('#delete');
const checkoutBtn = document.querySelector('.checkoutBtn');

// MAIN PRODUCT IMAGE VARIABLES
const thumbnails = document.querySelectorAll('.thumb-img');
const mainProductImg = document.querySelectorAll('.mainProduct-img');

// ADD_TO_CART VARIABLES
const cartAmount = document.querySelectorAll('#cartAmount');
const addBtn = document.querySelectorAll('#addBtn');
const removeBtn = document.querySelectorAll('#removeBtn');
const addToCartBtn = document.querySelectorAll('.main-cartBtn');

// MODAL VARIABLES
const overlay = document.querySelector('.overlay');
const modalView = document.querySelector('.modal');
const moveToLeftBtn = document.querySelector('.slider_btnLeft');
const moveToRightBtn = document.querySelector('.slider_btnRight');
const closeBtn = document.querySelector('.btn--close');
const modalImg = document.querySelector('.modal-img');
const modalThumbnails = document.querySelectorAll('.modal-thumbnails');