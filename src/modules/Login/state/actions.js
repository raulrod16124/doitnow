import { TYPES } from "./type"

export const CheckUser = (user) =>{
    return {
        type: TYPES.checkUser,
        payload: user
    }
}
export const CreateUser = (user) =>{
    return {
        type: TYPES.createUser,
        payload: user
    }
}
export const UpdateUser = (user) =>{
    return {
        type: TYPES.updateUser,
        payload: user
    }
}
export const DeleteUser = (user) =>{
    return {
        type: TYPES.deleteUser,
        payload: user
    }
}