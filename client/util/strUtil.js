/**
 * 判断传入的字符串是否为一个颜色
 * @param str {String} 颜色
 * @returns {boolean} 结果
 */
export function testColor(str) {
    const reg = new RegExp('^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$');
    return reg.test(str);
}
