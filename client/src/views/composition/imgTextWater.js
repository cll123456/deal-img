// 图片文字水印
export async function waterTextImg(formRef, id) {
    // new 一个图片对象，进行加载
    const img = new Image();
    img.src = formRef.value.textImgSrc;
    img.setAttribute("crossOrigin", 'Anonymous')
    // 图片加载完成，创建canvas
    img.onload = () => {
        const cvsDom = document.createElement('canvas');
        cvsDom.style.display = 'none';
        const height = img.height;
        const width = img.width;
        formRef.value.maxHorMargin = width;
        formRef.value.maxVerMargin = height;
        cvsDom.width = width;
        cvsDom.height = height;
        // 上下文
        const ctx = cvsDom.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        // 文字样式
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = formRef.value.txtSize + 'px ' + formRef.value.textFam;
        ctx.fillStyle = formRef.value.textColor;
        // 文字旋转
        if (formRef.value.textFullImg === 1) {
            for (let i = -20; i < 20; i++) {
                ctx.rotate(-(formRef.value.txtAngle * Math.PI) / 180); // 水印初始偏转角度
                const text = formRef.value.txtCont + ' '.repeat(Math.ceil(formRef.value.horTxtMargin/ 10));
                ctx.fillText(text.repeat(100), 0, i * formRef.value.verTxtMargin / 3);
                ctx.rotate((formRef.value.txtAngle * Math.PI) / 180); // 把水印偏转角度调整为原来的，不然他会一直转
            }
        } else {
            // 绘制文字
            ctx.fillText(formRef.value.txtCont, formRef.value.horTxtMargin, formRef.value.verTxtMargin);
            ctx.rotate(formRef.value.txtAngle * Math.PI / 180);
        }
        const newImg = new Image();
        newImg.src = cvsDom.toDataURL();
        newImg.style.width = '100%'
        const parQRcDom = document.getElementById(id);
        parQRcDom.innerHTML = '';
        parQRcDom.appendChild(newImg);
        parQRcDom.appendChild(cvsDom);
    }
}
