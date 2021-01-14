// 生成带logo的公共方法
import {qrcanvas} from 'qrcanvas';

/**
 * 生成二维码
 * @param id {String} 二维码绑定的id
 * @param qrDataRef 需要传入一个响应式数据
 */
export function generateQRCode(qrDataRef, id = 'logoQrcode') {
    const colorFore = qrDataRef.value.dotColor; // 点的颜色
    const bgColor = qrDataRef.value.bgColor; // 背景颜色
    const colorOut = qrDataRef.value.posOutColor; // 定位器外部颜色
    const colorIn = qrDataRef.value.posInnerColor; // 定位器内部颜色
    // 组装二维码的形状
    const effect = qrDataRef.type === 'none' ? {} : {
        type: qrDataRef.value.shape, // 形状的类型
        value:qrDataRef.value.shapePercent / 100, // 二维码的形状的百分比 / 100 是需要 0 - 1
    }
    const canvas = qrcanvas({
        data: qrDataRef.value.text, // 二维码的数据
        correctLevel: qrDataRef.value.level, // 容错等级
        size: qrDataRef.value.size, // 二维码的大小
        padding: qrDataRef.value.margin, // 二维码的间距
        effect,
        foreground: [
            // foreground color
            {style: colorFore},
            // outer squares of the positioner
            {row: 0, rows: 7, col: 0, cols: 7, style: colorOut},
            {row: -7, rows: 7, col: 0, cols: 7, style: colorOut},
            {row: 0, rows: 7, col: -7, cols: 7, style: colorOut},
            // inner squares of the positioner
            {row: 2, rows: 3, col: 2, cols: 3, style: colorIn},
            {row: -5, rows: 3, col: 2, cols: 3, style: colorIn},
            {row: 2, rows: 3, col: -5, cols: 3, style: colorIn},
        ],
        background: [
            {style: bgColor},
        ]
    });
    const parQRcDom = document.getElementById(id);
    parQRcDom.innerHTML = '';
    parQRcDom.appendChild(canvas);

}
