/**
 * 克隆的方法
 * @param obj
 * @returns {*}
 */
export function cloneValue(obj) {
    if (obj instanceof Array ) {
        return cloneArray(obj);
    } else if (obj instanceof Object) {
        return cloneObj(obj)
    } else {
        return obj;
    }
}

/**
 * 克隆对象
 * @param obj
 * @returns {{}}
 */
function cloneObj(obj) {
    let res = {};
    // 获取对象里面的所有属性，包括对象里面的属性
    let objAttr = Object.getOwnPropertyNames(obj);
    for (let i = 0; i < objAttr.length; i++) {
        res[objAttr[i]] = cloneValue(obj[objAttr[i]]);
    }
    return res;
}

/**
 * 克隆数组
 * @param array
 * @returns {[]}
 */
function cloneArray(array) {
    let arr = new Array(array.length);
    for (let i = 0; i < array.length; i++) {
        arr[i] = cloneValue(array[i]);
    }
    return arr;
}
