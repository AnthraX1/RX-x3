import { type } from './../action'
const initState = {
    name: '请先登录!',
    type: 'admin',
    ip: "127.0.0.1"
}


export default (state = initState, action) => {
    switch (action.type) {
        case type.USER_NAME:
            return {
                ...state,
                name: action.name
            }
        case type.USER_TYPE:
            return {
                ...state,
                type: action.type
            }
        case type.BASE_IP:
            return {
                ...state,
                ip: action.ip
            }
        default:
            return {
                ...state
            }
    }
}