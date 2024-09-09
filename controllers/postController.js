const Post = require('../models/post');
const path = require('path');



exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name')
            .populate('comments.user', 'name')
            .exec();

        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los posts' });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { content, author } = req.body;


        let imagePath = '';
        if (req.file) {
            console.log(path)
            imagePath = path.join('/uploads', req.file.filename); // Ruta relativa de la imagen
        } else {
            console.log("no se encontro req.file")
        }


        const newPost = new Post({
            content: content,
            image: imagePath,
            author: author
        });



        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el post' });
    }
};


exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findById(postId)
            .populate('author', ['name', 'email'])
            .exec();

        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el post' });
    }
};


exports.addCommentToPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { userId, comment } = req.body;

        // Buscar el post al cual agregar el comentario
        const post = await Post.findById(postId)
            .populate('comments.user', 'name')
            .exec();

        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        // Agregar el comentario al array de comentarios del post
        post.comments.push({
            user: userId,
            comment
        });

        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el comentario' });
    }
};


exports.deleteCommentFromPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;

        // Buscar el post
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        // Filtrar el comentario por su ID
        const commentIndex = post.comments.findIndex(comment => comment._id.equals(commentId));

        if (commentIndex === -1) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }

        // Eliminar el comentario
        post.comments.splice(commentIndex, 1);

        await post.save();
        res.json({ message: 'Comentario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el comentario' });
    }
};
