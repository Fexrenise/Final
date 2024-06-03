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

document.querySelector('.productCount button').addEventListener('click', function() {
    // Kullanıcı giriş yapmış mı kontrol ediyoruz
    if (!isLoggedIn()) {
        // Kullanıcı giriş yapmamışsa, giriş yapma sayfasına yönlendiriyoruz
        window.location.href = 'login.html';
    } else {
        // Kullanıcı giriş yapmışsa, sepete ürünü eklemek için gerekli işlemleri gerçekleştiriyoruz
        // Burada sepete ürün ekleme işlemlerini gerçekleştirebilirsiniz
        
    }
});

// Sepete ürün eklemek için gerekli işlemleri gerçekleştiren fonksiyon

// Count artırma ve azaltma işlemleri için caret-up ve caret-down elementlerine tıklama olayını dinleyen fonksiyon
document.querySelectorAll('.countBtn i').forEach(function(icon) {
    icon.addEventListener('click', function() {
        // Count değerini alın
        var countElement = document.querySelector('.count p');
        var count = parseInt(countElement.textContent);

        // Eğer caret-up ikonuna tıklandıysa count artırın, caret-down ikonuna tıklandıysa count azaltın
        if (icon.classList.contains('fa-caret-up')) {
            count++;
        } else if (icon.classList.contains('fa-caret-down')) {
            if (count > 1) {
                count--;
            }
        }

        // Yeni count değerini güncelleyin
        countElement.textContent = count;
    });
});
