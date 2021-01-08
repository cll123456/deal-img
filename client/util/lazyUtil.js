import {defineAsyncComponent, h} from 'vue';
import Errors from "../src/components/Errors.vue";
import Loading from "../src/components/Loading.vue";


/**
 * 异步加载组件
 * @param path 路径，相对于当前使用这个方法的页面。
 * @returns {*|VNode}
 */
export function getAsyncComponent(path) {
    return defineAsyncComponent({
        loader: () => import(path),
        loadingComponent: Loading,
        errorComponent: {
            render() {
                return h(Errors, '组件加载失败！~~~')
            }
        }
    })
}
