const connection = require('../helpers/db');
const fs = require('fs')
const path = require('path');

const Upload = function (upload) {
    this.path = upload.path;
    this.sectionId = upload.sectionId;
    this.createdBy = upload.createdBy;
};

Upload.create = function (uploadInfo, result) {
    var files = uploadInfo.files.map(e => ["uploads/view/" + e.filename, e.mimetype, uploadInfo.createdBy, uploadInfo.sectionId]);
    connection.query(`INSERT INTO upload (path, mime, createdBy, sectionId) VALUES ?`, [files], (err, res) => {
        if (err) {
            console.log("Error while adding a file", err);
            result(err, null);
            return;
        }
        result(null, { message: "OK", result: res });
    });
};

Upload.getAll = function (result) {
    connection.query(`SELECT * FROM upload ORDER BY idUpload DESC`, (err, res) => {
        if (err) {
            console.log("Error while getting all files", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


Upload.findById = function (id, result) {
    connection.query(`SELECT * FROM upload WHERE idUpload = ${id}`, (err, res) => {
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

Upload.findBySectionId = function (id, result) {
    connection.query(`SELECT * FROM upload WHERE sectionId = ${id} ORDER BY idUpload DESC`, (err, res) => {
        if (err) {
            console.log("Error while getting file by ID", err);
            result(err, null);
            return;
        }
        if (res.length == 0) {
            result({ kind: 'not_found' }, null);
        } else {
            result(null, res);
        }
    });
};


Upload.update = function (id, data, result) {
    connection.query(`UPDATE upload SET ? WHERE idUpload = ${id}`, data, (err, res) => {
        if (err) {
            console.log("Error while updating file by ID", err);
            result(err, null);
            return;
        }
        result(null, { idUplaod: res.insertId, ...data });
    });
};

Upload.delete = function (id, result) {
    connection.query(`SELECT * FROM upload WHERE idUpload = ${id}`, (checkErr, checkRslt) => {
        if (checkRslt.length == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        connection.query(`DELETE FROM upload WHERE idUpload = ?`, id, (err, res) => {
            if (err) {
                console.log("Error while deleting file by ID", err);
                result(err, null);
                return;
            }
            try {
                var finalPath = checkRslt[0].path.split('/')
                fs.unlinkSync(path.join(__dirname, "..", "uploads/" + finalPath[2]));
                result(null, { message: `Upload ID ${id} has been deleted successfully` });
            } catch (error) {
                console.error(error);
                result(error, null);
            }
        });
    });
};

module.exports = Upload;