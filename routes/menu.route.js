var express = require('express');
var router = express.Router();
const menu = require('../controllers/menu.controller');
var auth = require('../middlewares/auth.middleware');

router.get('/', menu.findAll);
router.post('/', auth.roles('Website Editor'), menu.create);
router.post('/content', auth.roles('Website Editor'), menu.createNewLink);
router.get('/:id', menu.findOne);
router.get('/section/:id', menu.findBySectionId);
router.put('/:id', auth.roles('Website Editor'), menu.updateOne);
router.delete('/:id', auth.roles('Website Editor'), menu.deleteOne);
router.delete('/content/:id', auth.roles('Website Editor'), menu.deleteLink);

module.exports = router;
