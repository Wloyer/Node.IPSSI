document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8000/technologie/technologie') 
    .then(response => response.json())
    .then(data => {
        const techTable = document.getElementById('techTable');
        data.forEach(tech => {
            let row = techTable.insertRow();
            let cellId = row.insertCell();
            let cellNomTechno = row.insertCell();
            let cellDateCreation = row.insertCell();
            let cellNomCreateur = row.insertCell();

            cellId.textContent = tech.id;
            cellNomTechno.textContent = tech.nom_techno;
            cellDateCreation.textContent = tech.date_Creation;
            cellNomCreateur.textContent = tech.nom_createur;
        });
    })
    .catch(error => {
        console.log('Erreur:', error);
    });
});
