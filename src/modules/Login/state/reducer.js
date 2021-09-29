import LoginProvider from "../provides";
import { TYPES } from "./type";

const initialState = {
    status: "initial",
    error: "",
    data: {}
};

export const LoginReducer = async ( state = initialState, action ) => {
    
    switch (action.type) {
        case TYPES.checkUser:
            console.log("heello")
            const callingServer = new LoginProvider();
            const checkingUser = await callingServer.checkUser(action.payload).then( response => response );
            console.log(checkingUser);
            if( checkingUser.token ){
                localStorage.setItem( 'user', JSON.stringify(checkingUser) );
            }
            return checkingUser !== undefined ? checkingUser : "ERROR";

        case TYPES.createUser:
            return [...state, action.payload];
        case TYPES.updateUser:
            console.log(action.payload);
            const updateTodo = state.map( todo => {
                if( todo.id === action.payload.id ){
                    return todo = action.payload;
                };
                return todo;
            } );
            return updateTodo;
        case TYPES.deleteUser:
            console.log(action.payload);
            const updateTodos = state.filter( todo => todo.id !== action.payload );
            return updateTodos; 
    
        default:
            return state;
    }
}