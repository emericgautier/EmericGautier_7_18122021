/* CONTROLLERS UTILISATEURS || Logique métier pour user */

const bcrypt = require('bcrypt') // hash passwords
const jwt = require('jsonwebtoken') // authentication token
const fs = require('fs'); // file system

const User = require('../models/user'); // // schéma de User

// Email & password rules
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})/;

/* Exports des fonctions */

// inscription utilisateur
exports.register = (async (req, res) => {
    try {
        
        if (req.body.name == null || req.body.email == null || req.body.password == null) {
            return res.status(400).json({  message: 'Les champs sont obligatoires.' })
        } // verify null data

        if (!EMAIL_REGEX.test(req.body.email)) {
            return res.status(400).json({ message: "Format adresse email invalide." });
        } // verify email rule

        if (!PASSWORD_REGEX.test(req.body.password)) {
            return res.status(401).json({
              message:
                "Le mot de passe doit contenir au moins 1 majuscule, 1 chiffre, 1 caractère spécial (!.@#$%^&*)",
            });
        } // verify password rule

        const hashed = await bcrypt.hash(req.body.password, 10) ////req.body.passssword = récupération du mot de passe saisi dans le frontend, 10 = salt = le nombre de tour de l'algorithme pour sécurisé
        const newUser = await User.create({ // Création d'un utilisateur
            name: req.body.name, 
            email: req.body.email, 
            password: hashed // assigne le hash obtenu à password
        })
        return res.status(200).json({  message: 'Utilisateur inscrit.' })
    } 
    catch (error) { return res.status(400).json({  message: 'Imposssible d\'inscrire l\'utilisateur.' })}
})

exports.login = (async (req, res) => {

    if (req.body.email == null || req.body.password == null) {
        return res.status(400).json({  message: 'Tous les champs sont obligatoires.' })
    } // verify null data
        
    const user = await User.findOne({ where: { email: req.body.email }}) // Récupération : utilisateur selon e-mail
        
    if (!user) {
        return res.status(404).send({
            message: 'Utilisateur inconnu, veuillez vérifier la saisie de votre identifiant.'
        })
    } // verify non-existent user

    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
                message: 'Mot de passe incorrect.'
        })
    } // Compare: hash password in database and incoming password

    const token = jwt.sign({id: user.id}, "secret")

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }) // set cookie

    res.send({
        message: 'Connexion réussie...'
    })
})

exports.getUserData = (async (req, res) => {
    try {

        const cookie = req.cookies['jwt']

        const queries = jwt.verify(cookie, "secret") // verify cookie

        const user = await User.findOne({ 
            where: { id: queries.id },
            attributes: { exclude: ['password', 'email', 'description', 'role', 'createdAt', 'updatedAt']}
        }) // retrieve user data via cookie

        const {password, ...data} = await user.toJSON()

        res.send(data)

    } catch (e) {
        return res.status(401).send({
            message: 'Impossible de récupérer les données de l\'utilisateur.',
        })
    }
})

exports.verifyUser = (async (req, res) => {
    try {

        const cookie = req.cookies['jwt']

        const queries = jwt.verify(cookie, "secret") // verify cookie

        const user = await User.findOne({ where: { id: queries.id }}) // retrieve user from cookie

        if (user.id != req.query.id && user.role != 'moderator') {
            return res.status(401).send()
        } // Allow if post owner, comment owner, profile owner or moderator
        
        return res.status(200).send()

    } catch (e) {
        return res.status(401).send()
    }
})

exports.logout = ((req, res) => {
    res.cookie('jwt', '', {maxAge: 0}) // unsubscribe cookie

    res.send({ message: 'Déconnexion réussie' })
})

exports.getProfile = (async (req, res, next) => {
    try {
        const user = await User.findOne({ 
            where: { name: req.query.username },
            attributes: { exclude: ['password', 'email', 'role', 'createdAt', 'updatedAt']}
        }) // retrieve user profile according to user name
        
        res.send(user)
    } 
    catch (error) { 
        res.status(400).json({ 
            message: 'Impossible de récupérer le profil de l\'utilisateur.'
        }) 
    };
})

exports.changePicture = (async (req, res, next) => {
    try {
        
        const user = await User.findOne({ 
            where: { name: req.query.username }
        }) // retrieve profile by username

        user.imageUrl && user.imageUrl != "images/profile_placeholder.png"// verify the presence of image (if yes, delete)
            ? fs.unlink(user.imageUrl, () => {})
            : null
        
        user.imageUrl = req.file // verify for image presence in request
            ? `images/${req.file.filename}`
            : null
            
        await user.save() // save user
        
        res.status(201).json({
            message: 'Photo de profil modifiée.',
        })
    } 
    catch (error) { 
        res.status(400).json({ 
            message: 'Impossible de modifier la photo de profil.'
        }) 
    };
});

exports.changeBanner = (async (req, res, next) => {
    try {
        
        const user = await User.findOne({ 
            where: { name: req.query.username }
        }) // Retrieve user by user name

        user.bannerUrl // verify the presence of banner in the DB (if so, delete)
            ? fs.unlink(user.bannerUrl, () => {})
            : null
        
        user.bannerUrl = req.file   // verify request for banner presence 
            ? `images/${req.file.filename}`
            : null
            
        await user.save() // Save user
        
        res.status(201).json({
            message: 'Bannière modifiée.',
        })
    } 
    catch (error) { 
        res.status(400).json({ 
            message: 'Impossible de modifier la photo de profil.'
        }) 
    };
});

exports.updateProfile = (async (req, res, next) => {
    try {
        
        const user = await User.findOne({ 
            where: { id: req.body.user_id }
        }) // Retrieve the user according to username

        user.description = req.body.description // Edit user description
            
        await user.save() // Save user profile
        
        res.status(201).json({
            message: 'Description mise à jour.'
        })
    } 
    catch (error) { 
        res.status(400).json({ 
            error: error,
            message: 'Impossible de mettre à jour la description.'
        }) 
    };
});

exports.deleteProfile = (async (req, res, next) => {
    try { 

        const cookie = req.cookies['jwt']

        const queries = jwt.verify(cookie, "secret") // verify Cookie

        const userRequesting = await User.findOne({ where: { id: queries.id } }) // Retrieve user according to cookie
        
        const userToDelete = await User.findOne({ where: { id: req.query.id } }) // Retrieve the user according to request

        if(userToDelete.imageUrl) {
            fs.unlink(userToDelete.imageUrl, () => {})
        } // delete profile picture

        if(userToDelete.bannerUrl) {
            fs.unlink(userToDelete.bannerUrl, () => {})
        } // delete banner
        
        switch (userRequesting.role) { // verify requestor
            case 'moderator': 
                userToDelete.destroy() // delete user
                    .then(() => res.status(201).json({ 
                        message: 'Utilisateur supprimé.',
                        role: 'moderator'
                    }))
                    .catch(error => res.status(400).json({ error }));
                break
            case 'user':
                userToDelete.destroy() // delete user
                    .then(() => {
                        res.cookie('jwt', '', {maxAge: 0}) // delete cookie
                        res.status(201).json({ 
                            message: 'Utilisateur supprimé.',
                            role: 'user'
                        })
                    })
                    .catch(error => res.status(400).json({ error }));
                break
        }      
    } 
    catch (error) { 
        res.status(400).json({ 
            error: error,
            message: 'Impossible de supprimer le profil.'
        }) 
    };
});