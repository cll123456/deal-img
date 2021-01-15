/**
 * 普通二维码的默认数据
 * @type {{margin: number, size: number, mainColor: string, text: string, subColor: string}}
 */
export const qrcodeJson = {
    text: "https://www.baidu.com",
    margin: 2,
    size: 180,
    mainColor: "#000",
    subColor: "#EEEAEA",
}


/**
 * logo二维码的基础选项
 * @type {{margin: number, size: number, level: string, text: string}}
 */
export const logoQrCodeBaseJson = {
    text: "https://www.baidu.com", // 文本
    margin: 5, // 边距
    size: 180, // 大小
    level: "M", // 容错等级
    dotColor: '#000', // 点的颜色
    bgColor: '#EEEAEA', // 背景颜色
    posOutColor: '#c33', // 定位器外方块颜色
    posInnerColor: '#621',// 定位器内部颜色
    shape: 'round', // 二维码的形状
    shapePercent: 50, // 二维码的形状的百分比
    logoText: 'QRCODE', // 默认二维码内部的文字
    logoTextColor: '#c33', // 默认二维码内部的文字的颜色
    logoTextSize: 12, // 默认二维码内部的文字的大小
    logoTextFam: 'KaiTi_GB2312', // 默认二维码内部的文字的样式
    logoImgSize: 20, // logo图标的大小
    logoImg: '', // logo图标的dom
}
/**
 * 二维码的容错等级
 * @type {({label: string, value: string}|{label: string, value: string}|{label: string, value: string}|{label: string, value: string})[]}
 */
export const levelOptions = [{
    value: 'L',
    label: '最低（可遮7%）'
}, {
    value: 'M',
    label: '低（可遮15%）'
}, {
    value: 'Q',
    label: '中等（可遮25%）'
}, {
    value: 'H',
    label: '高（可遮30%）'
}]

/**
 * 二维码文字的的样式
 * @type {({label: string, value: string}|{label: string, value: string}|{label: string, value: string}|{label: string, value: string}|{label: string, value: string})[]}
 */
export const fontFamilyOptions = [
    {value: '宋体', label: '宋体'},
    {value: '隶书', label: '隶书'},
    {value: '黑体', label: '黑体'},
    {value: 'KaiTi_GB2312', label: 'KaiTi_GB2312'},
    {value: '微软雅黑', label: '微软雅黑'},
    {value: '华文彩云', label: '华文彩云'},
    {value: '方正舒体', label: '方正舒体'},
    {value: '幼圆', label: '幼圆'},]
