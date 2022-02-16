var express = require('express');
var router = express.Router();
const post = require('../controllers/post.controller');
var auth = require('../middlewares/auth.middleware');

router.get('/', post.findAll);
router.post('/', auth.roles('Website Editor'), post.create);
router.get('/:id', post.findOne);
router.get('/section/:id', post.findBySectionId);
router.get('/slider/section/:id', post.findSliderBySectionId);
router.put('/:id', auth.roles('Website Editor'), post.updateOne);
router.delete('/:id', auth.roles('Website Editor'), post.deleteOne);

module.exports = router;
