import { type } from './../action'
const initState = {
    name: 'username',
    type: 'admin'
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
        default:
            return {
                ...state
            }
    }
}