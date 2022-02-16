const connection = require('../helpers/db');

const File = function (file) {
    this.title = file.title;
    this.lessonId = file.lessonId;
    this.url = file.url;
};

File.create = function (newFile, result) {
    connection.query(`INSERT INTO file SET ?`, newFile, (err, res) => {
        if (err) {
            console.log("Error while adding a file", err);
            result(err, null);
            return;
        }
        result(null, { idFile: res.insertId, ...newFile });
    });
};

File.getAll = function (result) {
    connection.query(`SELECT * FROM file`, (err, res) => {
        if (err) {
            console.log("Error while getting all files", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

File.findById = function (id, result) {
    connection.query(`SELECT * FROM file WHERE idFile = ${id}`, (err, res) => {
        if (err) {
            console.log("Error while getting file by ID", err);
            result(err, null);
            return;
        }
        if (res.length == 0) {
            result({ kind: 'not_found' }, null);
        } else {
            result(null, res[0]);
        }
    });
};

File.fineByLessonId = function (id, result) {
    connection.query(`SELECT * FROM file WHERE lessonId = ${id}`, (err, res) => {
        if (err) {
            console.log("Error while getting file by ID", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

File.update = function (id, data, result) {
    connection.query(`UPDATE file SET ? WHERE idFile = ${id}`, data, (err, res) => {
        if (err) {
            console.log("Error while updating file by ID", err);
            result(err, null);
            return;
        }
        result(null, { idFile: res.insertId, ...data });
    });
};

File.delete = function (id, result) {
    connection.query(`DELETE FROM file WHERE idFile = ?`, id, (err, res) => {
        if (err) {
            console.log("Error while deleting file by ID", err);
            result(err, null);
            return;
        }
        result(null, { message: `File ID ${id} has been deleted successfully` });
    })
}

module.exports = File;