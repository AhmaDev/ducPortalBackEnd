const Section = require('../models/section.model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Body is empty"
        });
    }
    const section = new Section({
        sectionName: req.body.sectionName,
        sectionNameEn: req.body.sectionNameEn,
        sectionSlug: req.body.sectionSlug,
        sectionLogo: req.body.sectionLogo,
        vision: req.body.vision,
        visionEn: req.body.visionEn,
        about: req.body.about,
        aboutEn: req.body.aboutEn,
        message: req.body.message,
        messageEn: req.body.messageEn,
        goals: req.body.goals,
        goalsEn: req.body.goalsEn,
    });

    Section.create(section, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
};

exports.findAll = (req, res) => {
    Section.getAll((err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Section.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") res.sendStatus(404);
            else res.sendStatus(500);
        }
        else res.send(data);
    })
};

exports.findOneBySlug = (req, res) => {
    Section.findBySlug(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") res.sendStatus(404);
            else res.sendStatus(500);
        }
        else res.send(data);
    })
};

exports.updateOne = (req, res) => {
    Section.update(req.params.id, req.body, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
}

exports.deleteOne = (req, res) => {
    Section.delete(req.params.id, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
}