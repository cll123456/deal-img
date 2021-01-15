// 压缩图片
const express = require('express');
const router = express.Router();
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const {exitsFolder} = require("../util/fileUtil");
const path = require('path');
const {successMsg} = require("../util/apiUtils");
const {exitsFile} = require("../util/fileUtil");
const pressImgOutPath = './../public/upload/pressImg'
const fs = require('fs');
const {timerClearFile} = require("../util/timerUtils");


router.get('/', async (req, res, next) => {
    const fileName = req.query.fileName;
    try {
        // 是否存在文件，存在输出文件夹
        if (await exitsFile(fileName)) {
            await exitsFolder(pressImgOutPath)
            // 压缩文件
            const files = await imagemin([fileName], {
                glob: false,
                destination: path.resolve(__dirname, pressImgOutPath),
                plugins: [
                    imageminJpegtran({
                        quality: 50,
                    }),
                    imageminPngquant({
                        quality: [0.6, 0.8]
                    })
                ]
            });
            // 需要读取文件
            const pressFilePath = files[0].destinationPath;
            const fileStats = await fs.promises.stat(pressFilePath)
            console.log(fileStats,files,'----')
            const obj = successMsg('压缩成功', {
                url: pressFilePath,
                size: fileStats.size,
            })
            res.status(200).send(obj);
            timerClearFile(pressFilePath, 30 * 60)
        } else {
            new Error('the file is not exits');
        }
    } catch (e) {
        throw new Error(e.msg);
    }
    next();
})

module.exports = router;
