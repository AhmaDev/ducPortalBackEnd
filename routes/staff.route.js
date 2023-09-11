var express = require("express");
var router = express.Router();
const staff = require("../controllers/staff.controller");

router.get("/", staff.findAll);
// router.post("/", staff.create);
router.get("/:id", staff.findOne);
router.get("/section/:id", staff.findBySectionId);
router.get("/slug/:id", staff.findBySectionSlug);
// router.put("/:id", staff.updateOne);
// router.delete("/:id", staff.deleteOne);

module.exports = router;
