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
        //this.handleChange = this.handleChange.bind(this);
    }
    
    async componentDidMount(){
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


    render() {

        return (
            <div>
            <div class="profile-v2">
            <div class="row col-lg-11 ">
                <div class="col-lg-11 col-md-10 text-right">
                        <a href="/UserMenu/Profile"><i class="far fa-edit"></i> Edit Profile</a>
                </div>
                <div class="col-lg-11 free-space"></div>
                
                <div class="col-lg-4"></div>
                <div class="col-lg-2 ">
                
                <i class="fas fa-user-secret fa-6x"></i>
                
            </div>
            <div class="col-lg-4">
            <h2>Hi I'm {this.state.first}</h2>
            <h4>Member since 2018</h4>
            <br></br>
            <br></br>
            <br></br>
            <div>
            <h4><strong>About me</strong></h4>
            {(this.state.aboutme)?(this.state.aboutme): "The person hasn't written anything personal"}
            </div>
            <div>
            <br></br>
            <strong>Hometown: </strong>{this.state.homtown}<br></br>
            
            <strong>School: </strong>{this.state.school}<br></br>
            <strong>Languages: </strong>{this.state.languages}<br></br>
            </div>
            </div>
            </div>
            <div class="col-lg-11 free-space"></div>
            <div class="col-lg-11 free-space"></div>
            <div class="col-lg-11 free-space"></div>
            <div class="col-lg-11 free-space"></div>
            <div class="col-lg-11 free-space"></div>
            </div>
            </div>

        )
    }
}

export default Profile;