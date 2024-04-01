var express = require('express');
var multer = require('multer');
var router = express.Router();

// 파일을 메모리에 Buffer 객체로 저장
const multerStorage = multer.memoryStorage()
const upload = multer({ storage: multerStorage })

const firebaseUpload = require('../module/upload.js');

router.post('/', upload.single('img'), async function(req, res, next) {
    let strResult = "성공";
    let uploadTime = 0;

    const timestamp = Date.now();  // 파일 고유 값을 위한 timestamp
    let imgName = req.body.img_name;
    const oriName = req.file.originalname;
    const buffer = req.file.buffer;

    if (imgName === "") {
        imgName = oriName;
    }
    
    // 파일 확장자
    const extenIndex = oriName.lastIndexOf('.');
    const extension = oriName.slice(extenIndex).toLowerCase();

    // 저장할 파일 이름
    const fileName =  imgName + '_' + timestamp + extension;

    console.log(fileName + " 업로드 시작");

    try {
      uploadTime = await firebaseUpload(fileName, req.file.metadata, buffer);
    } catch(e) {
      strResult = "실패";
    }
    
    await res.render('result', {result: strResult, time: uploadTime});
});

module.exports = router;