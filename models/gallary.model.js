const connection = require('../helpers/db');

const Gallary = function (gallary) {
    this.image = gallary.image;
    this.sectionId = gallary.sectionId;
};

Gallary.create = function (newGallary, result) {
    connection.query(`INSERT INTO gallary SET ?`, newFile, (err, res) => {
        if (err) {
            console.log("Error while adding a gallary", err);
            result(err, null);
            return;
        }
        result(null, { idGallery: res.insertId, ...newGallary });
    });
};

Gallary.getAll = function (result) {
    connection.query(`SELECT * FROM gallary`, (err, res) => {
        if (err) {
            console.log("Error while getting all gallary", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Gallary.findById = function (id, result) {
    connection.query(`SELECT * FROM gallary WHERE idGallary = ${id}`, (err, res) => {
        if (err) {
            console.log("Error while getting gallary by ID", err);
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

Gallary.findBySectionId = function (id, result) {
    connection.query(`SELECT * FROM gallary WHERE sectionId = ${id}`, (err, res) => {
        if (err) {
            console.log("Error while getting gallary by ID", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Gallary.update = function (id, data, result) {
    connection.query(`UPDATE gallary SET ? WHERE idGallary = ${id}`, data, (err, res) => {
        if (err) {
            console.log("Error while updating gallary by ID", err);
            result(err, null);
            return;
        }
        result(null, { idGallary: res.insertId, ...data });
    });
};

Gallary.delete = function (id, result) {
    connection.query(`DELETE FROM gallary WHERE idGallary = ?`, id, (err, res) => {
        if (err) {
            console.log("Error while deleting gallary by ID", err);
            result(err, null);
            return;
        }
        result(null, { message: `Gallary ID ${id} has been deleted successfully` });
    })
}

module.exports = Gallary;