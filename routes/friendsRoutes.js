const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsController');

router.get('/search/:letter', friendsController.searchUsersByLetter);
router.post('/perfil/sendsfriends', friendsController.sendFriendRequest);
router.post('/perfil/verifyrequest', friendsController.verifyFriendRequest);//hacer cada vez que entre al perfil del usuario
router.post('/perfil/acceptfriendrequest', friendsController.acceptFriendRequest);
router.post('/perfil/rejectFriendRequest', friendsController.rejectFriendRequest);
router.post('/perfil/removeFriend', friendsController.removeFriend);
router.post('/perfil/GetAllFriends', friendsController.GetAllFriends);


module.exports = router;
