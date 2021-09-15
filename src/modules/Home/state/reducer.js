import TODOS from './../provider/todos.json';
import { TYPES } from "./type";

const initialState = [
    {
        id: "1111",
        title: "BOOM",
        level: "easy",
        status:"todo",
        description: "nothing",
    },
    {
        id: "5424",
        title: "HELLO",
        level: "easy",
        status:"done",
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
            console.log(action.payload);
            const updateTodo = state.map( todo => {
                if( todo.id === action.payload.id ){
                    return todo = action.payload;
                };
                return todo;
            } );
            return updateTodo;
        case TYPES.deleteTodo:
            console.log(action.payload);
            const updateTodos = state.filter( todo => todo.id !== action.payload );
            return updateTodos; 
    
        default:
            return state;
    }
}