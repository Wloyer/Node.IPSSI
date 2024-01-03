const express = require('express');
const router = express.Router();
const db = require('./database'); 



router.get('/', async (req, res) => {
    try {
        const users = await db.query('SELECT * FROM utilisateur');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const rows = await db.query('SELECT * FROM utilisateur WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Utilisateur inexistant" });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { nom, prenom, email } = req.body;
        const result = await db.query('INSERT INTO utilisateur (nom, prenom, email) VALUES (?, ?, ?)', [nom, prenom, email]);
        const userId = result.insertId.toString();
        res.status(201).json({ message: "Utilisateur créé avec succès", userId: userId });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { nom, prenom, email } = req.body;
        const result = await db.query('UPDATE utilisateur SET nom = ?, prenom = ?, email = ? WHERE id = ?', [nom, prenom, email, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Utilisateur inexistant" });
        }
        res.json({ message: "Utilisateur modifié avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM utilisateur WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Utilisateur inexistant" });
        }
        res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});



router.post('/utilisateurs/:utilisateurId/commentaires', async (req, res) => {
    try {
        const { utilisateurId } = req.params;
        const { technologieId, texte } = req.body;
        const result = await db.query(
            'INSERT INTO commentaire (utilisateur_id, technologie_id, texte, date_creation_commentaire) VALUES (?, ?, ?, NOW())',
            [utilisateurId, technologieId, texte]
        );
        res.status(201).json({ message: "Commentaire créé avec succès", commentaireId: result[0].insertId });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

router.get('/technologies/:id/commentaires', (req, res) => {
    const sql = 'SELECT * FROM commentaire WHERE technologieId = ?';
    db.query(sql, [req.params.id], (err, results) => {
      if (err) throw err;
      res.status(200).json(results);
    });
  });


router.get('/commentaires/avant/:date', (req, res) => {
    const sql = 'SELECT * FROM commentaire WHERE date_creation_commentaire < ?';
    db.query(sql, [req.params.date], (err, results) => {
      if (err) throw err;
      res.status(200).json(results);
    });
});
module.exports = router;
