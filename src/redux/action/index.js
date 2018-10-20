export const type = {
    USER_NAME: "USER_NAME",
    USER_TYPE: "USER_TYPE"
}

export function userName(name) {
    return {
        type: type.USER_NAME,
        name
    }
}
export function userType(type) {
    return {
        type: type.USER_NAME,
        type
    }
}