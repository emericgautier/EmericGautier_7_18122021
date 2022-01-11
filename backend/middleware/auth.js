/* MIDDLEWARE D'AUTHENTIFICATION || Protège les routes sélectionnées et vérifie que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes */

const jwt = require('jsonwebtoken'); // créer et vérifier les tokens d'authentification

const User = require('../models/user'); // Schéma de User

module.exports = (async (req, res, next) => {
    try {

        const cookie = req.cookies['jwt']

        const queries = jwt.verify(cookie, "secret") // verify cookie

        if (!queries) {
            return res.status(401).send({
                message: 'Vous devez être connecté.'
            })
        }

        await User.findOne({ where: { id: queries.id }}) // retrieve user from cookie

        next()

    } catch (e) {
        return res.status(401).send({
            message: 'Vous devez être connecté.'
        })
    }
})
