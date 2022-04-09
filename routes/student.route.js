var express = require('express');
var router = express.Router();
const Student = require('../controllers/student.controller');
var auth = require('../middlewares/auth.middleware');

router.get('/', Student.findAll);
router.post('/', Student.create);
router.get('/:id', Student.findOne);
router.get('/email/:email', Student.findOneByEmail);
router.put('/:id', Student.updateOne);
router.delete('/:id', auth.roles('Website Editor'), Student.deleteOne);

module.exports = router;
