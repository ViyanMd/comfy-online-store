import {onAboutNav, onHomeNav, onProductsNav} from "./utils/render.js";
import  {onShoppingBagNav, onShoppingBagClose}  from "./utils/shoppingBag.js";

const linkHome = document.getElementById('link__home');
const linkAbout = document.getElementById('link__about');
const linkProducts = document.getElementById('link__products');
const shoppingBag = document.getElementById('shopping__bag_action');
const shoppingBagClose = document.getElementById('cross');

document.addEventListener('DOMContentLoaded', onHomeNav);
linkHome.addEventListener('click', onHomeNav);
linkAbout.addEventListener('click', onAboutNav);
linkProducts.addEventListener('click', onProductsNav);
shoppingBag.addEventListener('click', onShoppingBagNav);
shoppingBagClose.addEventListener('click', onShoppingBagClose);
