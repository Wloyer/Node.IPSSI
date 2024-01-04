document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var nom = document.getElementById('nom').value;
    var prenom = document.getElementById('prenom').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    // Récupérez le rôle si nécessaire

    fetch('http://localhost:8000/utilisateurs/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nom: nom, prenom: prenom, email: email, password: password, role: 'journaliste' }) 
    })
    .then(response => {
        if(response.ok) {
            window.location.href = 'home.html'; // Redirection vers home.html
        } else {
            throw new Error('Inscription échouée');
        }
    })
    .catch(error => {
        console.error('Erreur lors de l\'inscription:', error);
    });
});
