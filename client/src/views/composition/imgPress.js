import {transformFileSize, uploadFileAndPress} from "../../../util/fileUtils.js";

/**
 * 压缩图片的公共方法
 * @param files
 * @param hasChooseFileLoadingRef
 * @param imgListRef
 * @returns {Promise<void>}
 */
export async function imgPress(files, hasChooseFileLoadingRef, imgListRef) {
    // 列表显示的文件对象
    let obj = {
        fileName: files.files[0].name, // 文件名称
        fileOriSizeB: files.files[0].size, // 文件原始大小
        fileOriSize: transformFileSize(files.files[0].size), // 文件转换后的大小
        process: 100, // 进度条的默认宽度
        processTxt: '压缩中', // 进度条里面的文字
        bgColor: '#409eff', // 进度条的背景颜色
        hasActive: true, // 进度条是否运动
        hasStriped: true, // 进度条是否有斑马纹
        hasTxt: true, // 进度条是否有文字
        pressFileSize: '', // 文件压缩后的大小
        reduce: '', // 文件压缩后的大小
        hasShowDownload: false, // 是否显示下载按钮
    }
    imgListRef.value.push(obj)
    // 压缩文件
    const pressRe = await uploadFileAndPress(files);
    obj.bgColor = '#67C23A';
    obj.processTxt = '完成';
    obj.hasShowDownload = true;
    obj.hasStriped = false;
    obj.pressFileSize = transformFileSize(+pressRe.data.size);
    obj.url = pressRe.data.url;
    obj.reduce = -(((obj.fileOriSizeB - pressRe.data.size) / obj.fileOriSizeB) * 100).toFixed(2) + '%'
    hasChooseFileLoadingRef.value = false;
}


