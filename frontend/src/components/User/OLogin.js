import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import {connect} from "react-redux";
import {ologinvalidation} from '../../actions/index'

class OLogin extends Component {
    constructor() {
        super();
        this.state = {
            username : "",
            usernameError: "",
            password : "",
            passwordError:"",
            direct:false,
            check:false
        }
        this.change = this.change.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    change = (e) => {
        this.setState({
            check:false,
            [e.target.name] : e.target.value
        })
    }

    validate = () => {
        let isError = false;
        const errors = {
          usernameError: "",
          passwordError:""
        };
    
        if (this.state.username.indexOf("@") === -1) {
          isError = true;
          errors.usernameError = "Requires valid email";
        }
        if (this.state.password.length==0) {
            isError = true;
            errors.passwordError = "Password required";
          }
        this.setState({
          ...errors
        });
        return isError;
    }
    
    submitLogin = (e) => {
        var headers = new Headers();
        e.preventDefault();
        // e.stopPropagation()
        //     return false;
        const err = this.validate();
        this.setState({
            check:true
        })
        if(!err){
            const data = {
                username : this.state.username,
                password : this.state.password
            }
            console.log(data.username)
            this.props.ologinvalidation(data);
            setTimeout(() => {
                //console.log(this.props)
                if (this.props.Lvalue == true) {
                    this.props.history.push('/Home')
                }
                else{
                    alert("Wrong Credentials!")
                }
            }, 1000);
            // axios.defaults.withCredentials = true;
            // axios.post(Node_IP+Node_Port+'/ologin',data)
            //     .then(response => {
            //         sessionStorage.setItem('email',this.state.username)
            //         console.log("Status Code : ",response.data);
            //         if(response.status === 200){
            //             this.setState({
            //                 authFlag : true,
            //                 direct:true
            //             })
            //         }else{
            //             this.setState({
            //                 authFlag : false,
            //                 usernameError:"Credentials incorrect"
            //             })
            //         }
            //     }).catch(e=>{
            //         alert("Invalid Credentials!")
            //     });
        }
        }
    
    componentWillMount(){
    };
    render() {
        var redirectTo=null;
        if(this.state.direct){
            redirectTo=<Redirect to= "/Home"/>
        }
        return (<div className="listBody">
        {redirectTo}
            <div className="text-center">
                <br></br>
                <h1>Owner Log in to HomeAway</h1>
                <h4>Need an acount? <a id="sign-in-link" href="/OSignup">Sign Up</a></h4></div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4 col-lg-offset-4 listBody1 ">
                        <div className="row  margin-bottom1">
                            <form class="form  ">
                            {(this.state.check)?<div class="col-lg-12 " style={{backgroundColor:'gray'}}>
                                    <h5>{this.state.usernameError} {this.state.passwordError}</h5></div>:<a/>}
                                <div class="col-lg-6">
                                    <h3>Account Login</h3></div>
                                <div class="form-group col-lg-12">
                                    <input name="username" type="email" errorText={this.state.usernameError} class="form-control" id="email" placeholder="Enter email" onChange = {this.change}/>
                                </div>
                                <div class="form-group col-lg-12">
                                    <input name="password" type="password" class="form-control" placeholder="Password" onChange = {this.change}/>
                                </div>
                                <div class="form-group col-lg-12">
                        
                        <a href="" id="forgotPasswordUrl" class="forgot-password">Forgot password?</a>
            </div>
                                <div className="form-group col-lg-8 col-lg-offset-2">
                                <input type="submit" className="form-control signin1 " value="Sign in" onClick = {this.submitLogin}/>
                                </div>
                                <div class=" traveler col-lg-12">
                                    <label htmlFor="rememberMe">
                                <input id="rememberMe" name="rememberMe"  type="checkbox" value="true"/><input type="hidden" name="_rememberMe" value="on"/>
                                Keep me signed in</label>
                                </div>
                                <div class="centered-hr text-center col-lg-11 ">
                                    <span class="text-center"><em>or</em></span>
                                </div>
                                <div className="form-group col-lg-8 col-lg-offset-2">
                                <input type="button" className="form-control btn-primary fbcolor " value="Log in with Facebook"/>
                                </div>
                                <div className="form-group col-lg-8 col-lg-offset-2">
                                <input type="button" className="form-control btn-secondary gcolor  " value="Log in with Google"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 free-space"></div>
            </div>
        </div>)
    }
}

// export default OLogin
const mapStateToProps = (state) => ({
    Lvalue: state.login.Lvalue
})

export default connect(mapStateToProps, { ologinvalidation })(OLogin);