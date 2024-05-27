//Burger menu
const burgerMenu = document.querySelector('.burgerMenu');
const burgerNav = document.querySelector('.burgerNav');
const close = document.querySelector('.fa-xmark');
burgerMenu.addEventListener('click',()=>{
    burgerNav.style.display ='initial';
    close.addEventListener('click',()=>{
        burgerNav.style.display ='none';
    })
    window.addEventListener('click', function(e){
        if (e.target === burgerNav){
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




