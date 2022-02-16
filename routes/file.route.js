var express = require('express');
var router = express.Router();
const file = require('../controllers/file.controller');
var auth = require('../middlewares/auth.middleware');

router.get('/', file.findAll);
router.post('/', auth.roles('Website Editor'), file.create);
router.get('/:id', file.findOne);
router.get('/lesson/:id', file.fineByLessonId);
router.put('/:id', auth.roles('Website Editor'), file.updateOne);
router.delete('/:id', auth.roles('Website Editor'), file.deleteOne);

module.exports = router;
