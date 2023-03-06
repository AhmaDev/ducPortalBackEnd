const connection = require("../helpers/db");

const Section = function (section) {
  this.sectionName = section.sectionName;
  this.sectionNameEn = section.sectionNameEn;
  this.sectionSlug = section.sectionSlug;
  this.sectionLogo = section.sectionLogo;
  this.vision = section.vision;
  this.visionEn = section.visionEn;
  this.goals = section.goals;
  this.goalsEn = section.goalsEn;
  this.about = section.about;
  this.aboutEn = section.aboutEn;
  this.message = section.message;
  this.messageEn = section.messageEn;
};

Section.create = function (newSection, result) {
  connection.query(`INSERT INTO section SET ?`, newSection, (err, res) => {
    if (err) {
      console.log("Error while adding a section", err);
      result(err, null);
      return;
    }
    result(null, { idSection: res.insertId, ...newSection });
  });
};
Section.createFee = function (newSection, result) {
  connection.query(
    `SELECT * FROM ducApp.sectionFee WHERE sectionId = ${newSection.sectionId} AND level = ${newSection.level}`,
    (checkErr, checkRes) => {
      if (checkRes.length == 0) {
        connection.query(
          `INSERT INTO ducApp.sectionFee SET ?`,
          newSection,
          (err, res) => {
            if (err) {
              console.log("Error while adding a section", err);
              result(err, null);
              return;
            }
            result(null, { message: "OK" });
          },
        );
      } else {
        connection.query(
          `UPDATE ducApp.sectionFee SET ? WHERE ducApp.sectionFee.idSectionFee = ${checkRes[0].idSectionFee}`,
          newSection,
          (err, res) => {
            if (err) {
              console.log("Error while adding a section", err);
              result(err, null);
              return;
            }
            result(null, { message: "OK" });
          },
        );
      }
    },
  );
};

Section.getAll = function (result) {
  connection.query(`SELECT * FROM section`, (err, res) => {
    if (err) {
      console.log("Error while getting all sections", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Section.findById = function (id, result) {
  connection.query(
    `SELECT * FROM section WHERE idSection = ${id}`,
    (err, res) => {
      if (err) {
        console.log("Error while getting section by ID", err);
        result(err, null);
        return;
      }
      if (res.length == 0) {
        result({ kind: "not_found" }, null);
      } else {
        result(null, res[0]);
      }
    },
  );
};

Section.findBySlug = function (id, result) {
  connection.query(
    `SELECT * FROM section WHERE sectionSlug = '${id}'`,
    (err, res) => {
      if (err) {
        console.log("Error while getting section by Slug", err);
        result(err, null);
        return;
      }
      if (res.length == 0) {
        result({ kind: "not_found" }, null);
      } else {
        result(null, res[0]);
      }
    },
  );
};

Section.findAllFees = function (result) {
  connection.query(`SELECT * FROM ducApp.sectionFee`, (err, res) => {
    result(null, res);
  });
};
Section.findFeesBySection = function (id, result) {
  connection.query(
    `SELECT * FROM ducApp.sectionFee WHERE ducApp.sectionFee.sectionId = ${id}`,
    (err, res) => {
      result(null, res);
    },
  );
};

Section.update = function (id, data, result) {
  connection.query(
    `UPDATE section SET ? WHERE idSection = ${id}`,
    data,
    (err, res) => {
      if (err) {
        console.log("Error while updating section by ID", err);
        result(err, null);
        return;
      }
      result(null, { idSection: res.insertId, ...data });
    },
  );
};

Section.delete = function (id, result) {
  connection.query(
    `DELETE FROM section WHERE idSection = ?`,
    id,
    (err, res) => {
      if (err) {
        console.log("Error while deleting section by ID", err);
        result(err, null);
        return;
      }
      result(null, {
        message: `Section ID ${id} has been deleted successfully`,
      });
    },
  );
};

module.exports = Section;
