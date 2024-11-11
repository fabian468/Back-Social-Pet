const Help = require('../models/Helps');

exports.createHelp = async (req, res) => {
    try {
        const { Titulo, author, cantidadAyuda, nombredelAnimal, ubicacionAnimal, tipoAyudaNecesitada } = req.body;
        const videoPath = req.file ? req.file.path : '';

        const newHelp = new Help({
            Titulo,
            video: videoPath,
            author,
            cantidadAyuda,
            nombredelAnimal,
            ubicacionAnimal,
            tipoAyudaNecesitada,
            ayudasRecibidas: [],
            Historial: []
        });

        await newHelp.save();

        return res.status(201).json({ message: 'Help creado con éxito', newHelp });
    } catch (error) {


        return res.status(500).json({ message: 'Error al crear Help', error });
    }
};



exports.getAllHelps = async (req, res) => {
    try {
        const helps = await Help.find().populate('author', 'name email');
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

        return res.status(200).json({ message: 'Help eliminado con éxito' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar Help', error });
    }
};
