const connection = require('../helpers/db');

const Lesson = function (lesson) {
    this.lessonName = lesson.lessonName;
    this.sectionId = lesson.sectionId;
    this.lessonLevel = lesson.lessonLevel;
};

Lesson.create = function (newLesson, result) {
    connection.query(`INSERT INTO lesson SET ?`, newLesson, (err, res) => {
        if (err) {
            console.log("Error while adding a lesson", err);
            result(err, null);
            return;
        }
        result(null, { idLesson: res.insertId, ...newLesson });
    });
};

Lesson.getAll = function (result) {
    connection.query(`SELECT * FROM lesson`, (err, res) => {
        if (err) {
            console.log("Error while getting all lessons", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Lesson.findById = function (id, result) {
    connection.query(`SELECT * FROM lesson WHERE idLesson = ${id}`, (err, res) => {
        if (err) {
            console.log("Error while getting lesson by ID", err);
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

Lesson.findBySectionId = function (id, result) {
    connection.query(`SELECT * FROM lesson WHERE sectionId = ${id}`, (err, res) => {
        if (err) {
            console.log("Error while getting lesson by ID", err);
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

Lesson.findBySectionSlug = function (id, result) {
    connection.query(`SELECT lesson.* FROM lesson JOIN section ON section.idSection = lesson.sectionId WHERE section.sectionSlug = '${id}'`, (err, res) => {
        if (err) {
            console.log("Error while getting lesson by ID", err);
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

Lesson.update = function (id, data, result) {
    connection.query(`UPDATE lesson SET ? WHERE idLesson = ${id}`, data, (err, res) => {
        if (err) {
            console.log("Error while updating lesson by ID", err);
            result(err, null);
            return;
        }
        result(null, { idLesson: res.insertId, ...data });
    });
};

Lesson.delete = function (id, result) {
    connection.query(`DELETE FROM lesson WHERE idLesson = ?`, id, (err, res) => {
        if (err) {
            console.log("Error while deleting lesson by ID", err);
            result(err, null);
            return;
        }
        result(null, {message: `Lesson ID ${id} has been deleted successfully`});
    })
}

module.exports = Lesson;