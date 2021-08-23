import { TYPES } from "./type"

export const GetTodos = () =>{
    return {
        type: TYPES.getTodo
    }
}
export const CreateTodos = (todo) =>{
    return {
        type: TYPES.createTodo,
        payload: todo
    }
}
export const UpdateTodos = (todo) =>{
    return {
        type: TYPES.updateTodo,
        payload: todo
    }
}
export const DeleteTodos = (todo) =>{
    return {
        type: TYPES.deleteTodo,
        payload: todo
    }
}