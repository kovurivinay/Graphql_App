import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import {Node_IP, Node_Port} from "./../../config";

class Osignup extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            firstError: "",
            last:"",
            lastError:"",
            password: "",
            passwordError: "",
            email:"",
            emailError:"",
            check:false
        }
        this.change = this.change.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
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
            firstError: "",
            lastError:"",
            passwordError: "",
            emailError:""
        };
    
        if (this.state.email.indexOf("@") === -1) {
          isError = true;
          errors.emailError = "Requires valid email";
        }
        if (this.state.password.length==0) {
            isError = true;
            errors.passwordError = "Password required";
          }
          if (this.state.last.length==0) {
            isError = true;
            errors.lastError = "Last name required";
          }
          if (this.state.first.length==0) {
            isError = true;
            errors.firstError = "First name required";
          }
  
    
        this.setState({
          
          ...errors
        });
        return isError;
    }

    submitSignup = (e) => {
        console.log("inside submit signup")
        var headers = new Headers();
        e.preventDefault();
        const err = this.validate();
        this.setState({
            check:true
        })
        if(!err){
            
            const data = {
                first : this.state.first,
                last : this.state.last,
                email : this.state.email,
                password : this.state.password
            }
            console.log(data.first)
            axios.defaults.withCredentials = true;
            axios.post(Node_IP+Node_Port+'/OSignup',data)
                .then(response => {
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('cookie', response.data.cookie)
                    console.log("Status Code : ",response.status);
                    if(response.status === 200){
                        this.setState({
                            authFlag : true,
                            direct:true
                        })
                    }else{
                        this.setState({
                            authFlag : false
                        })
                    }
                }).catch(e=>{
                    alert("Try with different Email ID!")
                    console.log(e)
                })
        }
        
    }


    render() {
        var redirectTo=null;
        if(this.state.direct){
            redirectTo=<Redirect to= "/Home"/>
        }

        return (<div className="listBody">
        {redirectTo}
            <div className="text-center">
                <br></br>
                <h1>Owner Sign up for HomeAway</h1>
                <h4>Already have an account? <a id="sign-in-link" href="/ologin">Log in</a></h4></div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3 listBody1 ">
                    {(this.state.check)?<div class="col-lg-12 margin-bottom1" style={{backgroundColor:'gray',display: 'inline'}} >
                                    <h5>{this.state.firstError}<br></br>
                                     {this.state.lastError}
                                     <br></br>{this.state.emailError}<br></br>{this.state.passwordError}</h5></div>:<hr></hr>}
                        <div className="row margin-top1 margin-bottom1">
                        
                            <form class="form">
                            
                                <div class="form-group col-lg-6">
                                    {/*<label for="fname">First Name</label>*/}
                                    <input onChange={this.change} type="text" class="form-control" name="first" id="fname" placeholder="Enter first name" />
                                </div>

                                <div class="form-group col-lg-6">
                                    <input onChange={this.change} type="text" class="form-control" name="last" id="lname" placeholder="Enter last name" />
                                </div>
                                <div class="form-group col-lg-12">
                                    <input onChange={this.change} type="email" class="form-control" name="email" id="email" placeholder="Enter email" />
                                </div>
                                <div class="form-group col-lg-12">
                                    <input onChange={this.change} type="password" name="password" class="form-control" placeholder="Password" />
                                </div>
                                <div class="form-group col-lg-11">
                                    <button style={{ width: '50%' }} onClick={this.submitSignup} className="form-control btn btn-warning">Sign me Up</button>
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
            </div>
        </div>)
    }
}

export default Osignup