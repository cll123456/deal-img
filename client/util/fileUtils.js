import {ElMessage} from "element-plus";

/**
 * 转换文件的大小
 * @param limit b
 * @returns {string}
 */
export function transformFileSize(limit) {
    let size = ''
    if (limit < 0.1 * 1024) {                            //小于0.1KB，则转化成B
        size = limit.toFixed(2) + 'B'
    } else if (limit < 0.1 * 1024 * 1024) {            //小于0.1MB，则转化成KB
        size = (limit / 1024).toFixed(2) + 'KB'
    } else if (limit < 0.1 * 1024 * 1024 * 1024) {        //小于0.1GB，则转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + 'MB'
    } else {                                            //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
    }

    let sizeStr = size + ''                        //转成字符串
    let index = sizeStr.indexOf('.')                    //获取小数点处的索引
    let dou = sizeStr.substr(index + 1, 2)            //获取小数点后两位的值
    if (dou === '00') {                                //判断后两位是否为00，如果是则删除00
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }
    return size
}

/**
 * 图片的标准，工具类
 * @param files 图片对象
 * @returns {boolean}
 */
export function imgStandard(files){
    if (!files.files[0]) return false;
    let types = ['jpg','jpeg', 'png'];
    let fileType = files.files[0].type.split('/')[1]
    // 判断图片的类型
    if (!types.includes(fileType)) {
        ElMessage.warning({
            message: '请上传图片后缀名为jpg,jpeg或者是png的图片！',
            type: 'warning'
        });
        return false;
    }
    // 图片大小在100MB以内
    if (files.files[0].size / 1024 / 1024 > 100){
        ElMessage.warning({
            message: '图片大小在100MB以内！',
            type: 'warning'
        });
        return false;
    }

    return true;
}
