import LoginProvider from "../provides";
import { TYPES } from "./type";

const initialState = {
    status: "initial",
    error: "",
    data: {}
};

export const LoginReducer = ( state = initialState, action ) => {
    
    switch (action.type) {
        case TYPES.checkUser:
            const checkingUser = LoginProvider.checkUser(action.payload);
            const mockUser = {
                id: 1,
                name: "DoneBoy",
                JWTK: "HVC55863DTZ",
            }
            localStorage.setItem( 'user', JSON.stringify(mockUser) )
            return mockUser;
        case TYPES.createUser:
            return [...state, action.payload];
        case TYPES.updateUser:
            console.log(action.payload);
            // const updateTodo = state.map( todo => {
            //     if( todo.id === action.payload.id ){
            //         return todo = action.payload;
            //     };
            //     return todo;
            // } );
            // return updateTodo;
        case TYPES.deleteUser:
            console.log(action.payload);
            // const updateTodos = state.filter( todo => todo.id !== action.payload );
            // return updateTodos; 
    
        default:
            return state;
    }
}