import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
//import { login } from '../../reducers/reducer_login';
import { connect } from "react-redux";
import { fetchposts, loginvalidation } from "../../actions/index"
import { stat } from 'fs';

class CLogin extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            usernameError: "",
            password: "",
            passwordError: "",
            direct: false
        }
        this.change = this.change.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    change = (e) => {
        this.setState({
            check: false,
            [e.target.name]: e.target.value
        })
    }

    validate = () => {
        let isError = false;
        const errors = {
            usernameError: "",
            passwordError: ""
        };

        if (this.state.username.indexOf("@") === -1) {
            isError = true;
            errors.usernameError = "Requires valid email";
        }
        if (this.state.password.length == 0) {
            isError = true;
            errors.passwordError = "Password required";
        }


        this.setState({

            ...errors
        });
        return isError;
    }

    submitLogin = async (e) => {
        var headers = new Headers();
        e.preventDefault();

        const data = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.loginvalidation(data);
        setTimeout(() => {
            //console.log(this.props)
            if (this.props.Lvalue == true) {
                this.props.history.push('/Home')
            }
            else{
                alert("Wrong Credentials!")
            }
        }, 1000);
    }
    componentWillMount() {
    }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.Lvalue==true) {
    //         console.log(nextProps.Lvalue)
    //         this.props.history.push('/Home')
    //     }
    // }
    render() {
        var redirectTo = null;
        if (this.state.direct) {
            redirectTo = <Redirect to="/Home" />
        }
        let { username, password } = this.state;

        return (<div className="listBody">
            {redirectTo}
            <div className="text-center">
                <br></br>
                <h1>Log in to HomeAway</h1>
                <h4>Need an acount? <a id="sign-in-link" href="/Signup">Sign Up</a></h4></div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4 col-lg-offset-4 listBody1 ">
                        <div className="row  margin-bottom1">
                            <form class="form  ">
                                {this.props.Lvalue}
                                {(this.state.check) ? <div class="col-lg-12 " style={{ backgroundColor: 'gray' }}>
                                    <h5>{this.state.usernameError} {this.state.passwordError}</h5></div> : <a />}
                                <div class="col-lg-6">
                                    <h3>Account Login</h3></div>
                                <div class="form-group col-lg-12">
                                    <input name="username" type="email" id="email" errorText={this.state.usernameError} class="form-control" id="email" placeholder="Enter email" onChange={this.change} />
                                </div>
                                <div class="form-group col-lg-12">
                                    <input name="password" type="password" class="form-control" placeholder="Password" onChange={this.change} />
                                </div>
                                <div class="form-group col-lg-12">

                                    <a href="" id="forgotPasswordUrl" class="forgot-password">Forgot password?</a>
                                </div>
                                <div className="form-group col-lg-8 col-lg-offset-2">
                                    <input type="submit" className="form-control signin1 " value="Sign in" onClick={this.submitLogin} />
                                </div>
                                <div class=" traveler col-lg-12">
                                    <label htmlFor="rememberMe">
                                        <input id="rememberMe" name="rememberMe" type="checkbox" value="true" /><input type="hidden" name="_rememberMe" value="on" />
                                        Keep me signed in</label>
                                </div>
                                <div class="centered-hr text-center col-lg-11 ">
                                    <span class="text-center"><em>or</em></span>
                                </div>
                                <div className="form-group col-lg-8 col-lg-offset-2">
                                    <input type="button" className="form-control btn-primary fbcolor " value="Log in with Facebook" />
                                </div>
                                <div className="form-group col-lg-8 col-lg-offset-2">
                                    <input type="button" className="form-control btn-secondary gcolor  " value="Log in with Google" />
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



// const mapDispatchToProps = (dispatch) => {
//     return {
//         login: (username, password) => dispatch(login(username, password))
//     };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CLogin);
const mapStateToProps = (state) => ({
    Lvalue: state.login.Lvalue
})




export default connect(mapStateToProps, { loginvalidation })(CLogin);