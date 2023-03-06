const connection = require("../helpers/db");

const Student = function (student) {
  this.name = student.name;
  this.enName = student.enName;
  this.email = student.email;
  this.studySectionId = student.studySectionId;
  this.level = student.level;
  this.studyClass = student.studyClass;
  this.collegeNumber = student.collegeNumber;
  this.gender = student.gender;
};

Student.create = function (newStudent, result) {
  connection.query(`INSERT INTO student SET ?`, newStudent, (err, res) => {
    if (err) {
      console.log("Error while adding a Student", err);
      result(err, null);
      return;
    }
    result(null, { idStudent: res.insertId, ...newStudent });
  });
};

Student.multiCreate = function (body, result) {
  connection.query(`DELETE FROM student`, (deleteErr, deleteRes) => {
    connection.query(
      "ALTER TABLE `student` auto_increment = 1",
      (err2, res2) => {
        connection.query(
          `INSERT INTO student (name,enName,email,studySectionId,level,studyClass,collegeNumber,gender,password,year) VALUES ?`,
          [body],
          (err, res) => {
            if (err) {
              console.log("Error while adding a Student", err);
              result(err, null);
              return;
            }
            result(null, "ok");
          },
        );
      },
    );
  });
};

Student.getAll = function (queries, result) {
  let query = "";
  let having = "";
  if (queries.collegeNumber != undefined) {
    query += `AND ducPortal.student.collegeNumber = "${queries.collegeNumber}"`;
  }
  if (queries.sectionId != undefined) {
    query += `AND ducPortal.student.studySectionId IN (${queries.sectionId})`;
  }
  if (queries.level != undefined) {
    query = query + ` AND level = ${queries.level}`;
  }
  if (queries.isBlocked != undefined) {
    query += `AND ducPortal.student.isBlocked = ${queries.isBlocked}`;
  }
  connection.query(
    `SELECT * FROM ducPortal.student WHERE 1=1 ${query}`,
    (err, res) => {
      if (err) {
        console.log("Error while getting all Students", err);
        result(err, null);
        return;
      }
      result(null, res);
    },
  );
};

Student.findById = function (id, result) {
  connection.query(
    `SELECT * FROM student JOIN studySection ON studySection.idSection = student.studySectionId WHERE collegeNumber = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while getting Student by ID", err);
        result(err, null);
        return;
      }
      if (res.length == 0) {
        result({ kind: "not_found" }, null);
      } else {
        result(null, res[0]);
      }
    },
  );
};

Student.login = function (body, result) {
  connection.query(
    `SELECT student.*, studySection.sectionName, blockReason.blockReasonTitle FROM student JOIN studySection ON student.studySectionId = studySection.idSection LEFT JOIN blockReason ON student.blockReasonId = blockReason.idBlockReason WHERE collegeNumber = '${body.collegeNumber}' AND password = '${body.password}'`,
    (err, res) => {
      if (err) {
        console.log("Error while getting Student by collegeNumber", err);
        result(err, null);
        return;
      }
      if (res.length == 0) {
        result({ kind: "not_found" }, null);
      } else {
        result(null, res[0]);
      }
    },
  );
};

Student.findByEmail = function (email, result) {
  connection.query(
    `SELECT student.*, studySection.sectionName, blockReason.blockReasonTitle FROM student JOIN studySection ON student.studySectionId = studySection.idSection LEFT JOIN blockReason ON student.blockReasonId = blockReason.idBlockReason WHERE email = '${email}'`,
    (err, res) => {
      if (err) {
        console.log("Error while getting Student by Email", err);
        result(err, null);
        return;
      }
      if (res.length == 0) {
        result({ kind: "not_found" }, null);
      } else {
        result(null, res[0]);
      }
    },
  );
};

Student.addPayment = function (newPayment, result) {
  connection.query(
    `INSERT INTO ducApp.studentPayment SET ?`,
    newPayment,
    (err, res) => {
      if (err) console.log(err);

      result(null, { message: "ok" });
    },
  );
};

Student.getStudentPayments = function (id, result) {
  connection.query(
    `SELECT *, (SELECT ducApp.paymentType.paymentTypeName FROM ducApp.paymentType WHERE ducApp.paymentType.idPaymentType = ducApp.studentPayment.paymentTypeId) As paymentTypeName, (SELECT ducApp.paymentType.paymentFunction FROM ducApp.paymentType WHERE ducApp.paymentType.idPaymentType = ducApp.studentPayment.paymentTypeId) As paymentFunction FROM ducApp.studentPayment WHERE ducApp.studentPayment.studentCollegeNumber = '${id}'`,

    (err, res) => {
      if (err) console.log(err);

      result(null, res);
    },
  );
};

Student.paymentTypes = function (result) {
  connection.query(`SELECT * FROM ducApp.paymentType`, (err, res) => {
    if (err) console.log(err);
    result(null, res);
  });
};

Student.update = function (id, data, result) {
  connection.query(
    `UPDATE student SET ? WHERE idStudent = ${id}`,
    data,
    (err, res) => {
      if (err) {
        console.log("Error while updating Student by ID", err);
        result(err, null);
        return;
      }
      result(null, { idStudent: res.insertId, ...data });
    },
  );
};

Student.delete = function (id, result) {
  connection.query(
    `DELETE FROM student WHERE idStudent = ?`,
    id,
    (err, res) => {
      if (err) {
        console.log("Error while deleting Student by ID", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `Student ID ${id} has been deleted successfully`,
      });
    },
  );
};

module.exports = Student;
