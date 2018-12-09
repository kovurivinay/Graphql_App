// import _ from "lodash";
// import { C_LOGIN } from "../actions";
// import axios from "axios";
// const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
// const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
// const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
// import {Node_IP, Node_Port} from "./../config";
// const ROOT_URL = Node_IP+Node_Port;

// // //Reducer listening to different action types
// // //initial state is {}
// // export default function(state = {}, action) {
// //   console.log("In reducer books")
// //   switch (action.type) {
// //     //target 
// //     case C_LOGIN:
// //     console.log("Logging in..")
// //       return _.mapKeys(action.payload.data, "BookID");
// //     default:
// //     console.log("default reducer")
// //       return state;
// //   }
// // }
// export function login(username, password) {
//     return dispatch => {
//       dispatch(setLoginPending(true));
//       dispatch(setLoginSuccess(false));
//       dispatch(setLoginError(null));
  
//       callLoginApi(username, password, error => {
//         dispatch(setLoginPending(false));
//         if (!error) {
//           dispatch(setLoginSuccess(true));
//         } else {
//           dispatch(setLoginError(error));
//         }
//       });
//     }
//   }
  
//   function setLoginPending(isLoginPending) {
//     return {
//       type: SET_LOGIN_PENDING,
//       isLoginPending
//     };
//   }
  
//   function setLoginSuccess(isLoginSuccess) {
//     return {
//       type: SET_LOGIN_SUCCESS,
//       isLoginSuccess
//     };
//   }
  
//   function setLoginError(loginError) {
//     return {
//       type: SET_LOGIN_ERROR,
//       loginError
//     }
//   }
  
//   function callLoginApi(username, password, callback) {
//     setTimeout(async () => {
//         console.log("In actions login")
//         const data = {
//             username : username,
//             password : password
//         }
//         sessionStorage.removeItem('email')
//         console.log(sessionStorage.getItem('email')+"Before API call")
//         //const response = axios.get(`${ROOT_URL}/clogin`,data);
//         await axios.post(`${ROOT_URL}/clogin`,data)
//       .then(response => {
          
//           console.log("Status Code : ",response.data);
//           if(response.status === 200 & response.data!= "Invalid password"){
//               console.log("Success")
//             sessionStorage.setItem('email',username)
//             console.log(sessionStorage.getItem('email')+"In callAPI")
            
//             return callback(null);
//           }else{
//             return callback(new Error('Invalid password'));
//           }
//       }).catch(e=>{
//           alert("Invalid Credentials!")
//           return callback(new Error('Invalid username and password'))
//       });
//     }, 1000);
//   }
// export default function reducer(state = {
//     isLoginSuccess: false,
//     isLoginPending: false,
//     loginError: null
//   }, action) {
//     switch (action.type) {
//       case SET_LOGIN_PENDING:
//         return Object.assign({}, state, {
//           isLoginPending: action.isLoginPending
//         });
  
//       case SET_LOGIN_SUCCESS:
//         return Object.assign({}, state, {
//           isLoginSuccess: action.isLoginSuccess
//         });
  
//       case SET_LOGIN_ERROR:
//         return Object.assign({}, state, {
//           loginError: action.loginError
//         });
  
//       default:
//         return state;
//     }
//   }
