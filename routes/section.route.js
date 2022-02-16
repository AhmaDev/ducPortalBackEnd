var express = require('express');
var router = express.Router();
const section = require('../controllers/section.controller');
var auth = require('../middlewares/auth.middleware');

router.get('/', section.findAll);
router.post('/', auth.roles('Admin'), section.create);
router.get('/:id', section.findOne);
router.get('/slug/:id', section.findOneBySlug);
router.put('/:id', auth.roles('Website Editor'), section.updateOne);
router.delete('/:id', auth.roles('Admin'), section.deleteOne);

module.exports = router;
