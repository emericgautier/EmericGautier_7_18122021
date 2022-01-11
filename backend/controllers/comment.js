/* CONTROLLERS COMMENT || Logique métier pour comment */

const fs = require('fs') // file system

const Comment = require('../models/comment') // model comment

exports.createComment = (async (req, res, next) => {
    try {
        
        if (req.body.content == '') { // verify 'null' data input
            res.status(400).json({ 
                message: 'Un commentaire ne peut pas être vide.'
            }) 
        }

        await Comment.create({  // create comment
            comment_content: req.body.content,
            comment_media: req.body.content && req.file
                ? `images/${req.file.filename}`
                : null,
            user_id: req.body.user_id,
            post_id: req.body.post_id
        })
        res.status(201).json({
            message: 'Commentaire publié.'
        })
    } 
    catch (error) { 
        res.status(400).json({ 
            message: 'Impossible de publier le commentaire.'
        }) 
    };
});

exports.getCommentsFromPost = (async (req, res, next) => {
    try {
        const comments = await Comment.findAll({  // Retrieve all comments for a post
            where: { post_id: req.query.id }, 
            order: [
                ['id', 'DESC']
            ]
        })
        res.status(200).json(comments)
    } 
    catch (error) { res.status(400).json({ 
        message: 'Impossible de récupérer les commentaires.'
    }) };
});

exports.getCommentsFromUser = (async (req, res, next) => { 
    try {
        const comments = await Comment.findAll({ // Retrieve all comments from a user
            where: { user_id: req.query.id },
            order: [
                ['id', 'DESC']
            ]
        })
        res.status(200).json(comments)
    } 
    catch (error) { res.status(400).json({ message: 'Impossible de récupérer les commentaires de l\'utilisateur.', }) };
});

exports.deleteCommentsFromUser = (async (req, res, next) => {
    try {
        const comments = await Comment.findAll({ // Retrieve all comments from a user
            where: { user_id: req.query.id },
        })

        comments.forEach(async (comment) => {
            comment.comment_media 
            ? fs.unlink(comment.comment_media, () => { // Delete the image if it exists, then comment
                comment.destroy()
            })
            : comment.destroy()
        })

        res.status(201).json({
            message: 'Commentaires supprimés.'
        })
    } 
    catch (error) { 
        res.status(400).json({ 
            message: 'Impossible de supprimer les commentaires.'
        }) 
    };
});

exports.deleteCommentsFromPost = (async (req, res, next) => { 
    try {
        const comments = await Comment.findAll({ // Retrieve all comments for a post
            where: { post_id: req.query.id }
        })

        comments.forEach( async (comment) => {
            comment.comment_media 
            ? fs.unlink(comment.comment_media, () => { // Delete the image if it exists, then comment
                comment.destroy()
            })
            : comment.destroy()
        })

        res.status(200).json({
            message: 'Commentaires supprimés.'
        })
    } 
    catch (error) { res.status(400).json({ message: 'Impossible de supprimer les commentaires.' }) }
});

exports.deleteComment = (async (req, res, next) => {
    try {

        const comment = await Comment.findOne({ // Retrieve the comment by username
            where: { id: req.query.id }
        })

        comment.comment_media 
            ? fs.unlink(comment.comment_media, () => { // Delete the image if it exists, then comment
                comment.destroy()
            })
            : comment.destroy()

        res.status(200).json({
            message: 'Commentaire supprimé.'
        })
    } 
    catch (error) { res.status(400).json({ message: 'Impossible de supprimer le commentaire.' }) }
});