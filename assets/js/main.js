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

fetch('../../db/product.json')
    .then((res) => res.json())
    .then((data) => {
        data.forEach((item) => {
            if (item.categoryId === pathToCategoryId[currentPath]) {
                const productItem = document.createElement('div');
                body.appendChild(productItem);
                productItem.classList.add('product');
                const img = document.createElement('img');
                img.src = `./assets/img/${item.url}`;
                productItem.appendChild(img);
                let catagory = document.createElement('p');
                productItem.appendChild(catagory);
                catagory.classList.add('catagory');
                catagory.textContent = item.catagory;
                let link = document.createElement('a');
                // link.setAttribute('href');
                link.href ='product-detail.html'
                productItem.appendChild(link);
                let productName = document.createElement('h2');
                link.appendChild(productName);
                productName.textContent = item.name;
                let price = document.createElement('span');
                productItem.appendChild(price);
                price.classList.add('price');
                price.textContent = `$${item.price}`
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
                cartShop.appendChild(shop);
                const basket = document.createElement('i');
                basket.classList.add('fa-solid', 'fa-cart-shopping');
                shop.appendChild(basket);
            }
        })
    })


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
productTab.forEach((item,index)=>{
    item.addEventListener('click',(event)=>{
        event.preventDefault();
        productTab.forEach((e)=>{
            e.classList.remove('active');
        })
        subInfo.forEach((e)=>{
            e.classList.remove('active');
        })
        item.classList.add('active');
        subInfo[index].classList.add('active');
        
    })
})



// product detain starlari
const rating = document.querySelectorAll('#rating i');
rating.forEach((item)=>{
    
    item.addEventListener('click',()=>{
        
        item.classList.add('fa-solid','fa-star');
        item.style.color = 'gold'
    })
})

// Function to check if a user is logged in
function isLoggedIn() {
    return localStorage.getItem('loggedInUser') !== null;
}

document.addEventListener('click', function(event) {
    if (event.target.closest('.shop')) {
        event.preventDefault();
        if (!isLoggedIn()) {    
            alert('You must be logged in to add items to the basket!');
            window.location.href = 'login.html'; // Redirect to login section
        } 
    }
});

document.getElementById('logout').addEventListener('click', () => {
    console.log('salam');
    localStorage.removeItem('loggedInUser');
    alert("Logged out successfully!");
    window.location.href = 'home.html';
});

