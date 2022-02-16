var express = require('express');
var router = express.Router();
const page = require('../controllers/page.controller');
var auth = require('../middlewares/auth.middleware');

router.get('/', page.findAll);
router.post('/', auth.roles('Website Editor'), page.create);
router.get('/:id', page.findOne);
router.get('/section/:id', page.findBySectionId);
router.put('/:id', auth.roles('Website Editor'), page.updateOne);
router.delete('/:id', auth.roles('Website Editor'), page.deleteOne);

module.exports = router;
