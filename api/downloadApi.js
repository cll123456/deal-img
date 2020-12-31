const express = require('express');
const {exitsFile} = require("../util/fileUtil");
const router = express.Router();

router.get('/:fileName', (req, res) => {
    // 判断文件是否存在，存在则进行下载，
    const fileName = req.params.fileName;
    const folder = req.query.folder;
    const realPath = folder + '/' + fileName
    if (exitsFile(realPath)) {
        // 图片下载
        res.download(realPath, fileName);
    }
})

module.exports = router;
