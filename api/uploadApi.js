const multer = require('multer');
const path = require('path');
const {exitsFolder} = require("../util/fileUtil");
const express = require('express');
const {successMsg} = require("../util/apiUtils");
const router = express.Router();
const fileStorage = './../public/upload/origin/'
// 文件的存储位置
const storage = multer.diskStorage({
    // 存储位置
    destination: async function (req, file, cb) {
        try {
            await exitsFolder(fileStorage);
        } catch (e) {
            throw Error(e.msg);
        }
        cb(null, path.resolve(__dirname, fileStorage));
    },
    // 文件命名
    filename: function (req, file, cb) {
        // 文件后缀名
        const extName = path.extname(file.originalname);
        // 文件命名
        const fileName = Date.now() + '-' + Math.random().toString(36).slice(-6) + extName;
        cb(null, fileName);
    }
})
// 过滤文件
const fileFilter = (req, file, cb) => {
    const files = ['.jpg', '.jpeg', '.png', '.gif'];
    const extName = path.extname(file.originalname);
    if (files.includes(extName)) {
        cb(null, true)
    } else {
        cb(null, false);
        // 不接受文件后缀名，抛出异常
        cb(new Error('I don\'t accept this file, i can accept file of extensions in jpg, jpeg, png, gif !'))
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024 // 限制图片大小在10MB
    }
});

// 上传文件的路由
router.post('/',
    upload.single('img'),
    (req, res) => {
        const obj = successMsg('上传成功', {
            url: path.resolve(__dirname, fileStorage, req.file.filename),
        })
        res.status(200).send(obj);
    })

module.exports = router;
