const User = require("../models/user");
const Help = require("../models/Helps");


const followCase = async (req, res) => {
    const { userId, caseId } = req.body;


    try {
        const helpCase = await Help.findById(caseId);
        if (!helpCase) {
            return res.status(404).json({ message: "El caso no existe." });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { casesFollow: caseId } },
            { new: true }
        ).populate("casesFollow");

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        res.status(200).json({
            message: "Caso seguido exitosamente.",
            casesFollow: user.casesFollow,
        });
    } catch (error) {
        res.status(500).json({ message: "Error al seguir el caso.", error });
    }
};


const unfollowCase = async (req, res) => {
    const { userId, caseId } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { casesFollow: caseId } },
            { new: true }
        ).populate("casesFollow");

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        res.status(200).json({
            message: "Caso dejado de seguir exitosamente.",
            casesFollow: user.casesFollow,
        });
    } catch (error) {
        res.status(500).json({ message: "Error al dejar de seguir el caso.", error });
    }
};

const getFollowedCases = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate({
            path: "casesFollow",
        });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }


        res.status(200).json({
            message: "Casos seguidos obtenidos exitosamente.",
            casesFollow: user.casesFollow,
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los casos seguidos.", error });
    }
};

const comprobarSiSigueCaso = async (req, res) => {
    const { userId, caseId } = req.body;

    try {

        if (!userId || !caseId) {
            return res.status(400).json({ message: "Faltan los parámetros userId o caseId." });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        const isFollowing = user.casesFollow.includes(caseId);

        if (isFollowing) {
            return res.status(200).json({ isFollowing: true });
        } else {
            return res.status(200).json({ isFollowing: false });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al comprobar si el usuario sigue el caso.", error });
    }
};



module.exports = {
    followCase,
    unfollowCase,
    getFollowedCases,
    comprobarSiSigueCaso
};
