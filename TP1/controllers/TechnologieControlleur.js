const db = require('../database/database.js')

require('dotenv').config();

exports.GetAllTechnology = async (req, res) => {
    try {
        const tech = await db.query('SELECT * FROM technologie');
        res.status(200).json(tech);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

exports.GetOneTechnology = async (req, res) => {
    try {
        const rows = await db.query('SELECT * FROM technologie WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "technologie inexistant" });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

exports.CreateTechnology = async (req, res) => {
    try {
        const { nom_techno,  nom_createur} = req.body;
        await db.query('INSERT INTO technologie (nom_techno,  nom_createur) VALUES (?, ?)', [nom_techno, nom_createur]);
        res.status(201).json({ message: "technologie créé avec succès"});
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

exports.UpdateTechnology = async (req, res) => {
    try {
        const { nom_techno, date_Creation, nom_createur } = req.body;
        const result = await db.query('UPDATE utilisateur SET nom_techno = ?, date_Creation = ?, nom_createur = ? WHERE id = ?', [nom_techno, date_Creation, nom_createur, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "UTechnologie inexistant" });
        }
        res.status(200).json({ message: "Technologie modifié avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

exports.DeleteTechnology = async (req, res) => {
    try {
        const result = await db.query('DELETE FROM technologie WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Technologie inexistant" });
        }
        res.status(200).json({ message: "Technologie supprimé avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

// exports.CreateTechnology = async (req, res) => {
//     try {
//         const { texte, utilisateur_id, technologie_id } = req.body;
//         await db.query('INSERT INTO commentaire (texte, utilisateur_id, technologie_id) VALUES (?, ?, ?)', [texte, utilisateur_id, technologie_id]);
//         res.status(200).json({ message: "Commentaire ajouté" });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Erreur lors de la création du commentaire' });
//     }
// }

// exports.UserComments = async (req, res) => {
//     try {
//         const rows = await db.query('SELECT * FROM commentaire WHERE utilisateur_id = ?', [req.params.id]);
//         res.status(200).json(rows);
//     } catch (err) {
//         res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
// }
// exports.GetTechnologieComments = async (req, res) => {
//     const technologieId = req.params;
//     try {
//         const [rows] = await db.query("SELECT * FROM technologie WHERE id = ?", [technologieId]);
//         res.status(200).json(rows);
//     } catch (err) {
//         res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
// }

// exports.GetAllCommentsBefore = async (req, res) => {
//     const date = req.params
//     try {
//         const rows = await db.query('SELECT * FROM commentaire WHERE date_creation_commentaire < ?', [date]);
//         res.status(200).json(rows);
//     } catch (err) {
//         res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
// }