const res = require('express/lib/response');
const connection = require('../helpers/db');

const Page = function (page) {
    this.pageTitle = page.pageTitle;
    this.pageTitleEn = page.pageTitleEn;
    this.pageContent = page.pageContent;
    this.pageContentEn = page.pageContentEn;
    this.createdBy = page.createdBy;
    this.sectionId = page.sectionId;
};

Page.create = function (newPage, result) {
    console.log(newPage);
    connection.query(`INSERT INTO page SET ?`, newPage.page, (err, res) => {
        if (err) {
            console.log("Error while adding a page", err);
            result(err, null);
            return;
        }
        if (newPage.images.length > 0) {
            var images = newPage.images.map(e => [e.imagePath, res.insertId])
            connection.query(`INSERT INTO pageImage (imagePath, pageId) VALUES ?`, [images], (errImages, resultImages) => {
                result(null, { idPage: res.insertId, ...newPage });
            })
        } else {
            result(null, { idPage: res.insertId, ...newPage });
        }
    });
};

Page.getAll = function (result) {
    connection.query(`SELECT * FROM page`, (err, res) => {
        if (err) {
            console.log("Error while getting all pages", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Page.findById = function (id, result) {
    connection.query(`SELECT * FROM page WHERE idPage = ${id}`, (err, res) => {
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

Page.findBySectionId = function (id, result) {
    connection.query(`SELECT *,DATE_FORMAT(createdAt, '%Y-%m-%d %r') As createdAt, (SELECT userName FROM user WHERE idUser = page.createdBy) As createdByName FROM page WHERE sectionId = ${id} ORDER BY idPage DESC`, (err, res) => {
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

Page.update = function (id, data, result) {
    connection.query(`UPDATE page SET ? WHERE idPage = ${id}`, data, (err, res) => {
        if (err) {
            console.log("Error while updating page by ID", err);
            result(err, null);
            return;
        }
        result(null, { idPage: res.insertId, ...data });
    });
};

Page.delete = function (id, result) {
    connection.query(`DELETE FROM page WHERE idPage = ?`, id, (err, res) => {
        if (err) {
            console.log("Error while deleting page by ID", err);
            result(err, null);
            return;
        }
        result(null, { message: `Page ID ${id} has been deleted successfully` });
    })
}

module.exports = Page;