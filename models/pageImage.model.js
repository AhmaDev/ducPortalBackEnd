const connection = require('../helpers/db');

const PageImage = function (pageImage) {
    this.pageId = pageImage.pageId;
    this.imagePath = pageImage.imagePath;
};

PageImage.create = function (newPage, result) {
    connection.query(`INSERT INTO pageImage SET ?`, newPage, (err, res) => {
        if (err) {
            console.log("Error while adding a page", err);
            result(err, null);
            return;
        }
        result(null, { idPage: res.insertId, ...newPage });
    });
};

PageImage.getAll = function (result) {
    connection.query(`SELECT * FROM pageImage`, (err, res) => {
        if (err) {
            console.log("Error while getting all pages", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

PageImage.findById = function (id, result) {
    connection.query(`SELECT * FROM pageImage WHERE idPageImage = ${id}`, (err, res) => {
        if (err) {
            console.log("Error while getting page by ID", err);
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

PageImage.findByPageId = function (id, result) {
    connection.query(`SELECT * FROM pageImage WHERE pageId = ${id}`, (err, res) => {
        if (err) {
            console.log("Error while getting page by ID", err);
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

PageImage.update = function (id, data, result) {
    connection.query(`UPDATE pageImage SET ? WHERE idPageImage = ${id}`, data, (err, res) => {
        if (err) {
            console.log("Error while updating page by ID", err);
            result(err, null);
            return;
        }
        result(null, { idPage: res.insertId, ...data });
    });
};

PageImage.delete = function (id, result) {
    connection.query(`DELETE FROM pageImage WHERE idPageImage = ?`, id, (err, res) => {
        if (err) {
            console.log("Error while deleting page by ID", err);
            result(err, null);
            return;
        }
        result(null, {message: `Page ID ${id} has been deleted successfully`});
    })
}

module.exports = PageImage;