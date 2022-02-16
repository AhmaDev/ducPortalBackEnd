const connection = require('../helpers/db');

const User = function (user) {
    this.userName = user.userName;
    this.password = user.password;
    this.roleId = user.roleId;
    this.sectionId = user.sectionId;
};


User.login = (loginInfo, result) => {
    connection.query(`SELECT idUser, userName, roleId, roleName, sectionName,sectionId, sectionLogo, sectionSlug FROM user JOIN role ON user.roleId = role.idRole LEFT JOIN section ON user.sectionId = section.idSection WHERE userName = '${loginInfo.userName}' AND password = '${loginInfo.password}'`, (err, res) => {
        if (err) {
            console.log("Login error:", err);
            result(err, null);
            return;
        }
        if (res.length == 0) {
            result({ kind: "not_found" }, null);
        } else {
            result(null, res[0]);
        }
    });
};


User.create = (newUser, result) => {
    connection.query(`INSERT INTO user SET ?`, newUser, (err, res) => {
        if (err) {
            console.log("Add user error:", err);
            result(err, null);
            return;
        }
        result(null, { idUser: res.insertId, ...newUser })
    })
};

User.findById = (id, result) => {
    connection.query(`SELECT idUser, userName, roleId, roleName, sectionName, sectionId, sectionLogo FROM user JOIN role ON user.roleId = role.idRole LEFT JOIN section ON user.sectionId = section.idSection WHERE idUser = ${id}`, (err, res) => {
        if (err) {
            console.log("Find user by ID error:", err);
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

User.getAll = (result) => {
    connection.query(`SELECT idUser, userName, roleId, roleName, sectionName, sectionId, sectionLogo FROM user JOIN role ON user.roleId = role.idRole LEFT JOIN section ON user.sectionId = section.idSection`, (err, res) => {
        result(null, res);
    });
};

User.update = (id, user, result) => {
    connection.query(`UPDATE user SET ? WHERE idUser = ${id}`, user, (err, res) => {
        if (err) {
            console.log("Error while editing a user", err);
            result(err, null);
            return;
        }
        result(null, { idUser: id, ...user });
    })
}

User.delete = (id, result) => {
    connection.query(`DELETE FROM user WHERE idUser = ${id}`, (err, res) => {
        if (err) {
            console.log("Error while deleting a user", err);
            result(err, null);
            return;
        }
        result(null, { message: `User ID ${id} has been deleted successfully` });
    });
}
module.exports = User;