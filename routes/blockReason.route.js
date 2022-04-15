var express = require('express');
var router = express.Router();
const blockReason = require('../controllers/blockReason.controller');

router.get('/blockReasons', blockReason.findAll);
router.post('/addBlockReason', blockReason.create);
router.get('/blockReason/:id', blockReason.findOne);
router.put('/blockReason/:id', blockReason.updateOne);
router.delete('/blockReason/:id', blockReason.deleteOne);

module.exports = router;
