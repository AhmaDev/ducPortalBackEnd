const Staff = require('../models/staff.model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Body is empty"
        });
    }
    const staff = new Staff({
        staffName: req.body.staffName,
        staffImage: req.body.staffImage,
        staffPosition: req.body.staffPosition,
        staffEmail: req.body.staffEmail,
        cvLink: req.body.cvLink,
        scopusLink: req.body.scopusLink,
        scholarLink: req.body.scholarLink,
        sectionId: req.body.sectionId,
    });

    Staff.create(staff, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
};

exports.findAll = (req, res) => {
    Staff.getAll((err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Staff.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") res.sendStatus(404);
            else res.sendStatus(500);
        }
        else res.send(data);
    })
};

exports.findBySectionId = (req, res) => {
    Staff.findBySectionId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") res.sendStatus(404);
            else res.sendStatus(500);
        }
        else res.send(data);
    })
};

exports.findBySectionSlug = (req, res) => {
    Staff.findBySectionSlug(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") res.sendStatus(404);
            else res.sendStatus(500);
        }
        else res.send(data);
    })
};

exports.updateOne = (req, res) => {
    Staff.update(req.params.id, req.body, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
}

exports.deleteOne = (req, res) => {
    Staff.delete(req.params.id, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
}