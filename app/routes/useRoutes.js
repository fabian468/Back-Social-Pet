const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { uploadAvatar } = require('../../config/multerConfig');

router.get("/users/:id", userController.getUsers);
router.post("/login", userController.loginUser);
router.get("/checkEmail", userController.checkEmail);
router.post("/users", uploadAvatar.single('image'), userController.registerUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
