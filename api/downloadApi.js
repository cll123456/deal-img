const express = require('express');
const {exitsFile} = require("../util/fileUtil");
const router = express.Router();
const url = require('url');

router.get('/', async (req, res, next) => {
    // 判断文件是否存在，存在则进行下载，
    const filePath = req.query.filePath;
    const fileName = req.query.fileName;
    try {
        if (await exitsFile(filePath)) {
            // 图片下载
            res.download(filePath, fileName);
        }
    } catch (e) {
        new Error('文件不存在，请重新上传');
        next();
    }
})

module.exports = router;
