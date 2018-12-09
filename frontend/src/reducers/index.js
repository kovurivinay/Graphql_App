// import { combineReducers } from "redux";
// import { reducer as formReducer } from "redux-form";
// import LoginReducer from "./reducer_login";

// const rootReducer = combineReducers({
//   books: LoginReducer,
//   form: formReducer
// });

// export default rootReducer;

import { combineReducers } from "redux";
import postLoginR from "./postLoginR";
import listpropsR from "./listpropsR";

export default combineReducers({
    login:postLoginR,
    listprops:listpropsR
})