import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Footer from './Footer';
import {Node_IP, Node_Port} from "./../config";

class PropDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prs: "",
            Home_props: "",
            days: 0,
            photos: [],
            Booked_dates1: []
        }

    }

    async componentWillMount() {
        console.log(this.props.location.state.ID)
        console.log("Here 1")
        var data = {
            ID: this.props.location.state._id
        }
        this.setState({
            Home_props: this.props.location.state.Home_props
        })
        await axios.post(Node_IP+Node_Port+'/searchprop', data)
            .then((response) => {
                console.log("Status Code : ", response.data);
                if (response.status === 200) {
                    this.setState({

                        prs: response.data
                    })
                } else {
                    console.log("not done")
                }
            });
        var data1 = {
            photos: this.state.prs.photos
        }
        console.log("Here 2" + this.state.prs)
        if (data1.photos != "") {
            await axios.post(Node_IP+Node_Port+'/download', data1)
                .then((response) => {
                    console.log("Inside download..")
                    console.log("Status Code : ", response.data);
                    if (response.status === 200) {
                        this.setState({

                            photos: response.data
                        })
                    } else {
                        console.log("not done")
                    }
                });
        }
        console.log(this.state.photos)
        this.setState({ days: (new Date(this.state.Home_props.enddate) - new Date(this.state.Home_props.startdate)) / 86400000 });
        var Booked_dates = [];
        var nextDay = new Date(this.state.Home_props.startdate);
        console.log(nextDay)
        console.log("Here 3")
        for (var i = 0; i < this.state.days + 1; i++) {
            nextDay.setDate(nextDay.getDate() + 1)
            Booked_dates.push(new Date(nextDay));

        }
        console.log("After operation: " + Booked_dates)

        this.setState({
            Booked_dates1: Booked_dates
        })
        console.log("After operation state: " + Booked_dates)

        //console.log(this.state)
        // console.log("Diff "+(this.state.days))
        console.log(this.state.prs)
        console.log("Total : " + Number(this.state.prs.price) * this.state.days)
    }
    Book = async () => {
        var data2 = {
            dates: this.state.Booked_dates1,
            ID: this.state.prs._id,
            customer_name: localStorage.getItem('email'),
            

        }
        console.log(data2)
        await axios.post(Node_IP+Node_Port+'/Bookdates', data2)
            .then((response) => {
                console.log("Inside download..")
                console.log("Status Code : ", response.data);
                if (response.status === 200) {

                    console.log("Insertion done");
                    console.log(response.data)
                    this.props.history.push("/BookingHistory")
                } else {
                    console.log("not done")
                }
            })
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    send = (e)=>{
        const data={
            message:this.state.message,
            from: localStorage.getItem('email'),
            to: this.state.prs.owner,
        }
        axios.post(Node_IP+Node_Port+'/messages',data)
        .then(res => {
            console.log("message sent")
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        var photos = []
        if (this.state.photos.length > 0) {
            photos.push(
                <div class="item active container-img">
                    <img src={'data:image/jpeg;base64,' + this.state.photos[0]} alt="Not found" style={{ 'width': '100%' }} />
                </div>

            )
        }
        for (var i = 1; i < this.state.photos.length; i++) {
            photos.push(
                <div class="item container-img">
                    <img src={'data:image/jpeg;base64,' + this.state.photos[i]} alt="Not found" style={{ 'width': '100%' }} />
                </div>

            )
        }



        return (<div>
            <div className="col-lg-12">
                <div class="container col-lg-8 rounded1">

                    <div id="myCarousel" class="carousel slide rounded1" data-ride="carousel">
                        <div class="carousel-inner">
                            {photos}
                        </div>

                        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control" href="#myCarousel" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <div class="container col-lg-4 border-prs1 rounded1 shadow-vin">
                    <form class="form">
                        <div class="col-lg-12 free-space"></div>
                        <div class="col-lg-12 free-space"></div>
                        <div class="col-lg-12 free-space"></div>
                        <div class="col-lg-12">
                            <span style={{ 'fontSize': '30px' }}>${this.state.prs.price}</span>  per night</div>
                        <div class="col-lg-12 free-space"></div>
                        <div class="col-lg-6 border-dates ">
                            <label for="startdate">Check-in</label>
                            <input type="date" name="enddate" value={this.state.Home_props.startdate} ></input></div>

                        <div class="col-lg-6 border-dates ">
                            <label for="enddate">Check-out</label>
                            <input type="date" name="enddate" value={this.state.Home_props.enddate} ></input></div>
                        <div class="col-lg-12">
                            <label>Guests</label><br></br>
                            <span>&nbsp;{this.state.Home_props.accomodations} Guests</span>

                        </div>
                        <div class="col-lg-12 free-space"></div>
                        <div className="text1">Total:
                        {this.state.prs.price * this.state.days}
                        </div>
                        <div class="col-lg-12 free-space"></div>
                        <div class="col-lg-12 free-space"></div>
                        <div className="form-group col-lg-8 col-lg-offset-2">
                            <input type="button" onClick={this.Book.bind(this)} className="form-control btn-primary fbcolor " value="Request to Book" />
                        </div>
                        <div class="col-lg-7 col-lg-offset-3">

                            <div data-toggle="modal" data-target="#exampleModalCenter"><a>Message to the owner</a></div>



                            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLongTitle">Send a message</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <textarea onChange={this.change} className="details_item form-control" name="message" placeholder="Message to the Owner"></textarea><br></br>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" onClick={this.send} class="btn btn-primary">Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
                <div class="col-lg-12 free-space"></div>
                <div class="col-lg-12 " style={{ 'height': '400px' }}>
                    <h3>{this.state.prs.headline} </h3>
                    <p><i class="fas fa-map-marked-alt fa-2x"></i>&nbsp;{this.state.prs.street}, {this.state.prs.city}, {this.state.prs.state}</p>
                    <div class="col-lg-12 free-space"></div>
                    <div class="col-lg-12 ">
                        <div class="col-lg-2 "></div>
                        <div class="col-lg-2 "><i class="fas fa-bath fa-3x"></i></div>
                        <div class="col-lg-2 "><i class="fas fa-bed fa-3x"></i></div>
                        <div class="col-lg-2 "><i class="fas fa-users fa-3x"></i></div>
                    </div>
                    <div class="col-lg-2"></div>

                    <div class="col-lg-2 ">{this.state.prs.bathrooms}</div>
                    <div class="col-lg-2 ">{this.state.prs.bedrooms}</div>
                    <div class="col-lg-2 ">{this.state.prs.accomodations}</div>

                    <div class="col-lg-12 free-space"></div>
                    <div class="col-lg-12 free-space"></div>
                    <div class="col-lg-12 ">
                        <p><i class="fas fa-quote-left fa-2x fa-pull-left"></i>{this.state.prs.description}</p></div>
                </div>
            </div>


            <Footer />
        </div>)
    }
}


export default PropDetails