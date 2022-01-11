/* CONTROLLERS POST || Logique métier pour post */

const fs = require('fs'); // file system

const Post = require('../models/post') // model post
const User = require('../models/user') // model user

exports.createPost = (async (req, res, next) => {
    try {

        if (req.body.content == '') { // verify null data
            res.status(400).json({ 
                message: 'Une publication ne peut pas être vide.'
            }) 
        }

        await Post.create({  // create post
            post_content: req.body.content,
            post_media: req.body.content && req.file
                ? `images/${req.file.filename}`
                : null,
            user_id: req.body.user_id
        })
        res.status(201).json({
            message: 'Publication partagée.',
        })
    } 
    catch (error) { 
        res.status(400).json({ 
            message: 'Impossible de partager la publication.',
        }) 
    };
});


exports.getAllPosts = (async (req, res, next) => {
    try {
        const posts = await Post.findAll({  // Retrieve all posts
            order: [
                ['id', 'DESC']
            ]
        })

        res.status(200).json(posts)
    } 
    catch (error) { res.status(400).json({ message: 'Impossible de récupérer les publications.', }) };
});

exports.getOwnerInfo = (async (req, res) => {
    try {
        const user = await User.findOne({  // Retrieve the user who owns the post
            where: { id: req.query.id }, 
            attributes: { exclude: ['id', 'password', 'email', 'description', 'role', 'createdAt', 'updatedAt']}
        })
        res.status(200).json(user)
    } catch (error) {
        return res.status(401).send({
            message: 'Impossible de récupérer les informations de l\'auteur.',
        })
    }
})

exports.getAllPostsUser = (async (req, res, next) => {
    try {
        const posts = await Post.findAll({ // retrieve all user posts
            where: { user_id: req.query.id },
            order: [
                ['id', 'DESC']
            ]
        })
        res.status(200).json(posts)
    } 
    catch (error) { res.status(400).json({ message: 'Impossible de récupérer les publications de l\'utilisateur.', }) };
});

exports.getOnePost = (async (req, res, next) => {
    try {
        const post = await Post.findOne({ where: { id: req.query.id }}) // get the single post
        const user = await User.findOne({ 
            where: { id: post.user_id }, 
            attributes: { exclude: ['id', 'password', 'email', 'description', 'role', 'createdAt', 'updatedAt']}
        })
        const data = {user, post}
        res.status(200).json(data)
    } 
    catch (error) { res.status(400).json({ message: 'Impossible de récupérer la publication.' }) }
});

exports.deletePost = (async (req, res, next) => { 
    try {

        const post = await Post.findOne({ where: { id: req.query.id } }) // retrieve the post by ID

        post.post_media 
            ? fs.unlink(post.post_media, () => { // Delete the image if it exists
                post.destroy() // delete post
                .then(() => res.status(201).json({ message: 'Publication supprimée.' }))         
            })
            : post.destroy() // delete post
                .then(() => res.status(201).json({ message: 'Publication supprimée.' }))
    } 
    catch (error) { res.status(400).json({ message: 'Imposssible de supprimer la publication.' }) }
});

exports.deleteAllPostsUser = (async (req, res, next) => {
    try { 

        const posts = await Post.findAll({  // Retrieve all posts for a user
            where: { user_id: req.query.id },
        })

        posts.forEach((post) => {

            post.post_media 
            ? fs.unlink(post.post_media, () => { // Delete the image if it exists, then publish
                post.destroy()
            })
            : post.destroy()

        })

        res.status(201).json({
            message: 'Publications supprimées.'
        })
    } 
    catch (error) { 
        res.status(400).json({ 
            message: 'Impossible de supprimer les publications.'
        }) 
    };
});