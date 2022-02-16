var express = require('express');
var router = express.Router();
const upload = require('../controllers/upload.controller');
const uploader = require('../middlewares/upload.middleware');
const path = require('path');
const dirRoot = require('../app')
const fs = require('fs');
var auth = require('../middlewares/auth.middleware');

router.get('/', auth.roles('Website Editor') ,upload.findAll);
router.post('/', auth.roles('Website Editor') , uploader.array('file', 25), upload.create);
router.get('/:id', upload.findOne);
router.get('/section/:id', auth.roles('Website Editor') ,upload.findBySectionId);
router.put('/:id', auth.roles('Website Editor'), upload.updateOne);
router.delete('/:id', auth.roles('Website Editor'), upload.deleteOne);

router.get("/view/:file", function (request, response) {
    let file = request.params.file;
    var extension = file.split(".").pop();
    var tempFile = path.join(__dirname,'..', 'uploads/' + file)
    console.log(dirRoot);
    fs.readFile(tempFile, function (err, data) {
       console.log(err);
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
       response.contentType(contentType);
       response.send(data);
    });
 });


module.exports = router;
