// login.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch('http://localhost:8000/utilisateurs/login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('jwtToken', data.token);
            alert("Vous êtes connecté");
        } else {
            alert("Erreur de connexion");
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
});
