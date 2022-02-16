const Post = require('../models/post.model');
const sanitizeHtml = require('sanitize-html');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Body is empty"
        });
    }
    const post = new Post({
        postTitle: req.body.postTitle,
        postTitleEn: req.body.postTitleEn,
        postContent: sanitizeHtml(req.body.postContent),
        postContentEn: sanitizeHtml(req.body.postContentEn),
        postImage: req.body.postImage,
        sectionId: req.body.sectionId,
        createdBy: req.body.createdBy,
        isSlider: req.body.isSlider,
    });

    Post.create(post, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
};

exports.findAll = (req, res) => {
    Post.getAll((err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Post.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") res.sendStatus(404);
            else res.sendStatus(500);
        }
        else res.send(data);
    })
};

exports.findBySectionId = (req, res) => {
    Post.findBySectionId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") res.sendStatus(404);
            else res.sendStatus(500);
        }
        else res.send(data);
    })
};

exports.findSliderBySectionId = (req, res) => {
    Post.findSliderBySectionId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") res.sendStatus(404);
            else res.sendStatus(500);
        }
        else res.send(data);
    })
};

exports.updateOne = (req, res) => {
    Post.update(req.params.id, req.body, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
}

exports.deleteOne = (req, res) => {
    Post.delete(req.params.id, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
}