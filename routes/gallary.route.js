var express = require("express");
var router = express.Router();
const gallary = require("../controllers/gallary.controller");
var auth = require("../middlewares/auth.middleware");

router.get("/", gallary.findAll);
// router.post('/', auth.roles('Website Editor'), gallary.create);
router.get("/:id", gallary.findOne);
router.get("/section/:id", gallary.findBySectionId);
// router.put('/:id', auth.roles('Website Editor'), gallary.updateOne);
// router.delete('/:id', auth.roles('Website Editor'), gallary.deleteOne);

module.exports = router;
