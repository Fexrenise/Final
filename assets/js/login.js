function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost:3000/users');
        return response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};

const insertUser = async (newUser) => {
    try {
        const users = await fetchUsers();
        const userExists = users.some(user => user.email === newUser.email);

        if (userExists) {
            alert("Username already exists!");
            return;
        }
        await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });
        alert("Registration successful!");
    } catch (error) {
        console.error('Error inserting user:', error);
    }
};

const removeUser = async (email) => {
    try {
        const users = await fetchUsers();
        const user = users.find(user => user.email === email);

        if (user) {
            await fetch(`http://localhost:3000/users/${user.id}`, {
                method: 'DELETE'
            });
            alert("User removed successfully!");
        } else {
            alert("User not found!");
        }
    } catch (error) {
        console.error('Error removing user:', error);
    }
};

document.getElementById('submitSignUp').addEventListener('click', async (e) => {
    e.preventDefault();
    const name = document.getElementById('fName').value;
    const surname = document.getElementById('lName').value;
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;

    const user = {
        id: generateGUID(),
        name,
        surname,
        email,
        password
    };

    await insertUser(user);
});

document.getElementById('submitSignIn').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = await fetchUsers();
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert("Login successful!");
        localStorage.setItem('loggedInUser', email);
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1000);
    } else {
        alert("Invalid username or password!");
    }
});



// Example usage for removing a user
document.getElementById('removeUser').addEventListener('click', async () => {
    const email = prompt("Enter the email of the user to remove:");
    if (email) {
        await removeUser(email);
    }
});
