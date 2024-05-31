document.getElementById('submitSignUp').addEventListener('click', () => {
    
    const name = document.getElementById('fName').value;
    const surname = document.getElementById('lName').value;
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;

    if (localStorage.getItem(email)) {
        Toastify({
            text: "Username already exists!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
        }).showToast();
        document.getElementById('signUpMessage').textContent = 'Username already exists!';
        document.getElementById('signUpMessage').style = null;
    } else {
        localStorage.setItem(email, JSON.stringify({
            name: name,
            surname: surname,
            password: password
        }));
        Toastify({
            text: "Registration successful!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
        }).showToast();
        document.getElementById('signUpMessage').textContent = 'Registration successful!';
        document.getElementById('signUpMessage').style = null;
    }
   
});

document.getElementById('submitSignIn').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = JSON.parse(localStorage.getItem(email));

    if (userData && userData.password === password) {
        Toastify({
            text: "Login successful!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
        }).showToast();
        localStorage.setItem('loggedInUser', email);
        document.getElementById('signInMessage').textContent = 'Login successful!';
        document.getElementById('signInMessage').style = null;
        

        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1000);
    } else {
        Toastify({
            text: "Invalid username or password!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
        }).showToast();
        document.getElementById('signInMessage').textContent = 'Invalid username or password!';
        document.getElementById('signInMessage').style = null;
    }
});
