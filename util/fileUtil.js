const path = require('path');
const fs = require('fs');


// 传入文件夹的路径看是否存在，存在不用管，不存在则直接创建文件夹
/**
 * 判断文件夹是否存在，不存在可以直接创建
 * @param reaPath {String} 文件路径
 * @returns {Promise<boolean>}
 */
exports.exitsFolder = async function (reaPath) {
    const absPath = path.resolve(__dirname, reaPath);
    try {
        await fs.promises.stat(absPath)
    } catch (e) {
        // 不存在文件夹，直接创建
        await fs.promises.mkdir(absPath, {recursive: true})
    }

}

/**
 * 传入一个路径，判断文件是否存在
 * @param realPath 相对路径
 * @returns {Promise<*>}
 */
exports.exitsFile = async (realPath) => {
    const stats = await fs.promises.stat(realPath);
    return !!stats.isFile();
}
