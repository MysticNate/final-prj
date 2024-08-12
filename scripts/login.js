document.addEventListener('DOMContentLoaded', function () {
    // Initial users
    const users = [
        { username: 'Giora', password: 'the drunk russian' },
        { username: 'Nati', password: 'the nigga thief' },
        { username: 'Waseem', password: 'the arab terrorist' }
    ];

    // Check if users are already in Local Storage
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    const loginForm = document.querySelector('#loginForm');
    const errorMessage = document.querySelector('#errorMessage');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const storedUsers = JSON.parse(localStorage.getItem('users'));

        // Check login details
        const user = storedUsers.find(user => user.username === username && user.password === password);

        if (user) {
            window.location.href = '../pages/main.html';
        } else {
            errorMessage.textContent = 'Invalid username or password';
        }
    });
});
