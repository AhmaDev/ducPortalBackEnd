const connection = require('../helpers/db');

const BlockReason = function (blockReason) {
    this.blockReasonTitle = blockReason.blockReasonTitle;
};

BlockReason.create = (newBlockReason, result) => {
    connection.query(`INSERT INTO blockReason SET ?`, newBlockReason, (err, res) => {
        if (err) {
            console.log("Add blockReason error:", err);
            result(err, null);
            return;
        }
        result(null, { idBlockReason: res.insertId, ...newBlockReason })
    })
};


BlockReason.getAll = (result) => {
    connection.query(`SELECT * FROM blockReason`, (err, res) => {
        result(null, res);
    });
};

BlockReason.findById = (id, result) => {
    connection.query(`SELECT * FROM blockReason WHERE idBlockReason = ${id}`, (err, res) => {
        if (err) {
            console.log("Find By ID: blockReason error:", err);
            result(err, null);
            return;
        }
        if (res.length == 0) {
            result({ kind: "not_found" }, null);
        } else {
            result(null, res[0]);
        }
    })
};


BlockReason.update = (id, blockReason, result) => {
    connection.query(`UPDATE blockReason SET ? WHERE idBlockReason = ${id}`, blockReason, (err, res) => {
        if (err) {
            console.log("Error while editing a blockReason", err);
            result(err, null);
            return;
        }
        result(null, { idBlockReason: id, ...blockReason });
    })
}
BlockReason.delete = (id, result) => {
    connection.query(`DELETE FROM blockReason WHERE idBlockReason = ${id}`, (err, res) => {
        if (err) {
            console.log("Error while deleting a blockReason", err);
            result(err, null);
            return;
        }
        result(null, { message: `BlockReason ID ${id} has been deleted successfully` });
    });
}
module.exports = BlockReason;
