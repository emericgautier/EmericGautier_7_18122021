/* ROUTES COMMENTS || Logique de routing pour comments */

const express = require('express');

const router = express.Router();

// importations 
const multer = require('../middleware/multer'); // middleware de gestion de fichier
const auth = require('../middleware/auth'); // middleware de protection de route
const commentCtrl = require('../controllers/comment'); // import la logique métier de 'comment'

router.post('/comment/publish', auth, multer, commentCtrl.createComment);
router.get('/comments/post', auth, commentCtrl.getCommentsFromPost);
router.get('/comments/user', auth, commentCtrl.getCommentsFromUser);

router.delete('/comments/delete/user', auth, commentCtrl.deleteCommentsFromUser);
router.delete('/comments/delete/post', auth, commentCtrl.deleteCommentsFromPost);
router.delete('/comment/delete', auth, commentCtrl.deleteComment);

module.exports = router;