export const type = {
    USER_NAME: "USER_NAME",
    USER_TYPE: "USER_TYPE",
    BASE_IP: "BASE_IP"
}

export function userName(name) {
    return {
        type: type.USER_NAME,
        name
    }
}
export function userType(types) {
    return {
        type: type.USER_NAME,
        types
    }
}
export function baseIp(ip) {
    return {
        type: type.BASE_IP,
        ip
    }
}