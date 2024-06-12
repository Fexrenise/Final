//Burger menu
const burgerMenu = document.querySelector('.burgerMenu');
const burgerNav = document.querySelector('.burgerNav');
burgerMenu.addEventListener('click', () => {
    burgerNav.style.display = 'initial';
    const close = document.querySelector('.fa-xmark');

    close.addEventListener('click', () => {
        burgerNav.style.display = 'none';
    })
    window.addEventListener('click', function (e) {
        if (e.target === burgerNav) {
            burgerNav.style.display = 'none';
        }
    })
})

// her seyfeye kecid etdikde navin active clasii deyisir
const navLinks = document.querySelectorAll('.navList li a');
const currentPath = window.location.pathname;

navLinks.forEach(link => {
    if (link.pathname === currentPath) {
        link.classList.add('active');
    }
});

// productlari bize cixarir
const body = document.querySelector('.products');
const pathToCategoryId = {
    '/body.html': 1,
    '/hair.html': 2,
    '/skin.html': 3,
    '/gifts.html': 4,
};


fetch('http://localhost:3000/products')
    .then(async (res) => {
        const data = await res.json();
        data.forEach((item) => {
            if (item.categoryId === pathToCategoryId[currentPath]) {
                const productItem = document.createElement('div');
                body.appendChild(productItem);
                productItem.classList.add('product');

                const img = document.createElement('img');
                img.src = `./assets/img/${item.url}`;
                productItem.appendChild(img);

                let category = document.createElement('p');
                productItem.appendChild(category);
                category.classList.add('category');
                category.textContent = item.category;

                let link = document.createElement('a');
                link.href = `product-detail.html?id=${item.id}`;
                productItem.appendChild(link);

                let productName = document.createElement('h2');
                link.appendChild(productName);
                productName.textContent = item.name;

                let price = document.createElement('span');
                productItem.appendChild(price);
                price.classList.add('price');
                price.textContent = `$${item.price}`;

                const cartShop = document.createElement('div');
                cartShop.classList.add('cartShop');
                productItem.appendChild(cartShop);

                const addToCart = document.createElement('div');
                addToCart.classList.add('addtocart');
                cartShop.appendChild(addToCart);

                const add = document.createElement('div');
                add.classList.add('add');
                add.textContent = 'Add to cart';
                addToCart.appendChild(add);

                const triangle = document.createElement('div');
                triangle.classList.add('triangle');
                addToCart.appendChild(triangle);

                const shop = document.createElement('div');
                shop.classList.add('shop');
                shop.setAttribute('data-item-id', item.id);
                shop.setAttribute('data-item-price', item.price);
                cartShop.appendChild(shop);

                const basket = document.createElement('i');
                basket.classList.add('fa-solid', 'fa-cart-shopping');
                shop.appendChild(basket);
            }
        });
    });


//shopCart 
const shopHead = document.querySelector('.shopHead');
const shop = document.querySelector('.mainShop');

shop.addEventListener('click', () => {

    shopHead.style.display = 'initial';
    const close = document.querySelector('.cartTitle i');

    close.addEventListener('click', () => {
        shopHead.style.display = 'none';
    })
    window.addEventListener('click', function (e) {
        if (e.target === shopHead) {
            shopHead.style.display = 'none';
        }
    })
})


//Product Detaildaki tab menu

const productTab = document.querySelectorAll('.productTab ul li');
const subInfo = document.querySelectorAll('.subInfo div');
productTab.forEach((item, index) => {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        productTab.forEach((e) => {
            e.classList.remove('active');
        })
        subInfo.forEach((e) => {
            e.classList.remove('active');
        })
        item.classList.add('active');
        subInfo[index].classList.add('active');

    })
})



// product detain starlari
const rating = document.querySelectorAll('#rating i');
rating.forEach((item) => {

    item.addEventListener('click', () => {

        item.classList.add('fa-solid', 'fa-star');
        item.style.color = 'gold'
    })
})

// İstifadəçinin daxil olub-olmadığını yoxlamaq 
function isLoggedIn() {
    return localStorage.getItem('loggedInUser') !== null;
}

function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//baskete elave etme
async function fetchBaskets() {
    try {
        const response = await fetch('http://localhost:3000/baskets');
        return await response.json();
    } catch (error) {
        console.error('Error fetching baskets:', error);
        return [];
    }
}

async function insertBasket(newBasket) {
    try {
        await fetch('http://localhost:3000/baskets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBasket)
        });
    } catch (error) {
        console.error('Error inserting basket:', error);
    }
}

async function updateBasket(basketId, updatedBasket) {
    try {
        await fetch(`http://localhost:3000/baskets/${basketId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBasket)
        });
    } catch (error) {
        console.error('Error updating basket:', error);
    }
}

async function addItemToBasket(item, count = 1) {
    if (!isLoggedIn()) {
        alert('Səbətə əşyalar əlavə etmək üçün daxil olmalısınız!');
        window.location.href = 'login.html';
        return;
    }

    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const users = await fetch('http://localhost:3000/users').then(res => res.json());
    const loggedInUser = users.find(user => user.email === loggedInUserEmail);

    if (!loggedInUser) {
        alert('Daxil olmuş istifadəçi tapılmadı!');
        return;
    }

    const baskets = await fetchBaskets();
    let userBasket = baskets.find(basket => basket.userId === loggedInUser.id);
    if (!userBasket) {
        userBasket = {
            id: generateGUID(),
            userId: loggedInUser.id,
            products: [],
            count: 0,
            total: 0
        };
        await insertBasket(userBasket);
    }

    const existingProduct = userBasket.products.find(product => product.id === item.id);

    if (existingProduct) {
        existingProduct.count += count;
    } else {
        userBasket.products.push({
            id: item.id,
            count: count
        });
    }

    userBasket.count += count;
    userBasket.total += (item.price * count);

    await updateBasket(userBasket.id, userBasket);
    alert('Element səbətə uğurla əlavə edildi!');
}




async function updateProductCount(productId, countChange) {
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const users = await fetch('http://localhost:3000/users').then(res => res.json());
    const loggedInUser = users.find(user => user.email === loggedInUserEmail);

    if (!loggedInUser) {
        alert('Daxil olmuş istifadəçi tapılmadı!');
        return;
    }

    const baskets = await fetchBaskets([]);
    let userBasket = baskets.find(basket => basket.userId === loggedInUser.id);

    if (!userBasket) return;

    const product = userBasket.products.find(p => p.id === productId);

    if (!product) return;

    product.count += countChange;
    if (product.count <= 0) {
        userBasket.products = userBasket.products.filter(p => p.id !== productId);
    } else {
        userBasket.total += (product.price * countChange);
    }

    userBasket.count += countChange;

    await updateBasket(userBasket.id, userBasket);
    renderCartItems(userBasket.products);
}

// Dummy function definitions for fetchBaskets, generateGUID, insertBasket, updateBasket, and isLoggedIn
async function fetchBaskets() {
    return fetch('http://localhost:3000/baskets').then(res => res.json());
}


document.addEventListener('click', function (event) {
    if (event.target.closest('.shop')) {
        event.preventDefault();
        const shopElement = event.target.closest('.shop');
        const itemId = parseInt(shopElement.getAttribute('data-item-id'));
        const itemPrice = parseFloat(shopElement.getAttribute('data-item-price'));

        const item = {
            id: itemId,
            price: itemPrice
        };
        addItemToBasket(item);
    }
});

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    alert("Logged out successfully!");
    window.location.href = 'home.html';
});

async function fetchProductById(productId) {
    try {
        const response = await fetch(`http://localhost:3000/products/${productId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

function createRemoveIcon(productId, price, listItem) {
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fa-solid', 'fa-xmark');
    closeIcon.addEventListener('click', async () => {
        try {
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


            const productIndex = basket.products.findIndex(p => p.id == productId);
            const product = basket.products.find(p => p.id == productId);

            if (productIndex !== -1) {
                basket.products.splice(productIndex, 1);
                basket.count -= product.count;

                basket.total -= product.count * price >= basket.total ? basket.total : product.count * price;

                await fetch(`http://localhost:3000/baskets/${basket.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(basket)
                });

                listItem.remove();

                updateCartSummary();
            }
        } catch (error) {
            console.error('Error removing product from basket:', error);
        }
    });

    return closeIcon;
}

async function handleMainShopClick() {
    const mainShop = document.querySelector('.mainShop');

    if (!mainShop) {
        return;
    }

    const baskets = await fetchBaskets();
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const users = await fetch('http://localhost:3000/users').then(res => res.json());
    const loggedInUser = users.find(user => user.email === loggedInUserEmail);
    const userBasket = baskets.find(basket => basket.userId === loggedInUser.id);

    const cartList = document.getElementById('cartProducts');

    for (const product of userBasket.products) {
        const productDetails = await fetchProductById(product.id);

        if (!productDetails) {
            continue;
        }

        const listItem = document.createElement('li');
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img');
        const img = document.createElement('img');
        img.src = `./assets/img/${productDetails.url}`;
        img.alt = productDetails.name;
        imgDiv.appendChild(img);
        listItem.appendChild(imgDiv);

        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        const productName = document.createElement('h5');
        productName.textContent = productDetails.name;
        const quantityDiv = document.createElement('div');
        quantityDiv.classList.add('quantity');
        quantityDiv.innerHTML = `<span>${product.count}</span> x <span>$${productDetails.price}</span>`;
        productDiv.appendChild(productName);
        productDiv.appendChild(quantityDiv);
        listItem.appendChild(productDiv);

        const closeDiv = document.createElement('div');
        closeDiv.classList.add('close');
        const closeIcon = createRemoveIcon(productDetails.id, productDetails.price, listItem);
        closeDiv.appendChild(closeIcon);
        listItem.appendChild(closeDiv);
        cartList.appendChild(listItem);
    }
    const subTotal = document.getElementById('subTotal');
    subTotal.textContent = `$${userBasket.total.toFixed(2)}`;
}


async function updateCartSummary() {
    if (!isLoggedIn()) {
        return;
    }

    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const users = await fetch('http://localhost:3000/users').then(res => res.json());
    const loggedInUser = users.find(user => user.email === loggedInUserEmail);

    if (!loggedInUser) {
        return;
    }

    const baskets = await fetchBaskets();
    const userBasket = baskets.find(basket => basket.userId === loggedInUser.id);

    if (!userBasket) {
        return;
    }

    const totalPriceElement = document.getElementById('totalPrice');
    const totalCountElement = document.getElementById('totalCount');

    totalPriceElement.textContent = `$${userBasket.total.toFixed(2)}`;
    totalCountElement.textContent = userBasket.count;
}



document.addEventListener('DOMContentLoaded', () => {
    updateCartSummary();
    handleMainShopClick();
    handleMainShopView();
});