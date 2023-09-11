var express = require("express");
var router = express.Router();
const upload = require("../controllers/upload.controller");
const uploader = require("../middlewares/upload.middleware");
const path = require("path");
const fs = require("fs");
const dirRoot = require("../app");
var auth = require("../middlewares/auth.middleware");

// router.get('/', auth.roles('Website Editor'), upload.findAll);
// router.post('/', auth.roles('Website Editor'), uploader.array('file', 25), upload.create);
router.get("/:id", upload.findOne);
// router.get('/section/:id', auth.roles('Website Editor'), upload.findBySectionId);
// router.put('/:id', auth.roles('Website Editor'), upload.updateOne);
// router.delete('/:id', auth.roles('Website Editor'), upload.deleteOne);

router.get("/view/:file", function (request, response) {
  let file = request.params.file;
  var extension = file.split(".").pop();
  var tempFile = path.join(__dirname, "..", "uploads/" + file);
  fs.readFile(tempFile, function (err, data) {
    switch (extension) {
      case "jpg":
        contentType = "image/jpg";
        isImage = 1;
        break;
      case "png":
        contentType = "image/png";
        isImage = 1;
        break;
      case "pdf":
        contentType = "application/pdf";
        isImage = 2;
        break;
      case "jpeg":
        contentType = "image/jpeg";
        isImage = 1;
        break;
    }
    if (
      ["jpg", "jpeg", "png", "gif", "pdf", "mp4", "mp3"].includes(extension)
    ) {
      response.contentType(contentType);
      response.send(data);
    } else {
      response.download(tempFile);
    }
  });
});

module.exports = router;
