document.addEventListener("DOMContentLoaded", function () {
  // Vérifier le rôle de l'utilisateur
  if (!checkUserRole()) {
    window.location.href = "home.html"; // Redirection si le rôle n'est pas correct
    return;
  }

  // Récupérer les commentaires
  getComments();
});

function getComments() {
  fetch("http://localhost:8000/utilisateurs/commentaires", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("jwtToken"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Logique pour afficher les commentaires
    })
    .catch((error) => {
      console.error("Erreur:", error);
    });
}

function postComment() {
  let commentText = document.getElementById("commentText").value;

  fetch("http://localhost:8000/utilisateurs/crer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken"),
    },
    body: JSON.stringify({ text: commentText }),
  })
    .then((response) => {
      if (response.ok) {
        getComments();
      } else {
        throw new Error("Échec de la publication du commentaire");
      }
    })
    .catch((error) => {
      console.error("Erreur:", error);
    });
}

function checkUserRole() {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    console.log("acces refusé")
    return false;// Si aucun token n'est présent
  } 
  else {
    console.log("succes");
    return true;// Si un token est présent
    
  } 
  // try {
  //     const decoded = jwt_decode(token); // Utilisez une bibliothèque pour décoder le JWT
  //     return (decoded.role === 'journaliste' || decoded.role === 'administrateur');
  // } catch (error) {
  //     return false; // En cas d'erreur de décodage
  // }
}

// document.addEventListener('DOMContentLoaded', function() {
//     getComments();
//     checkUserRole();
// });

// function getComments() {
//     fetch('http://localhost:8000/utilisateurs/commentaires', {
//         method: 'GET',
//         headers: {
//             'Authorization': localStorage.getItem('jwtToken')
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         const commentsDiv = document.getElementById('comments');
//         data.forEach(comment => {
//             let p = document.createElement('p');
//             p.textContent = comment.text;
//             commentsDiv.appendChild(p);
//         });
//     })
//     .catch(error => {
//         console.error('Erreur:', error);
//     });
// }

// function postComment() {
//     let commentText = document.getElementById('commentText').value;

//     fetch('http://localhost:8000//utilisateurs/crer', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': localStorage.getItem('jwtToken')
//         },
//         body: JSON.stringify({ text: commentText })
//     })
//     .then(response => {
//         if (response.ok) {
//             getComments();
//         } else {
//             throw new Error('Échec de la publication du commentaire');
//         }
//     })
//     .catch(error => {
//         console.error('Erreur:', error);
//     });
// }

// function checkUserRole() {
//     const user = jwt_decode(localStorage.getItem('jwtToken'));
//     if (user.role === 'journaliste' || user.role === 'administrateur') {
//         document.getElementById('commentForm').style.display = 'block';
//     }
// }
