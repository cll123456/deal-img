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
router.get('/', async (req, res) => {
    const fileName = req.query.fileName;
    try {
        // 是否存在文件，存在输出文件夹
        if (await exitsFile(fileName)) {
            await exitsFolder(pressImgOutPath)
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
            const obj = successMsg('压缩成功', {
                url: files[0].sourcePath,
            })
            res.status(200).send(obj);
        } else {
            new new Error('the file is not exits')
        }
    } catch (e) {
        throw new Error(e.msg);
    }

})

module.exports = router;
