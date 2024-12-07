const Help = require('../models/Helps');

exports.inventaryHelps = async (req, res) => {
    try {
        const helps = await Help.find()
            .populate('author', 'name image email')
            .populate('comments.user', 'name image')

        const ayudasRecibidas = helps.map(help => ({
            _id: help._id,
            ayudasRecibidas: help.ayudasRecibidas
        }));

        return res.status(200).json(ayudasRecibidas);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener Helps', error });
    }
};


exports.updateAyudasRecibidas = async (req, res) => {
    const { helpId } = req.params;
    const { userId, ayuda, estado } = req.body;

    try {
        const updatedHelp = await Help.findByIdAndUpdate(
            helpId,
            {
                $push: {
                    ayudasRecibidas: {
                        user: userId,
                        ayuda,
                        estado,
                    }
                }
            },
            { new: true }
        ).select('ayudasRecibidas');

        if (!updatedHelp) {
            return res.status(404).json({ message: 'Help no encontrado' });
        }

        return res.status(200).json(updatedHelp);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar ayudasRecibidas', error });
    }
};
