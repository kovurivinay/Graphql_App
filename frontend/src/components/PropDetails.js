import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Footer from './Footer';
import { Node_IP, Node_Port } from "./../config";
import { graphql, compose } from 'react-apollo';
import { gql } from 'apollo-boost';
import { getPropertyDetails, getPropsQuery } from '../queries/queries';

// const getPropertyDetails = gql`
//             {
//                 Property(_id:2){
//                 owner
//             }
//         }
//         `;

class PropDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prs: {
                price: "",
                description: "",
                bedrooms: "",
                bathrooms: "",
                startdate: "",
                enddate: "",
                owner: ""
            },
            Home_props: "",
            days: 0,
            photos: [],
            Booked_dates1: []
        }

    }
    display1() {
        
        console.log(this.props.getPropertyDetails)
        if (this.props.getPropertyDetails.loading) {
            return (<div >Loading Page......</div>);
        }
        else {
            return (<div className="col-lg-12">
                <div class="container col-lg-8 rounded1">

                    <div id="myCarousel" class="carousel slide rounded1" data-ride="carousel">
                        <div class="carousel-inner">
                            {}
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
                            <span style={{ 'fontSize': '30px' }}>${this.props.getPropertyDetails.Property.price}</span>  per night</div>
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
                {this.props.getPropertyDetails.Property.price * 2}
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
                    <h3>{this.props.getPropertyDetails.Property.headline} </h3>
                    <p><i class="fas fa-map-marked-alt fa-2x"></i>&nbsp;{this.props.getPropertyDetails.Property.street}, {this.props.getPropertyDetails.Property.city}, {this.props.getPropertyDetails.Property.state}</p>
                    <div class="col-lg-12 free-space"></div>
                    <div class="col-lg-12 ">
                        <div class="col-lg-2 "></div>
                        <div class="col-lg-2 "><i class="fas fa-bath fa-3x"></i></div>
                        <div class="col-lg-2 "><i class="fas fa-bed fa-3x"></i></div>
                        <div class="col-lg-2 "><i class="fas fa-users fa-3x"></i></div>
                    </div>
                    <div class="col-lg-2"></div>

                    <div class="col-lg-2 ">{this.props.getPropertyDetails.Property.bathrooms}</div>
                    <div class="col-lg-2 ">{this.props.getPropertyDetails.Property.bedrooms}</div>
                    <div class="col-lg-2 ">{this.props.getPropertyDetails.Property.accomodations}</div>

                    <div class="col-lg-12 free-space"></div>
                    <div class="col-lg-12 free-space"></div>
                    <div class="col-lg-12 ">
                        <p><i class="fas fa-quote-left fa-2x fa-pull-left"></i>{this.props.getPropertyDetails.Property.description}</p></div>
                </div>
            </div>
            )
        }
    }
    async componentDidMount() {
        // this.setState({
        //     prs:this.props.getPropertyDetails.Property
        // })

        console.log(this.state)
        console.log(this.props.location.state.ID)
        // this.props.getPropertyDetails({
        //     variables: {
        //         id: 2                
        //     }
        // });
        console.log(this.props)
        console.log("Here 1")
        var data = {
            ID: this.props.location.state._id
        }
        this.setState({
            Home_props: this.props.location.state.Home_props
        })
        console.log(this.state)
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
        console.log(this.props.getPropertyDetails.Property)
        //console.log("Total : " + Number(this.props.getPropertyDetails.Property.price) * this.state.days)
    }
    Book = async () => {
        console.log(this.props.getPropertyDetails.Property._id)
        var data2 = {
            dates: this.state.Booked_dates1,
            ID: this.props.getPropertyDetails.Property._id,
            customer_name: localStorage.getItem('email'),


        }
        console.log(data2)
        await axios.post(Node_IP + Node_Port + '/Bookdates', data2)
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

    send = (e) => {
        const data = {
            message: this.state.message,
            from: localStorage.getItem('email'),
            to: this.props.getPropertyDetails.Property.owner,
        }
        axios.post(Node_IP + Node_Port + '/messages', data)
            .then(res => {
                console.log("message sent")
            }).catch(err => {
                console.log(err)
            })
    }

    render() {
        this.props.getPropertyDetails.variables._id = this.props.location.state.ID
        return (<div>
            {this.display1()}

            <Footer />
        </div>)
    }
}


export default compose(
    graphql(getPropertyDetails, { name: "getPropertyDetails" }),
    graphql(getPropsQuery, { name: "getPropsQuery" })
)(PropDetails);