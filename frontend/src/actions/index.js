import { LOGIN_VALIDATION, OLOGIN_VALIDATION } from "./types";
import { LOCATION_INFO, DETAILS_INFO, BOOKINGOPS_INFO, PHOTOS_INFO, PRICING_INFO } from "./types";
import axios from "axios";
import cookie from 'react-cookies';
import {Node_IP, Node_Port} from "./../config";
const ROOT_URL = Node_IP+Node_Port;

export function loginvalidation(data) {
    //alert("berab")
    return async function (dispatch) {
        console.log("Fetching new..")
        let username = data.username
        console.log(username)
        axios.defaults.withCredentials = true;
        await axios.post(`${ROOT_URL}/clogin`, data)
            .then(response => {
                console.log("Status Code : ", response.data);
                if (response.status === 200 & response.data != "Invalid password") {
                    //console.log("Success")
                    //sessionStorage.setItem('email', username)
                    localStorage.setItem('jwtToken', response.data.token);
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('cookie', response.data.cookie)
                    console.log(response.data.email)
                    //console.log(sessionStorage.getItem('email')+"In callAPI")
                    var Lvalue1 = true;
                    dispatch({
                        type: LOGIN_VALIDATION,
                        payload: Lvalue1,
                        payload1: response.status
                    })
                } else {
                    console.log("Invalid Password")//return callback(new Error('Invalid password'));
                }
            }).catch(e => {
                console.log(e.response)

                //return callback(new Error('Invalid username and password'))
            });
    }
}
export function ologinvalidation(data) {
    //alert("berab")
    return async function (dispatch) {
        console.log("Fetching owner..")
        let username = data.username
        console.log(username)
        axios.defaults.withCredentials = true;
        await axios.post(`${ROOT_URL}/ologin`, data)
            .then(response => {
                console.log("Status Code : ", response.data);
                if (response.status === 200 & response.data != "Invalid password") {
                    //console.log("Success")
                    //sessionStorage.setItem('email', username)
                    //localStorage.setItem('jwtToken', response.data.token);
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('cookie', response.data.cookie)
                    console.log(localStorage.getItem('email'))
                    //console.log(sessionStorage.getItem('email')+"In callAPI")
                    var Lvalue1 = true;
                    dispatch({
                        type: OLOGIN_VALIDATION,
                        payload: Lvalue1,
                        payload1: response.status
                    })
                } else {
                    console.log("Invalid Password")//return callback(new Error('Invalid password'));
                }
            }).catch(e => {
                console.log(e.response)

                //return callback(new Error('Invalid username and password'))
            });
    }
}

export function locationinfo(data) {
    return async function (dispatch) {
        console.log("dispatching to location..")
        dispatch({
            type: LOCATION_INFO,
            payload: data,
        })
    }
}

export function detailsinfo(data) {
    return async function (dispatch) {
        console.log("dispatching to location..")
        dispatch({
            type: DETAILS_INFO,
            payload: data,
        })
    }
}

// export function bookingopsinfo(data){
//     return async function(dispatch){
//         console.log("dispatching to location..")
//         dispatch({
//             type: BOOKINGOPS_INFO,
//             payload: data,
//         }) 
//     }
// }

export function photosinfo(data) {
    return async function (dispatch) {
        console.log("dispatching to location..")
        dispatch({
            type: PHOTOS_INFO,
            payload: data,
        })
    }
}

export function pricinginfo(data) {
    return async function (dispatch) {
        console.log("dispatching to location..")
        dispatch({
            type: PRICING_INFO,
            payload: data,
        })
    }
}

export function insertprops(data) {
    return async function (dispatch) {
        console.log("Before insertion..")
        console.log(data)
        var data1={
            ...data,
            owner:localStorage.getItem('email')
        }
        await axios.post(`${ROOT_URL}/propertydb`, data1)
            .then((response) => {
                console.log("Status Code : ", response.data);
                if (response.status === 200) {
                    console.log("insertion done")
                    
                } else {
                    console.log("not done")
                }

            }).catch(e => {
                console.log(e.response)
                //return callback(new Error('Invalid username and password'))
            });;
        //     axios.defaults.withCredentials = true;
        //     await axios.post(`${ROOT_URL}/ologin`,data)
        //   .then(response => {
        //       console.log("Status Code : ",response.data);
        //       if(response.status === 200 & response.data!= "Invalid password"){
        //           //console.log("Success")
        //         sessionStorage.setItem('email',username)
        //         localStorage.setItem('jwtToken', response.data.token);
        //         console.log(localStorage.getItem('jwtToken'))
        //         //console.log(sessionStorage.getItem('email')+"In callAPI")
        //         var Lvalue1=true;
        //         dispatch({
        //             type: OLOGIN_VALIDATION,
        //             payload: Lvalue1,
        //             payload1:response.status
        //         }) 
        //       }else{
        //         console.log("Invalid Password")//return callback(new Error('Invalid password'));
        //       }
        //   }).catch(e=>{
        //       console.log(e.response)

        //       //return callback(new Error('Invalid username and password'))
        //   });
    }
}