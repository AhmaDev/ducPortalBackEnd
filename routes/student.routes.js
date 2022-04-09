var express = require('express');
var router = express.Router();
const Student = require('../controllers/student.controller');

router.get('/students', Student.findAll);
router.post('/addStudent', Student.create);
router.get('/student/:id', Student.findOne);
router.put('/student/:id', Student.updateOne);
router.delete('/student/:id', Student.deleteOne);

module.exports = router;
