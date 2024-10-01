const express = require('express');
const router = express.Router();
const helpController = require('../controllers/helpController');
const { uploadVideo } = require('../../config/multerConfig');


router.post('/helps', uploadVideo.single('video'), helpController.createHelp);

router.get('/helps', helpController.getAllHelps);

router.get('/helps/:id', helpController.getHelpById);

router.put('/helps/:id', helpController.updateHelp);

router.delete('/helps/:id', helpController.deleteHelp);

module.exports = router;
