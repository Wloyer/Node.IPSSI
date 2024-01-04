const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../database/database');

exports.authenticator = (req, res, next) =>{
    // récupérer le token
    const token = req.params.token ? req.params.token : req.headers.authorization
    if(token && process.env.SECRET_KEY){
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            // si problème => erreur
            if(err){
                res.status(401).json({erreur: "accès refusé"})
            }
            // décoder => next()
            else{
                req.user = decoded;
                next()
            }
        })
    }else{
        res.status(401).json({erreur: "accès refusé"})
    }
}

exports.roleChecker = () => {
    return (req, res, next) => {
        const Role = req.user.role;
        if (Role !== 'journaliste' && Role !== 'administrateur') {
            return res.status(403).json({ message: 'Accès refusé role' });
        }
        next();
    };
};
