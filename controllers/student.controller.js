const Student = require('../models/student.model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Body is empty"
        });
    }
    const student = new Student({
        email: req.body.email,
        sectionId: req.body.sectionId,
        level: req.body.level,
    });

    Student.create(student, (err, data) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.sendStatus(409);
            } else {
                res.sendStatus(500);
            }
        }
        else res.send(data);
    })
};

exports.findAll = (req, res) => {
    Student.getAll((err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Student.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") res.sendStatus(404);
            else res.sendStatus(500);
        }
        else res.send(data);
    })
};

exports.findOneByEmail = (req, res) => {
    Student.findByEmail(req.params.email, (err, data) => {
        if (err) {
            if (err.kind == "not_found") res.sendStatus(404);
            else res.sendStatus(500);
        }
        else res.send(data);
    })
};



exports.updateOne = (req, res) => {
    Student.update(req.params.id, req.body, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
}

exports.deleteOne = (req, res) => {
    Student.delete(req.params.id, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
}