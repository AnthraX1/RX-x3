import axios from './axios.js'

class Server {
    // 登录接口
    async login(options) {
        return axios.post('/SAuth/', options)
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
    // 位置信息接口
    async Location_g() {
        return axios.get('/Location/')
    }
    // 人脸库信息接口
    async FaceDb_g() {
        return axios.get('/FaceDb/')
    }
    async FaceList_g(db, num, page) {
        return axios.get(`/FaceDb/${db}/${(page - 1) * num}/${num}`)
    }

    // 感知系统接口
    async esthesis_g(options) {
        return axios.get('/SNode/')
    }
    async esthesis_p(options) {
        return axios.post('/SNode/', options)
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
}

export default new Server()