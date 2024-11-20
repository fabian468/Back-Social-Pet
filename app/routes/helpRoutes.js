const express = require('express');
const router = express.Router();
const helpController = require('../controllers/helpController');
const { upload } = require('../../config/multerConfig');


router.post('/helps', upload.single('video'), helpController.createHelp);

router.get('/helps', helpController.getAllHelps);

router.get('/helps/:id', helpController.getHelpById);

router.put('/helps/:id', helpController.updateHelp);

router.delete('/helps/:id', helpController.deleteHelp);

router.post('/helps/comments', helpController.addCommentToHelps);

router.delete('/helps/:postId/comments/:commentId', helpController.deleteCommentFromHelps);
module.exports = router;
