import React, { Component } from 'react';
import '../../App.css';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {locationinfo } from "../../actions/index"
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class Location extends Component {
    constructor() {
        super();
        this.state = {
            street: "",
            country: "United states",
            city: "",
            state: "",
            zipcode: ""

        }
        this.onclick1 = this.onclick1.bind(this);
        this.change = this.change.bind(this);
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onclick1 = (e) => {
        e.preventDefault();
        //console.log(this.state)
        if (this.state.street == "") {
            alert("Enter street!")
        }
        else if (this.state.city == "") {
            alert("Enter city!")
        }
        else if (this.state.state == "") {
            alert("Enter state!")
        }
        else if (this.state.zipcode == "") {
            alert("Enter zipcode!")
        }
        else {
            this.props.locationinfo(this.state);
        this.props.callbackFromParent();
        }
        
        //this.props.callbackFromParent(this.state);
        // setTimeout(() => {
        //     this.props.history.push('/Details')
        // }, 1000);
        
        
    }

    render() {

        return (<div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3  ">
                        <div className="free-space"></div>
                        <div className="row margin-top1 margin-bottom1">

                            <form class="form">
                                <div class="form-group col-lg-12">
                                    <select class="form-control" data-flag="true" >
                                        <option>United States </option>

                                    </select>
                                </div>

                                <div class="form-group col-lg-12">
                                    <input onChange={this.change} type="text" class="form-control" name="street" id="email" placeholder="Street Address" />
                                </div>
                                <div class="form-group col-lg-12">
                                    <input onChange={this.change} type="text" class="form-control" name="city" id="email" placeholder="City" />
                                </div>
                                <div class="form-group col-lg-12">
                                    <input onChange={this.change} type="text" class="form-control" name="state" id="email" placeholder="State" />
                                </div>
                                <div class="form-group col-lg-12">
                                    <input onChange={this.change} type="text" name="zipcode" class="form-control" placeholder="Zip Code" />
                                </div>

                                <div class="form-group col-lg-5">
                                    <a class="form-control btn btn-default btn-rounded" style={{ width: '50%' }} label="Back" href="" type="button">
                                        <span class="btn__label">Back</span></a></div>
                                <div class="form-group col-lg-6">
                                    <a onClick={this.onclick1} class="form-control btn btn-primary btn-rounded" style={{ width: '50%' }} label="Next" href="" type="button">
                                        <span class="btn__label">Next</span></a></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

//export default Location;
const mapStateToProps = (state) => ({
    //Lvalue: state.listprops.Lvalue,
    // street: state.listprops.street,
    // country: "United states",
    // city: state.listprops.city,
    // state: state.listprops.state,
    // zipcode: state.listprops.zipcode
})
export default connect(mapStateToProps, { locationinfo })(Location);