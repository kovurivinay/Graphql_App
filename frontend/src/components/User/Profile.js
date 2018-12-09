import React, { Component } from 'react';
import '../../App.css';
import cookie from 'react-cookies';
import axios from 'axios';
import {Node_IP, Node_Port} from "./../../config";


class Profile extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            email: "",
            phone: "",
            aboutme: "",
            city: "",
            country: "",
            company: "",
            school: "",
            homtown: "",
            languages: "",
            gender: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value, });
    }
    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
        if (localStorage.getItem('cookie')=="customer") {
            axios.get(Node_IP+Node_Port+`/cget_profiles/${localStorage.getItem('email')}`)
                .then((response) => {
                    console.log("Inside cget profiles")
                    console.log("Status Code : ", response.data);
                    if (response.status === 200) {
                        this.setState({
                            ...response.data
                        })
                        console.log(this.state)
                    } else {
                        console.log("not done")
                    }
                }).catch(err => {
                    console.log(err);
                });
        }
        else if (localStorage.getItem('cookie')=="owner") {
            axios.get(Node_IP+Node_Port+`/oget_profiles/${localStorage.getItem('email')}`)
                .then((response) => {
                    console.log("Inside oget profiles")
                    console.log("Status Code : ", response.data);
                    if (response.status === 200) {
                        this.setState({
                            ...response.data
                        })
                    } else {
                        console.log("not done")
                    }
                    console.log(this.state)
                }).catch(err => {
                    console.log(err);
                });
        }

    }

    updateProfile = () => {
        if (localStorage.getItem('cookie')=="customer") {
            axios.put(Node_IP+Node_Port+'/cset_profiles', this.state)
                .then((response) => {
                    console.log("Inside cget profiles")
                    console.log("Status Code : ", response.data);
                    if (response.status === 200) {
                        console.log("Updated")
                        alert("Update successful!")
                    } else {
                        console.log("not done")
                    }
                }).catch(err => {
                    console.log(err);
                });
        }
        else if (localStorage.getItem('cookie')=="owner") {
            axios.put(Node_IP+Node_Port+'/oset_profiles', this.state)
                .then((response) => {
                    console.log("Inside oget profiles")
                    console.log("Status Code : ", response.data);
                    if (response.status === 200) {
                        console.log("Updated")
                        alert("Update successful!")
                    } else {
                        console.log("not done")
                    }
                }).catch(err => {
                    console.log(err);
                });
        }
    }
    callProfilePage = () => {
        this.props.history.push("/ProfileDetails", this.state)
    }

    render() {

        return (
            <div>
             
                <div class="img-circle user-photo"></div>
                <div><center>
                    <i class="fas fa-user-edit fa-4x"></i></center>
                </div>
                <h2 class="user-name text-center">{this.state.email}</h2>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-1 Pcontainer">
                            <div className="row">
                                <div class="col-lg-6">
                                    <h3><b>Profile Information</b></h3></div>
                                <div class="col-lg-6 text-right">
                                    Connect
                                    <i class="fab fa-facebook-square fa-2x"></i>
                                </div>
                            </div>
                            <div class="row ">
                                <form class="form">
                                    <div class="form-group col-lg-7">
                                        {/*<label for="fname">First Name</label>*/}
                                        <input type="text" class="form-control" name="first" value={this.state.first} onChange={this.handleChange} placeholder="Name" />
                                    </div>

                                    <div class="form-group col-lg-7">
                                        <input type="text" class="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" />
                                    </div>
                                    <div class="form-group col-lg-10">
                                        <textarea class="form-control" rows="3" name="aboutme" value={this.state.aboutme} onChange={this.handleChange} placeholder="About me" />
                                    </div>
                                    <div class="form-group col-lg-7">
                                        <input type="email" class="form-control" name="city" value={this.state.city} onChange={this.handleChange} placeholder="My City" />
                                    </div>
                                    <div class="form-group col-lg-7">
                                        <input type="text" class="form-control" name="country" value={this.state.country} onChange={this.handleChange} placeholder="My Country" />
                                    </div>
                                    <div class="form-group col-lg-7">
                                        <input type="text" class="form-control" name="school" value={this.state.school} onChange={this.handleChange} placeholder="School" />
                                    </div>
                                    <div class="form-group col-lg-7">
                                        <input type="text" class="form-control" name="homtown" value={this.state.homtown} onChange={this.handleChange} placeholder="Hometown" />
                                    </div>
                                    <div class="form-group col-lg-7">
                                        <input type="text" class="form-control" name="languages" value={this.state.languages} onChange={this.handleChange} placeholder="Languages" />
                                    </div>
                                    <div class="form-group col-lg-7">
                                        <select value={this.state.gender} onChange={this.handleChange} name="gender" className="details_item form-control">Property Type
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select></div>
                                </form>
                            </div>
                            <div>
                                <div className="col-lg-2">
                                    <label class="switch">
                                        <input type="checkbox" />
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                                <div class="col-lg-8">
                                    <span class="sms-pref-title">Send me texts about my bookings</span>
                                    <span class="sms-pref-info">Only available for mobile phones in select countries. Standard messaging rates apply. See <a href="https://www.homeaway.com/info/about-us/legal/terms-conditions" target="_blank">terms and conditions</a> and <a href="https://www.homeaway.com/info/about-us/legal/privacy-policy" target="_blank">privacy policy.</a></span>
                                </div>
                                <br></br>
                                <div class="form-group col-lg-7">
                                    <button onClick={this.updateProfile.bind(this)} type="submit">Submit</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 Pcontainer1">
                            <h3 class="section-header">Verifications</h3>
                            <div>Email Address</div>
                            <div class="help-block email-verification">We've sent a verification email to {this.state.email}</div>
                            <button class="btn btn-link btn-link-no-padding js-send-email-verification">Resend email</button>
                            <hr></hr>
                            <div class="th-table profile-verification-table">
                                <div class="th-table-row">
                                    <span class="th-table-row">Social Account Verifications</span>
                                    <span class="th-table-row help-block">Verifying one or more social accounts improves your trustworthiness to owners. We'll never post anything without your permission.</span>
                                </div>
                            </div>
                            <div class="">
                                <button class="btn" onClick={this.callProfilePage.bind(this)} id="viewProfileButton" >View profile</button>
                            </div>
                        </div>
                        <div class="profile-tips col-lg-4 Pcontainer1">
                            <h3>Profile-Tips</h3>
                            <p>1. Add a photo of yourself</p>
                            <p>2. Verify your identity</p>
                            <p>3. Describe your interests, hobbies, and why you like to travel</p>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Profile;