const Help = require('../models/Helps');

exports.inventaryHelps = async (req, res) => {
    try {
        const helps = await Help.find()
            .populate('author', 'name image email')
            .populate('ayudasRecibidas.user', 'name email');

        const ayudasRecibidas = helps.map(help => ({
            nombreDelDueño: help.author,
            _id: help._id,
            direccion: help.ubicacionAnimal,
            ayudasRecibidas: help.ayudasRecibidas.map(ayuda => ({
                _id: ayuda._id,
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

exports.actualizarEstadoAyuda = async (req, res) => {
    const { helpId, ayudaId, nuevoEstado } = req.body;

    try {
        const help = await Help.findById(helpId);

        if (!help) {
            return res.status(404).json({ msg: 'Ayuda no encontrada' });
        }


        const ayuda = help.ayudasRecibidas.id(ayudaId);

        if (!ayuda) {
            return res.status(404).json({ msg: 'Ayuda recibida no encontrada' });
        }

        ayuda.estado = nuevoEstado;

        await help.save();

        return res.status(200).json({ msg: 'Estado actualizado correctamente', ayuda });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};



exports.updateAyudasRecibidas = async (req, res) => {
    const { helpId, userId, ayuda, estado, tipoDeAyuda, dinero } = req.body;

    console.log(helpId, userId, ayuda, estado, tipoDeAyuda, dinero)

    if (!helpId || !userId || !ayuda || !estado || !tipoDeAyuda) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const help = await Help.findById(helpId);
        if (!help) {
            return res.status(404).json({ message: 'Help no encontrado' });
        }


        const nuevaAyuda = {
            user: userId,
            tipoDeAyuda,
            ayuda,
            estado,
            dinero,
        };

        help.ayudasRecibidas.push(nuevaAyuda);


        await help.save();

        return res.status(200).json(help);

    } catch (error) {
        console.error('Error al actualizar ayudasRecibidas', error);
        return res.status(500).json({ message: 'Error al actualizar ayudasRecibidas', error });
    }
};
