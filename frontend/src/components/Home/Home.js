import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Displayprops from '../Displayprops';
import { link } from 'fs';
import { Link } from 'react-router-dom';
import Footer from '../Footer';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            country: "",
            startdate: "",
            enddate: "",
            accomodations: "",
            prs: [],
            check: false,
            name: localStorage.getItem('email')
        };
        //this.change=this.change.bind(this);
    }
    change = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    enddatechange = async (e) => {
        if (e.target.value <= this.state.startdate) {
            await this.setState({
                startdate: e.target.value,
                enddate: ""
            })
        }
        else {
            await this.setState({ enddate: e.target.value });
        }
        //console.log(this.state)
    }
    search = () => {
        console.log(this.state)
        
        if (this.state.country == "") {
            alert("Enter where do you want to go!")
        }
        else if (this.state.startdate == "") {
            alert("Enter Start Date!")
        }
        else if (this.state.enddate == "") {
            alert("Enter End Date!")
        }
        else if (this.state.accomodations == "") {
            alert("Enter number of guests!")
        }
        else {
            this.props.history.push("/Displayprops", this.state)
        }
        

    }
    componentWillMount() { }

    componentDidMount() {
        //Setting header
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
        //alert(localStorage.getItem('jwtToken'))
    }
    render() {
        return (
            <div>
                <div>
                    <div class="bg-img">
                        <div class="container ">
                            <div class="col-lg-12 free-space"></div>
                            <div class="col-lg-12 free-space"></div>
                            <div class="col-lg-12 free-space"></div>
                            <div class="col-lg-12 free-space"></div>
                            <div class="col-lg-12 free-space"></div>
                            <div class=" col-lg-12" >
                                <div className="HeadLine"><h1>Book beach houses, cabins, <br></br>condos and more, worldwide.</h1></div>
                                <div className="HomeContent">
                                    <p><input type="text" id="p1" className="place" name="country" placeholder="Where do you want to go" onChange={this.change}></input>
                                        <input type="date" className="place inc-width" value={this.state.startdate} name="startdate" onChange={this.change} />
                                        <input type="date" className="place inc-width" value={this.state.enddate} name="enddate" onChange={this.enddatechange} placeholder="Depart"></input>
                                        <input type="number" className="place" name="accomodations" onChange={this.change} placeholder="Guests"></input>
                                        <input type="button" className="place1 btn-lg fbcolor rounded1 " style={{ 'backgroundColor': '#0067db' }} onClick={this.search.bind(this)} value="Search"></input>
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-12 free-space"></div>
                            <div class="col-lg-12 free-space"></div>
                            <div class="col-lg-12 free-space"></div>
                            <div class="col-lg-12 free-space"></div>
                            <div style={{ 'color': 'white', 'fontSize': '16px' }}>
                                <div class="col-lg-4">
                                    <strong >Your whole vacation starts here</strong><br></br>Choose a rental from the world's best selection
              </div>
                                <div class="col-lg-4">
                                    <strong >Book and stay with confidence</strong><br></br><a href="" >Secure payments, peace of mind</a>
                                </div>
                                <div class="col-lg-4">
                                    <strong >Your vacation your way</strong><br></br>More space, more privacy, no compromises
              </div>
                            </div>
                        </div>
                        <div style={{ 'height': '40px' }}></div>
                    </div>
                </div>
                <div class="col-lg-12 free-space"></div>
                <div><img src={require('../../imgs/Home-carousel.PNG')}></img></div>
                <div><a href="/ListProp"><img src={require('../../imgs/Home-listprop.PNG')}></img></a></div>
                <div class="col-lg-12 free-space"></div>
                <div class="">
                    <Footer /></div>
            </div>
        )
    }
}
export default Home;