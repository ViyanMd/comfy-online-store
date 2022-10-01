import { request, loadPage } from "./fetchData.js";
import { addToLocal, renderLocal } from "./shoppingBag.js";

const root = document.getElementById("root");


export async function onHomeNav(e) {
    e.preventDefault();

    const homeContent = await loadPage("home");

    root.innerHTML = homeContent;
    document.getElementById('action_shop-now').addEventListener('click', onProductsNav)
}

export async function onProductsNav(e) {
    e.preventDefault();

    const productsContent = await loadPage("products");
    root.innerHTML = productsContent;
    const products = await request('products');
    renderProducts(products.products);
    const categories = await request('products/categories');
    renderCategories(categories);

    document.getElementById('product__search').addEventListener('change', searchProducts);
    document.querySelectorAll('.cat__action').forEach(button => button.addEventListener('click', searchCategory));
}

export async function onAboutNav(e) {
    e.preventDefault();

    const aboutContent = await loadPage("about");
    root.innerHTML = aboutContent;
}

function renderProducts(data) {
    const products = data.map((product) => 
        `<div class="product__card">
            <img src=${product.images[0]}>
            <div class="card__desk">
                <h3 class="title">${product.title}</h3>
                <p class="description">${product.description}</p>
                <p class="price">${product.price}$</p>
                <button class="add__action" id=${product.id}>Add to Cart</button>
            </div>
        </div>`                         
    ).join('');

    document.getElementById("products").innerHTML = products;
    document.querySelectorAll('.add__action').forEach(button => button.addEventListener('click', onAdd));

}

function renderCategories(data) {
    const categories = data.map(category => 
            `<li>
                <button class="cat__action" name=${category}>${category}</button>
            </li>`
    ).join('');

    document.getElementById('categories').innerHTML = categories
}

async function searchProducts() {
    const userInput = document.getElementById('product__search');

    const data = await request(`products/search?q=${userInput.value}`);

    renderProducts(data.products);

    userInput.value = "";
}

async function searchCategory(e) {
    const category = e.target.name
    const data = await request(`products/category/${category}`);

    renderProducts(data.products)
}

function onAdd(e) {
     addToLocal(e.target.id);

     e.target.innerText = "Added";
     e.target.setAttribute('disabled', '');
     e.target.style.opacity = '.5';
}