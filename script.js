'use strict';

const cartIcon = document.querySelector('#cart--icon');
const userCart = document.querySelector('#userCart');
const message = document.querySelector('.message');
const cartItem = document.querySelector('.cartItem');
const userPurchase = document.querySelector('.userPurchase');
const cartItem_Img = document.querySelector('.cartItem-img');
const purchaseAmt = document.querySelector('#itemAmt');
const itemTotal = document.querySelector('#item_total');
const deleteBtn = document.querySelector('#delete');
const checkoutBtn = document.querySelector('.checkoutBtn');

const thumbnails = document.querySelectorAll('.thumb-img');
const mainProductImg = document.querySelectorAll('.mainProduct-img');

const cartAmount = document.querySelectorAll('#cartAmount');
const addBtn = document.querySelectorAll('#addBtn');
const removeBtn = document.querySelectorAll('#removeBtn');
const addToCartBtn = document.querySelectorAll('.main-cartBtn');

const overlay = document.querySelector('.overlay');
const modalView = document.querySelector('.modal');
const moveToLeftBtn = document.querySelector('.slider_btnLeft');
const moveToRightBtn = document.querySelector('.slider_btnRight');
const closeBtn = document.querySelector('.btn--close');
const modalImg = document.querySelector('.modal-img');
const modalThumbnails = document.querySelectorAll('.modal-thumbnails');