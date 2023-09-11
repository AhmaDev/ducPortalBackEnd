var express = require("express");
var router = express.Router();
const lesson = require("../controllers/lesson.controller");
var auth = require("../middlewares/auth.middleware");

router.get("/", lesson.findAll);
// router.post('/', auth.roles('Website Editor'), lesson.create);
router.get("/:id", lesson.findOne);
router.get("/section/:id", lesson.findBySectionId);
router.get("/slug/:id", lesson.findBySectionSlug);
// router.put('/:id', auth.roles('Website Editor'), lesson.updateOne);
// router.delete('/:id', auth.roles('Website Editor'), lesson.deleteOne);

module.exports = router;
