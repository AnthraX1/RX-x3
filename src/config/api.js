import axios from './axios.js'

class Server {
    // 登录接口
    async login(options) {
        return axios.post('/SAuth/', options)
    }
    // 注册接口
    async register(options) {
        return axios.post('/SRegister/', options)
    }
    // 入网配置接口
    async network_g() {
        return axios.get('/Network')
    }
    async network_p(options) {
        return axios.post('/Network', options)
    }
    // 人脸网关管理接口
    async FaceGW_g() {
        return axios.get('/FaceGW/')
    }
    async FaceGW_p(options) {
        return axios.post('/FaceGW/', options)
    }
    // 摄像头管理接口
    async Camera_g() {
        return axios.get('/Camera/')
    }
    async Camera_p(options) {
        return axios.post('/Camera/', options)
    }
    async Camera_put(options, name) {
        return axios.post(`/Camera/${name}`, options)
    }
    // 通道信息获取接口
    async Location_g() {
        return axios.get('/Location/')
    }
    // 通道信息配置接口
    async Location_P(options) {
        return axios.post('/Location/', options)
    }
    // 人脸库信息接口
    async FaceDb_g() {
        return axios.get('/FaceDb/')
    }
    async FaceList_g(db, num, page) {
        return axios.get(`/FaceDb/${db}/${(page - 1) * num}/${num}`)
    }
    // 工程测试  上传图片接口
    async Upload(form, name, config) {
        return axios.post(`/SUpload/${name}`, form, config)
    }
    // 以图搜图上传接口
    async Vupload(form, name, config) {
        return axios.post(`/VUpload/${name}`, form, config)
    }
    // 获取库列表
    async PicDb_g() {
        return axios.get("/PicDb/")
    }
    // 创建库
    async picDb_p(options) {
        return axios.post('/PicDb/', options)
    }
    // 感知系统接口
    async esthesis_g(options) {
        return axios.get('/Sense/')
    }
    async esthesis_p(options) {
        return axios.post('/Sense/', options)
    }
    async esthesis_put(node, options) {
        return axios.put(`/Sense/${node}`, options)
    }
    // 布控系统接口
    async arrange_g(options) {
        return axios.get('/Surv/')
    }
    async arrange_p(options) {
        return axios.post('/Surv/', options)
    }
    async arrange_put(node, options) {
        return axios.put(`/Surv/${node}`, options)
    }

    // 二维码
    async getIPC(options) {
        return axios.post('/IPC/Query',options)
    }
    async getX3(options) {
        return axios.post('/X3/Query', options)
    }
    async getQRData(options) {
        return axios.post('/X3/QR', options)
    }

    // 通行日记和抓怕日记接口
    async faceLog(hit = 0, num = 10, page = 1, ch = "", beg = 0, end = 0) {
        let options = {
            "beg": beg,
            "ch": ch,
            "db": "",
            "end": end,
            "face": "",
            "hit": hit,
            "limit": num,
            "offset": (page - 1) * num
        }
        return axios.post('/FaceLog/Query', options)
    }
    // 下载日记接口
    async download(options) {
        return axios.post('/FaceLog/Download', options)
    }
    // 操作日记获取接口
    async operate_g(options) {
        return axios.post("/OpLog/Query", options)
    }
    // 操作日记下载接口
    async operate_download(options) {
        return axios.post("/OpLog/Download", options)
    }
}

export default new Server()