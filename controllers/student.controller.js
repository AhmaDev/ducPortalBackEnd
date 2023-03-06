const Student = require("../models/student.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body is empty",
    });
  }
  const student = new Student({
    name: req.body.name,
    enName: req.body.enName,
    email: req.body.email,
    studySectionId: req.body.sectionId,
    level: req.body.level,
    studyClass: req.body.studyClass,
    collegeNumber: req.body.collegeNumber,
    gender: req.body.gender,
  });

  Student.create(student, (err, data) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.sendStatus(409);
      } else {
        res.sendStatus(500);
      }
    } else res.send(data);
  });
};

exports.multiCreate = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body is empty",
    });
  }
  Student.multiCreate(req.body, (err, data) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.sendStatus(409);
      } else {
        res.sendStatus(500);
      }
    } else res.send(data);
  });
};
exports.findAll = (req, res) => {
  Student.getAll(req.query, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.paymentTypes = (req, res) => {
  Student.paymentTypes((err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
exports.getStudentPayments = (req, res) => {
  Student.getStudentPayments(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Student.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};

exports.findOneByEmail = (req, res) => {
  Student.findByEmail(req.params.email, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};

exports.addPayment = (req, res) => {
  Student.addPayment(req.body, (err, data) => {
    if (err) {
      console.log(err);
      if (err.code === "ER_DUP_ENTRY") {
        res.sendStatus(409);
      } else {
        res.sendStatus(500);
      }
    } else res.send(data);
  });
};
exports.login = (req, res) => {
  Student.login(req.body, (err, data) => {
    if (err) {
      if (err.kind == "not_found") res.sendStatus(404);
      else res.sendStatus(500);
    } else res.send(data);
  });
};

exports.updateOne = (req, res) => {
  Student.update(req.params.id, req.body, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};

exports.deleteOne = (req, res) => {
  Student.delete(req.params.id, (err, data) => {
    if (err) res.sendStatus(500);
    else res.send(data);
  });
};
