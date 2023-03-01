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
          `INSERT INTO student (name,enName,email,studySectionId,level,studyClass,collegeNumber,gender) VALUES ?`,
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
    query += `AND studentPortal.Student.collegeNumber = "${queries.collegeNumber}"`;
  }
  if (queries.sectionId != undefined) {
    query += `AND studentPortal.Student.sectionId IN (${queries.sectionId})`;
  }
  if (queries.status != undefined) {
    query += `AND studentPortal.Student.studentStatusId IN (${queries.status})`;
  }
  if (queries.level != undefined) {
    having = having + ` AND studentLevel = ${queries.level}`;
  }
  if (queries.studyClass != undefined) {
    query += `AND studentPortal.Student.studyClass = "${queries.studyClass}"`;
  }
  if (queries.isBlocked != undefined) {
    query += `AND studentPortal.Student.isBlocked = ${queries.isBlocked}`;
  }
  connection.query(
    `SELECT studentPortal.Student.*, (SELECT @level := MAX(level) FROM studentPortal.StudentLevel WHERE studentPortal.StudentLevel.studentId = studentPortal.Student.idStudent LIMIT 1) As studentLevel, studentPortal.StudentImage.*, Section.sectionName FROM studentPortal.Student JOIN studentPortal.Section ON studentPortal.Student.sectionId = studentPortal.Section.idSection LEFT JOIN studentPortal.StudentImage ON studentPortal.StudentImage.studentId = studentPortal.Student.idStudent AND studentPortal.StudentImage.imageTypeId = 1 WHERE 1=1 ${query} GROUP BY studentPortal.Student.idStudent HAVING 1=1 ${having} ORDER BY studentPortal.Student.studentName ASC`,
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
    `SELECT * FROM student WHERE idStudent = ${id}`,
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
