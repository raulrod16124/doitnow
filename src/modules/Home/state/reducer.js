import { TYPES } from "./type";
import TODOS from './../provider/todos.json';

export const TodosReducer = ( state = TODOS, action ) => {
    
    switch (action.type) {
        case TYPES.getTodo:
            return state
        case TYPES.createTodo:
            return {...state, [action.payload.id] : action.payload };
        case TYPES.updateTodo:
            console.log(action.payload.status);
            state[action.payload.id] = action.payload;
            return {...state};
        case TYPES.deleteTodo:
            delete state[action.payload];
            return {...state}; 
    
        default:
            return state;
    }
}