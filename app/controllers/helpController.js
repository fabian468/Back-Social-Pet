const Help = require('../models/Helps');
const moment = require('moment');


exports.createHelp = async (req, res) => {
    try {
        const { Titulo, author, cantidadAyuda, nombredelAnimal, ubicacionAnimal, tipoAyudaNecesitada, esHistoria } = req.body;
        const videoPath = req.file ? req.file.path : '';

        const newHelp = new Help({
            Titulo,
            image: videoPath,
            author,
            cantidadAyuda,
            nombredelAnimal,
            ubicacionAnimal,
            tipoAyudaNecesitada,
            esHistoria,
            ayudasRecibidas: [],
        });

        await newHelp.save();

        return res.status(201).json({ message: 'Help creado con éxito', newHelp });
    } catch (error) {


        return res.status(500).json({ message: 'Error al crear Help', error });
    }
};



exports.getAllHelps = async (req, res) => {
    try {
        const helps = await Help.find()
            .populate('author', 'name image email')
            .populate('comments.user', 'name image')



        return res.status(200).json(helps);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener Helps', error });
    }
};


exports.getHelpById = async (req, res) => {
    try {
        const help = await Help.findById(req.params.id).populate('author', 'name email');

        if (!help) {
            return res.status(404).json({ message: 'Help no encontrado' });
        }


        return res.status(200).json(help);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener Help', error });
    }
};

exports.getHelpsByHistoriaId = async (req, res) => {
    try {
        const { id } = req.params;

        const helps = await Help.find({ esHistoria: id })
            .populate('author', 'name email')
            .populate('comments.user', 'name image');

        if (helps.length === 0) {
            return res.status(404).json({ message: 'No se encontraron Helps para esta historia' });
        }

        return res.status(200).json(helps);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener Helps', error });
    }
};


exports.updateHelp = async (req, res) => {
    try {
        const { Titulo, video, Comment, cantidadAyuda } = req.body;

        const updatedHelp = await Help.findByIdAndUpdate(
            req.params.id,
            { Titulo, video, Comment, cantidadAyuda },
            { new: true }
        );

        if (!updatedHelp) {
            return res.status(404).json({ message: 'Help no encontrado' });
        }

        return res.status(200).json({ message: 'Help actualizado con éxito', updatedHelp });
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar Help', error });
    }
};


exports.deleteHelp = async (req, res) => {
    try {
        const help = await Help.findByIdAndDelete(req.params.id);

        if (!help) {
            return res.status(404).json({ message: 'Help no encontrado' });
        }

        await Help.deleteMany({ esHistoria: req.params.id });

        return res.status(200).json({ message: 'Help eliminado con éxito' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar Help', error });
    }
};


exports.addCommentToHelps = async (req, res) => {
    try {
        const { userId, comment, helpId } = req.body;

        console.log(userId, comment, helpId)


        const post = await Help.findById(helpId)
            .populate('comments.user', 'name')
            .exec();


        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

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


exports.deleteCommentFromHelps = async (req, res) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;

        // Buscar el post

        const post = await Help.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

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
