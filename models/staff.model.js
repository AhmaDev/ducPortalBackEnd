const connection = require('../helpers/db');

const Staff = function (staff) {
    this.staffName = staff.staffName;
    this.sectionId = staff.sectionId;
    this.staffImage = staff.staffImage;
    this.staffPosition = staff.staffPosition;
    this.staffEmail = staff.staffEmail;
    this.scopusLink = staff.scopusLink;
    this.cvLink = staff.cvLink;
    this.scholarLink = staff.scholarLink;
};

Staff.create = function (newStaff, result) {
    connection.query(`INSERT INTO staff SET ?`, newStaff, (err, res) => {
        if (err) {
            console.log("Error while adding a staff", err);
            result(err, null);
            return;
        }
        result(null, { idSTaff: res.insertId, ...newStaff });
    });
};

Staff.getAll = function (result) {
    connection.query(`SELECT * FROM staff`, (err, res) => {
        if (err) {
            console.log("Error while getting all staffs", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Staff.findById = function (id, result) {
    connection.query(`SELECT * FROM staff WHERE idStaff = ${id}`, (err, res) => {
        if (err) {
            console.log("Error while getting staff by ID", err);
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

Staff.findBySectionId = function (id, result) {
    connection.query(`SELECT * FROM staff WHERE sectionId = ${id}`, (err, res) => {
        if (err) {
            console.log("Error while getting staff by ID", err);
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

Staff.findBySectionSlug = function (id, result) {
    connection.query(`SELECT staff.* FROM staff JOIN section ON section.idSection = staff.sectionId WHERE sectionSlug = '${id}'`, (err, res) => {
        if (err) {
            console.log("Error while getting staff by ID", err);
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

Staff.update = function (id, data, result) {
    connection.query(`UPDATE staff SET ? WHERE idStaff = ${id}`, data, (err, res) => {
        if (err) {
            console.log("Error while updating staff by ID", err);
            result(err, null);
            return;
        }
        result(null, { idStaff: res.insertId, ...data });
    });
};

Staff.delete = function (id, result) {
    connection.query(`DELETE FROM staff WHERE idStaff = ?`, id, (err, res) => {
        if (err) {
            console.log("Error while deleting staff by ID", err);
            result(err, null);
            return;
        }
        result(null, {message: `Staff ID ${id} has been deleted successfully`});
    })
}

module.exports = Staff;