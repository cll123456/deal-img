/**
 * 普通二维码的默认数据
 * @type {{margin: number, size: number, mainColor: string, text: string, subColor: string}}
 */
export const qrcodeJson = {
    text: "",
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
    text: "", // 文本
    margin: 5, // 边距
    size: 180, // 大小
    level: "M", // 容错等级
    dotColor: '#000', // 点的颜色
    bgColor: '#EEEAEA', // 背景颜色
    posOutColor: '#c33', // 定位器外方块颜色
    posInnerColor: '#621',// 定位器内部颜色
    shape: 'round', // 二维码的形状
    shapePercent: 50, // 二维码的形状的百分比
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
