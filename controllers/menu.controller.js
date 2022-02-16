const Menu = require('../models/menu.model');

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Body is empty"
        });
    }
    const menu = new Menu({
        sectionId: req.body.sectionId,
    });

    Menu.create(menu, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
};

exports.createNewLink = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Body is empty"
        });
    }

    Menu.createNewLink(req.body, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
};

exports.findAll = (req, res) => {
    Menu.getAll((err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Menu.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") res.sendStatus(404);
            else res.sendStatus(500);
        }
        else res.send(data);
    })
};

exports.findBySectionId = (req, res) => {
    Menu.findBySectionId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") res.sendStatus(404);
            else res.sendStatus(500);
        }
        else res.send(data);
    })
};

exports.updateOne = (req, res) => {
    Menu.update(req.params.id, req.body, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
}

exports.deleteOne = (req, res) => {
    Menu.delete(req.params.id, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
}

exports.deleteLink = (req, res) => {
    Menu.deleteLink(req.params.id, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
}