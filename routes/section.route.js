var express = require("express");
var router = express.Router();
const section = require("../controllers/section.controller");
var auth = require("../middlewares/auth.middleware");

router.get("/", section.findAll);
router.post("/", auth.roles("Admin"), section.create);
router.post("/addFee", auth.roles("all"), section.createFee);
router.get("/:id", section.findOne);
router.get("/slug/:id", section.findOneBySlug);
router.get("/fees/all", section.findAllFees);
router.get("/fees/id/:id", section.findFeesBySection);
// router.put("/:id", auth.roles("Website Editor"), section.updateOne);
router.delete("/:id", auth.roles("Admin"), section.deleteOne);

module.exports = router;
