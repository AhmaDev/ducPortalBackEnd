const connection = require('../helpers/db');

const Menu = function (menu) {
    this.sectionId = menu.sectionId;
};

Menu.create = function (newMenu, result) {
    connection.query(`INSERT INTO menu SET ?`, newMenu, (err, res) => {
        if (err) {
            console.log("Error while adding a menu", err);
            result(err, null);
            return;
        }
        result(null, { idMenu: res.insertId, ...newMenu });
    });
};

Menu.createNewLink = function (newMenu, result) {
    connection.query(`INSERT INTO menuContent SET ?`, newMenu, (err, res) => {
        if (err) {
            console.log("Error while adding a menu", err);
            result(err, null);
            return;
        }
        result(null, { idMenuContent: res.insertId, ...newMenu });
    });
};

Menu.getAll = function (result) {
    connection.query(`SELECT *, (SELECT GROUP_CONCAT(json_object('idMenuContent',idMenuContent,'title',title,'pageId',pageId,'externalLink',externalLink,'isExternalLink', isExternalLink, 'parent' , parent)) FROM menuContent WHERE menuId = menu.idMenu) As childs FROM menu`, (err, res) => {
        if (err) {
            console.log("Error while getting all menus", err);
            result(err, null);
            return;
        }
        formattedData = res.map(row => (row.childs = '[' + row.childs + ']', row));
        formattedData = res.map(row => (row.childs = JSON.parse(row.childs), row));
        result(null, formattedData);
    });
};

Menu.findById = function (id, result) {
    connection.query(`SELECT *, (SELECT GROUP_CONCAT(json_object('idMenuContent',idMenuContent,'title',title,'pageId',pageId,'externalLink',externalLink,'isExternalLink', isExternalLink, 'parent' , parent)) FROM menuContent WHERE menuId = menu.idMenu) As childs FROM menu WHERE idMenu = ${id}`, (err, res) => {
        if (err) {
            console.log("Error while getting menu by ID", err);
            result(err, null);
            return;
        }
        if (res.length == 0) {
            result({ kind: 'not_found' }, null);
        } else {
            formattedData = res.map(row => (row.childs = '[' + row.childs + ']', row));
            formattedData = res.map(row => (row.childs = JSON.parse(row.childs), row));
            if (formattedData[0].childs[0] == null) {
                formattedData[0].childs = [];
            }
            result(null, formattedData[0]);
        }
    });
};

Menu.findBySectionId = function (id, result) {
    connection.query(`SELECT * , (SELECT GROUP_CONCAT(json_object('idMenuContent',idMenuContent,'title',title,'pageId',pageId,'externalLink',externalLink,'isExternalLink', isExternalLink, 'parent' , parent)) FROM menuContent WHERE menuId = menu.idMenu) As childs FROM menu WHERE sectionId = ${id}`, (err, res) => {
        if (err) {
            console.log("Error while getting menu by ID", err);
            result(err, null);
            return;
        }
        if (res.length == 0) {
            result({ kind: 'not_found' }, null);
        } else {
            formattedData = res.map(row => (row.childs = '[' + row.childs + ']', row));
            formattedData = res.map(row => (row.childs = JSON.parse(row.childs), row));
            if (formattedData[0].childs[0] == null) {
                formattedData[0].childs = [];
            }
            result(null, formattedData[0]);
        }
    });
};

Menu.update = function (id, data, result) {
    connection.query(`UPDATE menu SET ? WHERE idMenu = ${id}`, data, (err, res) => {
        if (err) {
            console.log("Error while updating menu by ID", err);
            result(err, null);
            return;
        }
        result(null, { idMenu: res.insertId, ...data });
    });
};

Menu.delete = function (id, result) {
    connection.query(`DELETE FROM menu WHERE idMenu = ?`, id, (err, res) => {
        if (err) {
            console.log("Error while deleting menue by ID", err);
            result(err, null);
            return;
        }
        connection.query(`DELETE FROM menuContent WHERE menuId = ?`, id, (errContent,resContent) => {
            result(null, { message: `Menu ID ${id} has been deleted successfully` });
        })
    })
}

Menu.deleteLink = function (id, result) {
    connection.query(`DELETE FROM menuContent WHERE idMenuContent = ?`, id, (err, res) => {
        if (err) {
            console.log("Error while deleting menue by ID", err);
            result(err, null);
            return;
        }
        connection.query(`DELETE FROM menuContent WHERE parent = ?`, id, (errContent,resContent) => {
            result(null, { message: `Menu ID ${id} has been deleted successfully` });
        })
    })
}

module.exports = Menu;