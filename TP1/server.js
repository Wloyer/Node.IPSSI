const express = require('express')
const app = express()
const cors = require('cors')

const utilisateursRoute = require('./routes/utilisateursRoute')
const technologieRoute = require('./routes/technologieRoute')

//middleware
app.use(express.json())
app.use(cors())                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            


app.use('/utilisateurs', utilisateursRoute)
app.use('/technologie', technologieRoute)

app.listen(8000, function(){
    console.log(`Server ouvert sur 8000`);
})

// app.get("/", (req,res) => {
//     res.status(200, {"content-Type": "text/html;"}).send("<h1>API REST</h1>");
// })

//tout les utilisateurs

// app.get('/utilisateurs', async (req, res) => {
//     try {
//         const users = await db.query('SELECT * FROM utilisateur');
//         res.status(200).json(users);
//     } catch (err) {
//         res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
// });

//un utilisateur
    
// app.get('/utilisateurs/:id', async (req, res) => {
//     try {
//         const rows = await db.query('SELECT * FROM utilisateur WHERE id = ?', [req.params.id]);
//         if (rows.length === 0) {
//             return res.status(404).json({ message: "Utilisateur inexistant" });
//         }
//         res.status(200).json(rows[0]);
//     } catch (err) {
//         res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
// });

//créer un utilisateur

// app.post('/utilisateurs/crer', async (req, res) => {
//     try {
//         const { nom, prenom, email } = req.body;
//         await db.query('INSERT INTO utilisateur (nom, prenom, email) VALUES (?, ?, ?)', [nom, prenom, email]);
//         res.status(201).json({ message: "Utilisateur créé avec succès"});
//     } catch (err) {
//         res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
// });


//modifier un utilisateur

// app.put('/utilisateurs/:id', async (req, res) => {
//     try {
//         const { nom, prenom, email } = req.body;
//         const result = await db.query('UPDATE utilisateur SET nom = ?, prenom = ?, email = ? WHERE id = ?', [nom, prenom, email, req.params.id]);
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "Utilisateur inexistant" });
//         }
//         res.status(200).json({ message: "Utilisateur modifié avec succès" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
// });

//supprimer un utilisateur

// app.delete('/utilisateurs/:id', async (req, res) => {
//     try {
//         const result = await db.query('DELETE FROM utilisateur WHERE id = ?', [req.params.id]);
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "Utilisateur inexistant" });
//         }
//         res.json({ message: "Utilisateur supprimé avec succès" });
//     } catch (err) {
//         res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
// });

//crer un commentaire

// app.post('/utilisateurs/commentaires', async (req, res) => {
//     try {
//         const { texte, utilisateur_id, technologie_id } = req.body;
//         await db.query('INSERT INTO commentaire (texte, utilisateur_id, technologie_id) VALUES (?, ?, ?)', [texte, utilisateur_id, technologie_id]);
//         res.status(200).json({ message: "Commentaire ajouté" });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Erreur lors de la création du commentaire' });
//     }
// });


//tout les commentaires d'une techno

// app.get("/commentaire/technologie/:technologieId", async (req, res) => {
//     const technologieId = req.params;
//     try {
//         const [rows] = await db.query("SELECT * FROM technologie WHERE id = ?", [technologieId]);
//         res.status(200).json(rows);
//     } catch (err) {
//         res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
// });


//tout les commentaires d'un utilisateur


// app.get('/utilisateurs/commentaires/:id', async (req, res) => {
//     try {
//         const rows = await db.query('SELECT * FROM commentaire WHERE utilisateur_id = ?', [req.params.id]);
//         res.status(200).json(rows);
//     } catch (err) {
//         res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
// });


//tout les commentaires avant une date

// app.get('/commentaires/avant/:date', async (req, res) => {
//     const date = req.params
//     try {
//         const rows = await db.query('SELECT * FROM commentaire WHERE date_creation_commentaire < ?', [date]);
//         res.status(200).json(rows);
//     } catch (err) {
//         res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
// });



