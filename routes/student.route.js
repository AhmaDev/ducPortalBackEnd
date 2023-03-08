var express = require("express");
var router = express.Router();
const Student = require("../controllers/student.controller");
var auth = require("../middlewares/auth.middleware");

router.get("/", Student.findAll);
router.post("/", auth.roles("Admin"), Student.create);
router.post("/multi", auth.roles("Admin"), Student.multiCreate);
router.post("/addPayment", auth.roles("Accountant"), Student.addPayment);
router.get("/paymentTypes", Student.paymentTypes);
router.get("/payment/:id", Student.getStudentPayments);
router.get("/reports", Student.allPayments);
router.get("/:id", Student.findOne);
router.get("/email/:email", Student.findOneByEmail);
router.post("/login", Student.login);
router.put("/:id", auth.roles("all"), Student.updateOne);
router.delete("/:id", auth.roles("Admin"), Student.deleteOne);

module.exports = router;
