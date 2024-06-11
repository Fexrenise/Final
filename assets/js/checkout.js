
const faqBtn = document.querySelectorAll('.accordion_item h6');
const faqText = document.querySelectorAll('.accordion_item p');
faqBtn.forEach((item, index) => {
    item.addEventListener('click', () => {
        faqText.forEach((text, i) => {
            if (i !== index) {
                text.classList.remove('active');
            }
        });
        faqText[index].classList.toggle('active');
    });
});


async function renderOrderSummary(products) {
    const orderList = document.querySelector('.order-list');

    // Clear existing products (if any)
    orderList.innerHTML = `
      <li class="order-item">
        <span class="item-label">Product</span>
        <span class="item-value">Subtotal</span>
      </li>
    `;

    // Variable to hold the subtotal
    let subtotal = 0;

    // Create an array of promises for fetching product details
    const productPromises = products.map(async productFromBasket => {
        const productFromDb = await fetchProductById(productFromBasket.id);

        const productHtml = `
            <li class="order-item">
              <img src="./assets/img/${productFromDb.url}" alt="">
              <p class="item-label">${productFromDb.name} × <span>${productFromBasket.count}</span></p>
              <span class="item-value">$${(productFromDb.price * productFromBasket.count).toFixed(2)}</span>
            </li>
        `;

        orderList.innerHTML += productHtml;
        subtotal += productFromDb.price * productFromBasket.count;
    });

    // Wait for all product details to be fetched and processed
    await Promise.all(productPromises);

    // Append the subtotal and total
    const summaryHtml = `
      <li class="order-item">
        <span class="item-label">Subtotal</span>
        <span class="item-value">$${subtotal.toFixed(2)}</span>
      </li>
      <li class="order-item">
        <span class="item-label">Total</span>
        <span class="item-value">$${subtotal.toFixed(2)}</span>
      </li>
    `;

    orderList.innerHTML += summaryHtml;
}

async function getProductsFromBasket() {
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const users = await fetch('http://localhost:3000/users').then(res => res.json());
    const loggedInUser = users.find(user => user.email === loggedInUserEmail);

    if (!loggedInUser) {
        console.error('User not found');
        return;
    }

    const baskets = await fetchBaskets();
    const userBasketIndex = baskets.findIndex(basket => basket.userId === loggedInUser.id);

    if (userBasketIndex === -1) {
        console.error('Basket not found');
        return;
    }

    const basket = baskets[userBasketIndex];

    return basket.products;
}

async function initialize() {
    let products = await getProductsFromBasket();
    renderOrderSummary(products);
}

initialize();
