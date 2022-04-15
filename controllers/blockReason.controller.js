const BlockReason = require('../models/blockReason.model');
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Body is empty"
        });
    }
    const blockReason = new BlockReason({
        blockReasonTitle: req.body.blockReasonTitle,
    });
    BlockReason.create(blockReason, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    });
};
exports.findAll = (req, res) => {
    BlockReason.getAll((err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    BlockReason.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind == "not_found") res.sendStatus(404);
            else res.sendStatus(500);
        }
        else res.send(data);
    })
};
exports.updateOne = (req, res) => {
    BlockReason.update(req.params.id, req.body, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
}

exports.deleteOne = (req, res) => {
    BlockReason.delete(req.params.id, (err, data) => {
        if (err) res.sendStatus(500);
        else res.send(data);
    })
}