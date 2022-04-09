var express = require('express');
var router = express.Router();
const Student = require('../controllers/student.controller');

router.get('/', Student.findAll);
router.post('/', Student.create);
router.get('/:id', Student.findOne);
router.get('/email/:email', Student.findOneByEmail);
router.put('/:id', Student.updateOne);
router.delete('/:id', Student.deleteOne);

module.exports = router;
