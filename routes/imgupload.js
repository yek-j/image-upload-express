var express = require('express');
var multer = require('multer');
var router = express.Router();

// 파일을 메모리에 Buffer 객체로 저장
const multerStorage = multer.memoryStorage()
const upload = multer({ storage: multerStorage })

const storage = getStorage(app);

router.post('/', upload.single('img'), function(req, res, next) {
    let strResult = "성공";

    const timestamp = Date.now();  // 파일 고유 값을 위한 timestamp
    const imgName = req.body.img_name;
    const oriName = req.file.originalname;
    const buffer = req.file.buffer;

    // 파일 확장자
    const extenIndex = oriName.lastIndexOf('.');
    const extension = oriName.slice(extenIndex).toLowerCase();

    // 저장할 파일 이름
    const fileName =  imgName + '_' + timestamp + extension;

    console.log(fileName + "업로드 시작");
    
    res.render('result', {result: strResult});
});

module.exports = router;