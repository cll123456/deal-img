import request from "../../util/request";

/**
 * 上传文件
 * @returns {Promise<AxiosResponse<any>>}
 */
export async function uploadFile(data) {
    return await request({'Content-type': 'multipart/form-data'})
        .post('/api/upload', data)
}


/**
 * 压缩图片
 * @param filePath
 * @returns {Promise<AxiosResponse<any>>}
 */
export async function pressImg(filePath) {
    return await request().get('/api/pressImg?fileName=' + filePath)
}
