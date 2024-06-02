document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    fetch('../../db/product.json')
        .then((res) => res.json())
        .then((data) => {
            const product = data.find(item => item.id === Number(productId));

            if (product) {
                document.querySelector('.check p').innerHTML = `“${product.name}” has been added to your cart.`
                const categoryNav = document.querySelector('.categoryNav nav');
                categoryNav.innerHTML = `<a href="home.html">Home</a>&nbsp;/&nbsp;
                    <a href="${product.categoryUrl}">${product.category}</a>&nbsp;/&nbsp;${product.name}`;
                document.querySelector('.product img').src = `./assets/img/${product.url}`;
                document.querySelector('.productName h1').textContent = product.name;
                document.querySelector('.productPrice p').innerHTML = `$${product.price} <span>+ Free Shipping</span>`;
                document.querySelector('.productInfo .category').innerHTML = `<span>Categories: <a href="${product.categoryUrl}">${product.category}</a></span>`
                const imgUrl = `./assets/img/${product.url}`;
                document.getElementById('myimage').onload = function () {
                    magnify("myimage", 2, imgUrl);
                };
            }
        });
});