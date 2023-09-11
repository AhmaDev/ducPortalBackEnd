var express = require("express");
var router = express.Router();
const pageImage = require("../controllers/pageImage.controller");
var auth = require("../middlewares/auth.middleware");

router.get("/", pageImage.findAll);
router.post("/", auth.roles("Website Editor"), pageImage.create);
router.get("/:id", pageImage.findOne);
router.get("/page/:id", pageImage.findByPageId);
router.put("/:id", auth.roles("Website Editor"), pageImage.updateOne);
router.delete("/:id", auth.roles("Website Editor"), pageImage.deleteOne);

module.exports = router;
