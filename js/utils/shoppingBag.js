import { request } from "./fetchData.js";

const cart = document.querySelector(".shopping_cart");
const cartContent = document.querySelector(".cart");

export function onShoppingBagNav() {
    cart.classList.add("active");
    cartContent.classList.add("active");

    renderLocal();
}

export function onShoppingBagClose() {
    cart.classList.remove("active");
}

export async function addToLocal(id) {
    const data = await request('products');

    let list = JSON.parse(localStorage.getItem("cart")) ?? [];

    const item = data.products.find((item) => item.id == id);
    list.push(item);
    localStorage.setItem("cart", JSON.stringify(list));
}

function removeFromLocal(e) {
    const id = e.target.id;

    let list = JSON.parse(localStorage.getItem("cart")) ?? [];

    const filteredList = list.filter((item) => item.id != id);
    localStorage.setItem("cart", JSON.stringify(filteredList));

    renderLocal();
}

export function renderLocal() {
    let list = JSON.parse(localStorage.getItem("cart")) ?? [];

    const items = list
        .map((item) => 
        `<div class="bag__item">
            <img src=${item.images[0]} >
            <div class="bag__item_desc">
                <h4>${item.title}</h4>
                <p>${item.price}$</p>
                <button class="action__remove" id=${item.id}>Remove item</button>
            </div>
        </div>`).join("");

    document.getElementById("bag_items").innerHTML = items;
    document.querySelector(".total").innerText = calculateTotal(list);
    document
        .querySelectorAll(".action__remove")
        .forEach((button) => button.addEventListener("click", removeFromLocal));
}

function calculateTotal(list) {
    if (list.length < 1) {
        return `Total:`;
    }

    const sum = list.reduce((acc, cur) => acc + cur.price, 0);

    return `Total: ${sum}$`;
}
