const API_URL = "https://dummyjson.com";

export async function request(url, reqOptions) {
    return await fetch(`${API_URL}/${url}`, reqOptions).then(handleResponse);
}

async function handleResponse(response) {
    return response.json();
}

const pagePath = {
    'home': "/pages/home.html",
    'about': '/pages/about.html',
    'products': '/pages/products.html'
}

export async function loadPage(page) {
    const path = pagePath[page];
    const htmlOut = await fetch(path).then(data => data.text());
    return htmlOut;
}
