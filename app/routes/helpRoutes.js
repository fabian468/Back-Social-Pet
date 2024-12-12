const express = require('express');
const router = express.Router();
const helpController = require('../controllers/helpController');
const { upload } = require('../../config/multerConfig');
const inventary = require('../controllers/inventary');


router.post('/helps', upload.single('video'), helpController.createHelp);

router.get('/helps', helpController.getAllHelps);

router.get('/helps', helpController.getAllHelps);

router.get('/helps/:id', helpController.getHelpById);

router.get('/helps/historia/:id', helpController.getHelpsByHistoriaId);

router.put('/helps/:id', helpController.updateHelp);

router.delete('/helps/:id', helpController.deleteHelp);

router.post('/helps/comments', helpController.addCommentToHelps);

router.delete('/helps/:postId/comments/:commentId', helpController.deleteCommentFromHelps);

router.get('/helps/i/inventary', inventary.inventaryHelps);

router.post('/helps/i/updateayudarecibida', inventary.updateAyudasRecibidas);

router.post('/helps/i/updateestadoayudarecibida', inventary.actualizarEstadoAyuda);

module.exports = router;
