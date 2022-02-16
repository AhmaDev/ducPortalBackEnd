const connection = require('../helpers/db');

const Post = function (post) {
    this.postTitle = post.postTitle;
    this.postTitleEn = post.postTitleEn;
    this.createdBy = post.createdBy;
    this.sectionId = post.sectionId;
    this.postContent = post.postContent;
    this.postContentEn = post.postContentEn;
    this.postImage = post.postImage;
    this.isSlider = post.isSlider;
};

Post.create = function (newPost, result) {
    connection.query(`INSERT INTO post SET ?`, newPost, (err, res) => {
        if (err) {
            console.log("Error while adding a post", err);
            result(err, null);
            return;
        }
        result(null, { idPost: res.insertId, ...newPost });
    });
};

Post.getAll = function (result) {
    connection.query(`SELECT *, DATE_FORMAT(createdAt, '%Y-%m-%d %r') As createdAt, (SELECT userName FROM user WHERE idUser = post.createdBy) As createdByName FROM post`, (err, res) => {
        if (err) {
            console.log("Error while getting all posts", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Post.findById = function (id, result) {
    connection.query(`SELECT *, DATE_FORMAT(createdAt, '%Y-%m-%d %r') As createdAt, (SELECT userName FROM user WHERE idUser = post.createdBy) As createdByName FROM post WHERE idPost = ${id}`, (err, res) => {
        if (err) {
            console.log("Error while getting post by ID", err);
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


Post.findBySectionId = function (id, result) {
    connection.query(`SELECT *, DATE_FORMAT(createdAt, '%Y-%m-%d %r') As createdAt, (SELECT userName FROM user WHERE idUser = post.createdBy) As createdByName FROM post WHERE sectionId = ${id} ORDER BY idPost DESC`, (err, res) => {
        if (err) {
            console.log("Error while getting post by ID", err);
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

Post.findSliderBySectionId = function (id, result) {
    connection.query(`SELECT *, DATE_FORMAT(createdAt, '%Y-%m-%d %r') As createdAt, (SELECT userName FROM user WHERE idUser = post.createdBy) As createdByName FROM post WHERE sectionId = ${id} AND isSlider = 1 ORDER BY idPost DESC`, (err, res) => {
        if (err) {
            console.log("Error while getting post by ID", err);
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

Post.update = function (id, data, result) {
    console.log(data);
    connection.query(`UPDATE post SET ? WHERE idPost = ${id}`, data, (err, res) => {
        if (err) {
            console.log("Error while updating post by ID", err);
            result(err, null);
            return;
        }
        result(null, { idPost: res.insertId, ...data });
    });
};

Post.delete = function (id, result) {
    connection.query(`DELETE FROM post WHERE idPost = ?`, id, (err, res) => {
        if (err) {
            console.log("Error while deleting post by ID", err);
            result(err, null);
            return;
        }
        result(null, {message: `Post ID ${id} has been deleted successfully`});
    })
}

module.exports = Post;