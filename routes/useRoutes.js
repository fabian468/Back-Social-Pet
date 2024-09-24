const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require('../config/multerConfig');

router.get("/users/:id", userController.getUsers);
router.post("/login", userController.loginUser);
router.get("/checkEmail", userController.checkEmail);
router.post("/users", upload.single('image'), userController.registerUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
