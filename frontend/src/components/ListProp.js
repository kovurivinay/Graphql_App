import React, { Component } from 'react';
import '../App.css';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
import Details from './ListProps/Details';
import Bookingops from './ListProps/Bookingops'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Photos from './ListProps/Photos';
import Location from './ListProps/Location';
import axios from 'axios';
import Availability from './ListProps/Availability';
import Footer from './Footer';
import cookie from 'react-cookies';
import {insertprops} from '../actions/index'
import {connect} from 'react-redux';
import {Node_IP, Node_Port} from "./../config";

class ListProp extends Component {
    constructor() {
        super();
        this.state = {
            rvar: "",
            child1: "",

            owner: localStorage.getItem('email'),
            property_name: "",

            country: "",
            street: "",
            city: "",
            state: "",
            zipcode: "",

            headline: "",
            description: "",
            property_type: "",
            bedrooms: "",
            accomodations: "",
            bathrooms: "",

            photos: "",

            price: "",
            amenities: "",
            startdate: "",
            enddate: "",

        }
    }

    progress = (e) => {
        console.log(e)
        this.setState({
            rvar: e
        })
    }
    componentDidMount() {
        if (localStorage.getItem('cookie')=="owner") {
            this.setState({
                rvar: <Location callbackFromParent={this.myCallback} />
            })
        }
        else {
            this.props.history.push('/OLogin')
        }
    }
    myCallback = async (dataFromChild) => {
        await this.setState({
            rvar: <Details callbackFromParent1={this.myCallback1} />
        })
    }
    myCallback1 = async (dataFromChild1) => {
        await this.setState({
            //...dataFromChild1,
            rvar: <Bookingops callbackFromParent2={this.myCallback2} />
        })
        //console.log(this.state.bathrooms)
    }
    myCallback2 = async (dataFromChild2) => {
        await this.setState({
            //...dataFromChild2,
            rvar: <Photos callbackFromParent3={this.myCallback3} />
        })
    }
    myCallback3 = async (dataFromChild3) => {
        await this.setState({
            //...dataFromChild3,
            rvar: <Availability callbackFromParent4={this.myCallback4} />
        })
    }
    myCallback4 = async (dataFromChild4) => {
        await this.setState({
            //...dataFromChild4,
            //rvar:<Availability callbackFromParent4={this.myCallback4}/>
        })
        //console.log(this.state)
        console.log(this.props.propData)
        console.log(this.state.owner)
        this.props.insertprops(this.props.propData)
        // await axios.post(Node_IP+Node_Port+'/propertydb', this.state)
        //     .then((response) => {
        //         console.log("Status Code : ", response.data);
        //         if (response.status === 200) {
        //             console.log("insertion done")
        //         } else {
        //             console.log("not done")
        //         }

        //     });
        this.props.history.push("/OwnerProps")
    }
    c1() {
        console.log(localStorage.getItem('email'))
        console.log(this.state)

        axios.post(Node_IP+Node_Port+'/propertydb', this.state)
            .then((response) => {
                console.log("Status Code : ", response.data);
                if (response.status === 200) {
                    console.log("insertion done")
                } else {
                    console.log("not done")
                }

            });
    }


    render() {

        return (
            <div>
                <div class="row col-lg-12  "><br></br></div>
                <div class="container-fluid listBody">
                    <div class="row ">
                        <div class="col-lg-2 col-lg-offset-1 sidebar">
                            <ul class="nav nav-sidebar">
                                <li ><h4 onClick={this.c1.bind(this)}> Welcome </h4></li>

                                <li class="active"><a onClick={this.progress.bind(this, <Location callbackFromParent={this.myCallback} />)}>Location<span class="sr-only">(current)</span></a></li>
                                <li><a onClick={this.progress.bind(this, <Details callbackFromParent1={this.myCallback1} />)}>Details</a></li>
                                <li><a onClick={this.progress.bind(this, <Bookingops callbackFromParent2={this.myCallback2} />)}>Booking Options</a></li>
                                <li><a onClick={this.progress.bind(this, <Photos callbackFromParent3={this.myCallback3} />)}>Photos</a></li>
                                <li><a onClick={this.progress.bind(this, <Availability callbackFromParent4={this.myCallback4} />)}>Pricing</a></li>
                            </ul>

                        </div>
                        <div class="col-lg-6 listBody1 ">
                            {this.state.rvar}
                        </div>
                    </div>
                    <div class="col-lg-12 free-space"></div>
                </div>

                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    propData: state.listprops.propData
})

// export default ListProp;
export default connect(mapStateToProps, { insertprops })(ListProp);