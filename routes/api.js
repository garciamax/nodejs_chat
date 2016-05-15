var express = require('express');
var router = express.Router();
var messages = require('../controllers/messages');

router.get('/messages', messages.get);
router.post('/message', messages.post);

module.exports = router;