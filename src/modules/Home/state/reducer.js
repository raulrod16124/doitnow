import TODOS from './../provider/todos.json';
import { TYPES } from "./type";

const initialState = [
    {
        id: "1111",
        title: "BOOM",
        level: "easy",
        status:"todo",
        description: "nothing",
    }
]

export const TodosReducer = ( state = initialState, action ) => {
    
    switch (action.type) {
        case TYPES.getTodo:
            return state
        case TYPES.createTodo:
            return [...state, action.payload];
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