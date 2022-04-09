const connection = require('../helpers/db');

const Student = function (Student) {
    this.email = Student.email;
    this.sectionId = Student.sectionId;
    this.level = Student.level;
};

Student.create = (newStudent, result) => {
    connection.query(`INSERT INTO Student SET ?`, newStudent, (err, res) => {
        if (err) {
            console.log("Add Student error:", err);
            result(err, null);
            return;
        }
        result(null, { idStudent: res.insertId, ...newStudent })
    })
};


Student.getAll = (result) => {
    connection.query(`SELECT * FROM Student`, (err, res) => {
        result(null, res);
    });
};

Student.findById = (id, result) => {
    connection.query(`SELECT * FROM Student WHERE idStudent = ${id}`, (err, res) => {
        if (err) {
            console.log("Find By ID: Student error:", err);
            result(err, null);
            return;
        }
        if (res.length == 0) {
        result({ kind: "not_found" }, null);
        } else {
          result(null, res[0]);
        }
    })
};


Student.update = (id, Student, result) => {
        connection.query(`UPDATE Student SET ? WHERE idStudent = ${id}`, Student, (err, res) => {
          if (err) {
            console.log("Error while editing a Student", err);
            result(err, null);
            return;
        }
        result(null, { idStudent: id, ...Student });
    })
}
Student.delete = (id, result) => {
    connection.query(`DELETE FROM Student WHERE idStudent = ${id}`, (err, res) => {
        if (err) {
            console.log("Error while deleting a Student", err);
            result(err, null);
            return;
        }
        result(null, { message: `Student ID ${id} has been deleted successfully` });
    });
}
module.exports = Student;
