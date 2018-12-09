import { LOGIN_VALIDATION,OLOGIN_VALIDATION   } from "../actions/types";

const init={
    Lvalue:false,
    res:{}
}

export default function(state=init, action){
    switch(action.type){
        case LOGIN_VALIDATION:
        console.log("Reducer new..")
        console.log(...state)
        console.log(action.payload)
        return{
            ...state,
            Lvalue:action.payload,
            res:action.payload1
        }
        case OLOGIN_VALIDATION:
        console.log("Reducer Owner..")
        console.log(action.payload)
        console.log(...state)
        return{
            ...state,
            Lvalue:action.payload,
            res:action.payload1
        }
        default:
        console.log("Inside default in reducer")
        return state;
    }
}