const express = require('express');

const router = express.Router();

const multer = require('../middleware/multer'); // middleware de gestion de fichier
const auth = require('../middleware/auth'); // import middleware de protection de route
const postCtrl = require('../controllers/post'); // import la logique métier de post

router.post('/post/publish', auth, multer, postCtrl.createPost);
router.get('/posts', auth, postCtrl.getAllPosts);
router.get('/posts/user', auth, postCtrl.getAllPostsUser);
router.get('/post', auth, postCtrl.getOnePost);
router.get('/post/author', auth, postCtrl.getOwnerInfo)

router.delete('/post/delete', auth, postCtrl.deletePost);
router.delete('/posts/delete/user', auth, postCtrl.deleteAllPostsUser);


module.exports = router;