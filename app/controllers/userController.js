const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require('path');
const fs = require('fs');

const SECRET_KEY = process.env.JWT_SECRET || "tu_clave_secreta_super_segura";


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    SECRET_KEY,
    { expiresIn: "1d" }
  );
};


exports.getUsers = async (req, res) => {
  try {
    const users = await User.findById(req.params.id).select('-password');
    if (!users) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = generateToken(user);

    res.status(200).json({ idUser: user._id, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, country, password } = req.body;


    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El correo electrónico ya está registrado" });
    }

    let imagePath = '';
    if (req.file) {
      imagePath = path.join('/uploads/avatar', req.file.filename);
    }

    const newUser = new User({
      name,
      email,
      country,
      password,
      image: imagePath,
    });

    await newUser.save();

    const token = generateToken(newUser);

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        image: newUser.image,
      },
      token,
      message: "Usuario registrado exitosamente"
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.checkEmail = async (req, res) => {
  try {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json({ message: "El correo electrónico ya está registrado" });
    }
    res.status(200).json({ message: "Puede registrar el correo" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      updates.image = path.join('/uploads/avatar', req.file.filename);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado con éxito", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.image) {
      const imagePath = path.join(__dirname, '..', user.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({ message: "Usuario eliminado con éxito" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateUserImage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No se ha proporcionado una imagen" });
    }

    if (user.image) {
      const oldImagePath = path.join(__dirname, '..', user.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const newImagePath = path.join('/uploads/avatar', req.file.filename);
    user.image = newImagePath;
    await user.save();

    res.json({ message: 'Imagen actualizada con éxito', image: newImagePath });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar la imagen", error: err.message });
  }
};
