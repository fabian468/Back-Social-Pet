const deleteImage = require('../../config/deleteImg');
const Post = require('../models/post');
const path = require('path');



exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name image')
            .populate('comments.user', 'name image')
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
            imagePath = path.join('/uploads', req.file.filename);
        } else {
            console.log("no se encontro req.file");
        }

        // Crear el nuevo post
        let newPost = new Post({
            content: content,
            image: imagePath,
            author: author
        });


        newPost = await newPost.save();
        await newPost.populate('author', ['name', 'email']);

        res.status(201).json(newPost);
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


exports.getPostsByAuthor = async (req, res) => {
    try {
        const { authorId } = req.body;

        const posts = await Post.find({ author: authorId })
            .populate('author', 'name image')
            .populate('comments.user', 'name image')
            .exec();

        if (!posts) {
            return res.status(404).json({ message: 'No se encontraron publicaciones para este autor' });
        }

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las publicaciones' });
    }
};


exports.deletePostById = async (req, res) => {
    try {
        const postId = req.params.idpost;
        const post = await Post.findById(postId);
        const idImg = post.image

        const result = await Post.findByIdAndDelete(postId);

        if (!result) {
            return res.status(404).json({ error: "Post no encontrado" });
        }

        if (idImg) {
            deleteImage(idImg);
        }

        res.status(200).json({ message: "Post eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el post" });
    }
};

exports.addCommentToPost = async (req, res) => {
    try {
        const { userId, comment, postId } = req.body;

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


exports.addLike = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Publicación no encontrada.' });
        }

        if (post.likes.includes(userId)) {
            return res.status(400).json({ message: 'Ya le has dado like a esta publicación.' });
        }

        post.likes.push(userId);
        await post.save();

        return res.status(200).json({ message: 'Like agregado con éxito.', likes: post.likes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al agregar el like.', error });
    }
};


exports.removeLike = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Publicación no encontrada.' });
        }

        if (!post.likes.includes(userId)) {
            return res.status(400).json({ message: 'No le has dado like a esta publicación.' });
        }

        post.likes = post.likes.filter(id => id.toString() !== userId.toString());
        await post.save();

        return res.status(200).json({ message: 'Like eliminado con éxito.', likes: post.likes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar el like.', error });
    }
};