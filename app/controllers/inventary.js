const Help = require('../models/Helps');

exports.inventaryHelps = async (req, res) => {
    try {
        const helps = await Help.find()
            .populate('author', 'name image email')
            .populate('ayudasRecibidas.user', 'name email');


        const ayudasRecibidas = helps.map(help => ({
            nombreDelDueño: help.author,
            _id: help._id,
            ayudasRecibidas: help.ayudasRecibidas.map(ayuda => ({
                usuario: ayuda.user ? ayuda.user.name : 'Usuario desconocido',
                email: ayuda.user ? ayuda.user.email : 'No disponible',
                ayuda: ayuda.ayuda,
                estado: ayuda.estado,
                fecha: ayuda.fecha
            }))
        }));

        if (ayudasRecibidas.length === 0) {
            console.log("No existen donaciones");
        }

        return res.status(200).json(ayudasRecibidas);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener Helps', error });
    }
};


exports.updateEstadoAyuda = async (req, res) => {
    const { helpId, userId, estado } = req.body;

    if (!helpId || !userId || !ayuda || !estado || !tipoDeAyuda) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const help = await Help.findById(helpId);
        if (!help) {
            return res.status(404).json({ message: 'Help no encontrado' });
        }

        help.ayudasRecibidas.push({
            user: userId,
            estado,
        });

        await help.save();

        return res.status(200).json(help);

    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar ayudasRecibidas', error });
    }
};




exports.updateAyudasRecibidas = async (req, res) => {
    const { helpId, userId, ayuda, estado, tipoDeAyuda } = req.body;

    console.log(helpId, userId, ayuda, estado, tipoDeAyuda, dinero)
    if (!helpId || !userId || !ayuda || !estado || !tipoDeAyuda || !dinero) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const help = await Help.findById(helpId);
        if (!help) {
            return res.status(404).json({ message: 'Help no encontrado' });
        }

        help.ayudasRecibidas.push({
            user: userId,
            tipoDeAyuda,
            ayuda,
            estado,
            dinero
        });

        await help.save();

        return res.status(200).json(help);

    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar ayudasRecibidas', error });
    }
};
