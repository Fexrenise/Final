async function handleMainShopView() {
    const viewCart = document.querySelector('.cart');

    if (!viewCart) {
        return;
    }

    const baskets = await fetchBaskets();
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const users = await fetch('http://localhost:3000/users').then(res => res.json());
    const loggedInUser = users.find(user => user.email === loggedInUserEmail);
    const userBasket = baskets.find(basket => basket.userId === loggedInUser.id);

    const viewShop = document.querySelector('.cart-items');
    const updateCartButton = document.getElementById('updateCart');

    const deleteModal = document.getElementById('deleteModal');
    const closeModal = document.querySelector('.close');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    const cancelDeleteBtn = document.getElementById('cancelDelete');

    let productToDelete = null;
    let cartItemToDelete = null;
    let productDetailsToDelete = null;

    if (!viewShop) {
        return;
    }

    let originalTotal = userBasket.total;
    let originalCount = userBasket.count;

    for (const product of userBasket.products) {
        const productDetails = await fetchProductById(product.id);

        if (!productDetails) {
            continue;
        }

        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');

        const img = document.createElement('img');
        img.src = `./assets/img/${productDetails.url}`;
        img.alt = productDetails.name;

        const itemDetails = document.createElement('div');
        itemDetails.classList.add('item-details');

        const productName = document.createElement('span');
        productName.classList.add('product-name');
        productName.textContent = productDetails.name;

        const productPrice = document.createElement('span');
        productPrice.classList.add('product-price');
        productPrice.textContent = `$${productDetails.price}`;

        const countDiv = document.createElement('div');
        countDiv.classList.add('count');

        const countP = document.createElement('p');
        countP.id = 'count';
        countP.textContent = `${product.count}`;

        const countBtnDiv = document.createElement('div');
        countBtnDiv.classList.add('countBtn');

        const caretUp = document.createElement('i');
        caretUp.classList.add('fa-solid', 'fa-caret-up');
        caretUp.addEventListener('click', () => {
            product.count++;
            userBasket.count++;
            userBasket.total += parseFloat(productDetails.price);
            countP.textContent = `${product.count}`;
            productSubtotal.textContent = `$${(productDetails.price * product.count).toFixed(2)}`;
            updateCartButton.disabled = false;
        });

        const caretDown = document.createElement('i');
        caretDown.classList.add('fa-solid', 'fa-caret-down');
        caretDown.addEventListener('click', () => {
            if (product.count > 1) {
                product.count--;
                userBasket.count--;
                userBasket.total -= parseFloat(productDetails.price);
                countP.textContent = `${product.count}`;
                productSubtotal.textContent = `$${(productDetails.price * product.count).toFixed(2)}`;
                updateCartButton.disabled = false;
            } else if (product.count === 1) {
                productToDelete = product;
                cartItemToDelete = cartItem;
                productDetailsToDelete = productDetails;
                deleteModal.style.display = 'block';
            }
        });

        const productSubtotal = document.createElement('span');
        productSubtotal.classList.add('product-subtotal');
        productSubtotal.textContent = `$${(productDetails.price * product.count).toFixed(2)}`;

        countBtnDiv.appendChild(caretUp);
        countBtnDiv.appendChild(caretDown);
        countDiv.appendChild(countP);
        countDiv.appendChild(countBtnDiv);
        itemDetails.appendChild(productName);
        itemDetails.appendChild(productPrice);
        itemDetails.appendChild(countDiv);
        itemDetails.appendChild(productSubtotal);
        cartItem.appendChild(img);
        cartItem.appendChild(itemDetails);
        viewShop.appendChild(cartItem);
    }

    closeModal.addEventListener('click', () => {
        deleteModal.style.display = 'none';
    });

    cancelDeleteBtn.addEventListener('click', () => {
        deleteModal.style.display = 'none';
    });

    confirmDeleteBtn.addEventListener('click', async () => {
        userBasket.products = userBasket.products.filter(p => p.id !== productToDelete.id);
        userBasket.count -= productToDelete.count;
        userBasket.total -= (productDetailsToDelete.price * productToDelete.count);
        userBasket.total = Math.max(0, userBasket.total);

        viewShop.removeChild(cartItemToDelete);
        updateCartButton.disabled = false;
        deleteModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == deleteModal) {
            deleteModal.style.display = 'none';
        }
    });

    updateCartButton.addEventListener('click', async () => {
        await updateBasket(userBasket.id, userBasket);
        updateCartButton.disabled = true;
        originalTotal = userBasket.total;
        originalCount = userBasket.count;
        updateCartSummaryInView(userBasket.total, userBasket.count);
    });

    updateCartSummaryInView(userBasket.total, userBasket.count);
}

function updateCartSummaryInView(total, count) {
    const subtotalElement = document.querySelector('.subtotal');
    const totalElement = document.querySelector('.cart-totals .total');
    subtotalElement.textContent = `Ara Toplam: $${total.toFixed(2)}`;
    totalElement.textContent = `Toplam: $${total.toFixed(2)}`;
}
