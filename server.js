const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function lireFichier() {
  const data = fs.readFileSync('celebrites.json', 'utf8');
  return JSON.parse(data);
}

function afficherListe() {
  const celebrities = lireFichier();
  console.log('Liste des personnes célèbres :');
  celebrities.forEach(personne => {
    console.log(`${personne.nom} ${personne.prenom}, ${personne.age} ans`);
  });
  rl.close();
}

function ajouterPersonne() {
  const celebrities = lireFichier();
  rl.question('Veuilliez entrez un nom de celebriter : ', (nom) => {  
    rl.question('Veuilliez entrez un prenom de celebriter : ', (prenom) => {
      rl.question('Veuilliez entrez un age de celebriter : ', (age) => {
        const personne = { nom, prenom, age };
        celebrities.push(personne);
        fs.writeFileSync('celebrites.json', JSON.stringify(celebrities));
        console.log(`${personne.nom} ${personne.prenom}, ${personne.age} ans`);
        rl.close();
      })
    })
  })
}

function main() {
  console.log('Bienvenue dans le gestionnaire de célébrités !');
  console.log('1. Afficher la liste des personnes célèbres');
  console.log('2. Ajouter une personne célèbre');
  rl.question('Veuillez choisir une option (1, ou 2) : ', (choix) => {
    choix = parseInt(choix);

    switch (choix) {
      case 1:
        afficherListe();
        break;
      case 2:
        console.log("haha")
        ajouterPersonne();
        break;
      default:
        console.log('Option invalide. Veuillez choisir une option valide.');
        rl.close();
    }
  });
}

main()