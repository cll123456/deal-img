// 压缩图片
const express = require('express');
const router = express.Router();
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const {exitsFolder} = require("../util/fileUtil");
const path = require('path');

router.get('/:fileName', async (req, res) => {
    const fileName = req.query.fileName;
    const pressImgPath = './../public/pressImg'
    if (exitsFolder(pressImgPath)) {
        const files = await imagemin(fileName, {
            destination: path.resolve(__dirname, pressImgPath, fileName),
            plugins: [
                imageminJpegtran(),
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        });
        //
    }
})

module.exports = router;
