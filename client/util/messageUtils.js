import {ElMessage} from "element-plus";

/**
 * 消息提示
 * @param type
 * @param msgCxt
 */
export function tip(type = 'warning', msgCxt = '') {
    ElMessage[type]({
        message: msgCxt,
        type: type
    });
}
