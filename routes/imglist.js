var express = require('express');
var router = express.Router();

const firebaseList = require("../module/list");

router.get('/', async function(req, res, next){
    const urls = await firebaseList();
    res.render('list', {list: urls});
});

module.exports = router;