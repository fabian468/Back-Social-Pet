const User = require('../models/user'); // Modelo de usuario


exports.sendFriendRequest = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (receiver.friendBlackList.includes(senderId)) {
            return res.status(403).json({ message: 'Estás en la lista negra de este usuario.' });
        }

        if (sender.friendRequestsSent.includes(receiverId)) {
            return res.status(400).json({ message: "Solicitud ya enviada" });
        }

        if (sender.friends.includes(receiverId)) {
            return res.status(400).json({ message: "ya son amigos" });
        }

        sender.friendRequestsSent.push(receiverId);
        receiver.friendRequestsReceived.push(senderId);

        await sender.save();
        await receiver.save();

        res.status(200).json({ message: "Solicitud de amistad enviada" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

exports.verifyFriendRequest = async (req, res) => {
    try {
        const { userId, friendId } = req.body;


        const user = await User.findById(userId);
        const friend = await User.findById(friendId);


        if (!user || !friend) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (user.friends.includes(friendId)) {
            return res.status(200).json({ message: "Ya son amigos" });
        }

        if (friend.friendBlackList.includes(userId)) {
            return res.status(200).json({ message: 'Usuario en lista negra' });
        }

        if (user.friendRequestsSent.includes(friendId)) {
            return res.status(200).json({ message: "Solicitud ya enviada" });
        }


        if (user.friendRequestsReceived.includes(friendId)) {
            return res.status(200).json({ message: "Tienes una solicitud pendiente de este usuario" });
        }


        return res.status(200).json({ message: "No hay solicitud de amistad ni son amigos" });

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};


exports.acceptFriendRequest = async (req, res) => {
    try {
        const { userId, friendId } = req.body;

        // Encontrar los usuarios
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar que haya una solicitud de amistad pendiente
        if (!user.friendRequestsReceived.includes(friendId)) {
            return res.status(400).json({ message: "No hay solicitud de amistad pendiente" });
        }

        // Agregar a la lista de amigos
        user.friends.push(friendId);
        friend.friends.push(userId);

        // Eliminar las solicitudes de amistad
        user.friendRequestsReceived = user.friendRequestsReceived.filter(
            id => id.toString() !== friendId
        );
        friend.friendRequestsSent = friend.friendRequestsSent.filter(
            id => id.toString() !== userId
        );

        await user.save();
        await friend.save();

        res.status(200).json({ message: "Solicitud de amistad aceptada" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};


exports.rejectFriendRequest = async (req, res) => {
    try {
        const { userId, friendId } = req.body;

        // Encontrar los usuarios
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar que haya una solicitud de amistad pendiente
        if (!user.friendRequestsReceived.includes(friendId)) {
            return res.status(400).json({ message: "No hay solicitud de amistad pendiente" });
        }

        // Eliminar las solicitudes de amistad
        user.friendRequestsReceived = user.friendRequestsReceived.filter(
            id => id.toString() !== friendId
        );
        friend.friendRequestsSent = friend.friendRequestsSent.filter(
            id => id.toString() !== userId
        );

        await user.save();
        await friend.save();

        res.status(200).json({ message: "Solicitud de amistad rechazada" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};


exports.removeFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.body;

        // Encontrar los usuarios
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Eliminar de la lista de amigos
        user.friends = user.friends.filter(id => id.toString() !== friendId);
        friend.friends = friend.friends.filter(id => id.toString() !== userId);

        await user.save();
        await friend.save();

        res.status(200).json({ message: "Amigo eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};


exports.blockUser = async (req, res) => {
    try {
        const { userId, userIdToBlock } = req.body;

        if (!userId || !userIdToBlock) {
            return res.status(400).json({ error: 'Se requieren ambos IDs (userId y userIdToBlock).' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }


        if (user.friendBlackList.includes(userIdToBlock)) {
            return res.status(400).json({ error: 'Este usuario ya está en la lista negra.' });
        }


        user.friendBlackList.push(userIdToBlock);

        await user.save();

        res.status(200).json({ message: 'Usuario agregado a la lista negra con éxito.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.searchUsersByLetter = async (req, res) => {
    try {
        const letter = req.params.letter;

        if (!letter || !/^[a-zA-Z0-9]+$/.test(letter)) {
            return res.status(400).json({ message: 'Proporciona un término de búsqueda válido (solo letras y números).' });
        }

        const regex = new RegExp(`^${letter}`, 'i'); // Expresión regular para buscar por la letra inicial
        const users = await User.find({ name: regex }).select('name _id');;

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar usuarios', error });
    }
};


exports.GetAllFriends = async (req, res) => {
    const { userId } = req.body;

    try {
        const MyUser = await User.findById(userId).populate('friends', 'name image registrationDate');
        const friends = await MyUser.friends;
        res.json(friends)
    } catch {
        console.log("error al enviar amigos")
    }
}