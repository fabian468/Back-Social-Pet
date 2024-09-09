const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const upload = require('../config/multerConfig');

router.get('/postsall', postController.getAllPosts);
// Ruta para crear un post
router.post('/posts', upload.single('image'), postController.createPost);

// Ruta para obtener un post por su ID
router.get('/posts/:id', postController.getPostById);

// Ruta para agregar un comentario a un post
router.post('/posts/:id/comments', postController.addCommentToPost);

// Ruta para eliminar un comentario de un post
router.delete('/posts/:postId/comments/:commentId', postController.deleteCommentFromPost);

module.exports = router;
