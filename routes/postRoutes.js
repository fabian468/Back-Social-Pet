const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { upload } = require('../config/multerConfig');



router.get('/postsall', postController.getAllPosts);

router.delete('/posts/:idpost', postController.deletePostById);

router.post('/posts', upload.single('image'), postController.createPost);

router.get('/posts/:id', postController.getPostById);

router.post('/postsuser/', postController.getPostsByAuthor);

router.post('/posts/comments', postController.addCommentToPost);

router.delete('/posts/:postId/comments/:commentId', postController.deleteCommentFromPost);

module.exports = router;
