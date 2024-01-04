const db = require('../database/database.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.GetAllUsers = async (req, res) => {
    try {
        const users = await db.query('SELECT * FROM utilisateur');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

exports.GetOneUser = async (req, res) => {
    try {
        const rows = await db.query('SELECT * FROM utilisateur WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Utilisateur inexistant" });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

exports.CreateUser = async (req, res) => {
    try {
        const { nom, prenom, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO utilisateur (nom, prenom, email, password) VALUES (?, ?, ?, ?)', [nom, prenom, email, hash]);
        res.status(201).json({ message: "Utilisateur créé avec succès"});
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

exports.UpdateUser = async (req, res) => {
    try {
        const { nom, prenom, email } = req.body;
        const result = await db.query('UPDATE utilisateur SET nom = ?, prenom = ?, email = ? WHERE id = ?', [nom, prenom, email, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Utilisateur inexistant" });
        }
        res.status(200).json({ message: "Utilisateur modifié avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

exports.DeleteUser = async (req, res) => {
    try {
        const result = await db.query('DELETE FROM utilisateur WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Utilisateur inexistant" });
        }
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

exports.CreateComment = async (req, res) => {
    try {
        const { texte, utilisateur_id, technologie_id } = req.body;
        await db.query('INSERT INTO commentaire (texte, utilisateur_id, technologie_id, message) VALUES (?, ?, ?, ?)', [texte, utilisateur_id, technologie_id, message]);
        res.status(200).json({ message: "Commentaire ajouté" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erreur lors de la création du commentaire' });
    }
}

exports.UserComments = async (req, res) => {
    try {
        const rows = await db.query('SELECT * FROM commentaire WHERE utilisateur_id = ?', [req.params.id]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}
exports.GetTechnologieComments = async (req, res) => {
    const technologieId = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM technologie WHERE id = ?", [technologieId]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

exports.GetAllCommentsBefore = async (req, res) => {
    const date = req.params
    try {
        const rows = await db.query('SELECT * FROM commentaire WHERE date_creation_commentaire < ?', [date]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

exports.Register = async(req, res)=> {
    // vérifier l'email de l'utilisateur
    const {nom, prenom, email, password, role } = req.body 
    const result = await db.query('select * from utilisateur where email = ?', [email])
    if(result.length > 0){
        return res.status(401).json({error: "utilisateur déjà existant"})
    }
    // utilisez bcrypt pour hasher le mdp
    const hashMDP = await bcrypt.hash(password, 10);
    // envoyer les infos (email, mdp hasher) en bdd

    await db.query('INSERT INTO utilisateur (nom, prenom, email, password, role ) VALUES (?, ?, ?, ?, ?)',
    [nom, prenom, email, hashMDP, role]
    )
    // renvoie jwt token pour la signature
    const token = jwt.sign({email}, process.env.SECRET_KEY, { expiresIn : '1h'})
    res.json({token})
}

exports.Login = async (req, res)=>{
    //verifier l'email de l'utilisateur  => récupéré le mot de passe
    const {email, password } = req.body;   
    const result = await db.query("SELECT * FROM utilisateur WHERE email = ?", [email]);
    if(result.length === 0){
        return res.status(401).json({ error: "Utilisateurs non trouvé" });
    }
    const client = result[0];
    console.log(client);
    // comparaison du mdp avec le mdp hasher en bdd avec bycrypt
    const SamePwd = await bcrypt.compare(password, client.password);
    if(!SamePwd){
        return res.status(401).json({ error: "Mot de passe incorrect" });
    }
    //renvoie jwt token pour la signature
     const token = jwt.sign(
        {  email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
    );
    res.json({ token ,"success": "vous êtes connecté"})
    
    
}