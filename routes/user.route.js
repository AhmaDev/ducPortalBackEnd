var express = require("express");
var router = express.Router();
const user = require("../controllers/user.controller");
var auth = require("../middlewares/auth.middleware");

router.get("/", auth.roles("Admin"), user.findAll);
router.post("/", auth.roles("Admin"), user.create);
router.post("/login", user.login);
router.get("/version", user.version);
router.get("/:id", user.findOne);
router.put("/:id", auth.roles("Admin"), user.updateOne);
router.delete("/:id", auth.roles("Admin"), user.deleteOne);

module.exports = router;
