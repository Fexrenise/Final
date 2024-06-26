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
        subInfo[index].classList.toggle('active');

    })
})


// product detain starlari
const rating = document.querySelectorAll('#rating i');

rating.forEach((item) => {
    item.addEventListener('click', () => {
        if (item.classList.contains('fa-solid')) {
            item.classList.remove('fa-solid');
            item.classList.add('fa-regular');
            item.style.color = 'grey';
        } else {
            item.classList.remove('fa-regular');
            item.classList.add('fa-solid');
            item.style.color = 'gold';
        }
    });
});


//detail product

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

document.addEventListener('DOMContentLoaded', () => {

    fetch('http://localhost:3000/products')
        .then(async (res) => {
            const data = await res.json();
            const product = data.find(item => item.id == Number(productId));
            if (product) {
                document.querySelector('.check p').innerHTML = `“${product.name}” has been added to your cart.`
                const categoryNav = document.querySelector('.categoryNav nav');
                categoryNav.innerHTML = `<a href="home.html">Home</a>&nbsp;/&nbsp;
                    <a href="${product.categoryUrl}">${product.category}</a>&nbsp;/&nbsp;${product.name}`;
                document.querySelector('.product img').src = `./assets/img/${product.url}`;
                document.querySelector('.productName h1').textContent = product.name;
                document.querySelector('.productPrice p').innerHTML = `$<span id="price">${product.price}</span> <span>+ Free Shipping</span>`;
                document.querySelector('.productInfo .category').innerHTML = `<span>Categories: <a href="${product.categoryUrl}">${product.category}</a></span>`
                const imgUrl = `./assets/img/${product.url}`;
                document.getElementById('myimage').onload = function () {
                    magnify("myimage", 2, imgUrl);
                };
            }
        });
});

document.querySelector('.productCount button').addEventListener('click', function() {
    if (!isLoggedIn()) {
        alert('Səbətə əşyalar əlavə etmək üçün daxil olmalısınız!');
        window.location.href = 'login.html';
        return;
    } else {
        const count = document.getElementById('count').textContent
        const price = document.getElementById('price').textContent
        const item = {
            id: Number(productId),
            price: Number(price)
        };
       addItemToBasket(item, Number(count))
    }
});

document.querySelectorAll('.countBtn i').forEach(function(icon) {
    icon.addEventListener('click', function() {
        var countElement = document.querySelector('.count p');
        var count = parseInt(countElement.textContent);
        if (icon.classList.contains('fa-caret-up')) {
            count++;
        } else if (icon.classList.contains('fa-caret-down')) {
            if (count > 1) {
                count--;
            }
        }
        countElement.textContent = count;
    });
});
