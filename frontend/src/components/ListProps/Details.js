import React, { Component } from 'react';
import '../../App.css';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {detailsinfo} from '../../actions/index'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            headline: "",
            description: "",
            property_type: "Housing",
            bedrooms: "",
            accomodations: "",
            bathrooms: ""
        }
        this.onclick1 = this.onclick1.bind(this)
        this.change = this.change.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ property_type: event.target.value });
    }
    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    onclick1 = (e) => {
        e.preventDefault();
        console.log(this.state)
        if (this.state.headline == "") {
            alert("Enter headline!")
        }
        else if (this.state.description == "") {
            alert("Enter description!")
        }
        else if (this.state.bedrooms == "") {
            alert("Enter bedrooms!")
        }
        else if (this.state.accomodations == "") {
            alert("Enter accomodations!")
        }
        else if (this.state.bathrooms == "") {
            alert("Enter bathrooms!")
        }
        else {
            this.props.detailsinfo(this.state);
        this.props.callbackFromParent1();
        }
        
    }

    render() {
        return (
            <div>
                <h3 class="page-header">Describe your property</h3>
                <p class=" desc1 font-weight-normal">Start out with a descriptive headline and a detailed summary of your property.</p>
                <form className="form-group">
                    <textarea onChange={this.change} className="details_item form-control" name="headline" placeholder="Headline"></textarea><br></br>
                    <textarea onChange={this.change} className="details_item form-control" name="description" placeholder="Property description" rows="4"></textarea>
                    <br></br>
                    <select value={this.state.property_type} onChange={this.handleChange} name="property_type" className="details_item form-control">Property Type
                        <option value="Housing">Housing</option>
                        <option value="Cottage">Cottage</option>
                        <option value="Bungalow">Bungalow</option>
                        <option value="Boat">Boat</option>
                        <option value="Cabin">Cabin</option></select>

                    <input onChange={this.change} type="number" className="details_item form-control" name="bedrooms" id="details_bedroom" step="1" placeholder="Bedrooms" />

                    <input onChange={this.change} type="number" className="details_item form-control" name="accomodations" placeholder="Accomodations" />
                    <input onChange={this.change} type="number" className="details_item form-control" name="bathrooms" placeholder="Bathrooms" />
                    <div class="row">
                        <div class="col-xs-6">
                            <a class="btn btn-default btn-rounded btn-sm" label="" href="" type="button">
                                <span class="">Back</span></a></div>
                        <div class="col-xs-6">
                            <a onClick={this.onclick1} class="btn btn-primary btn-rounded btn-sm" label="Next" href="" type="button">
                                <span class="btn__label">Next</span></a></div>
                    </div>
                </form>
            </div>
        )
    }
}
// export default Details;
const mapStateToProps = (state) => ({
    //Lvalue: state.listprops.Lvalue,
    // street: state.listprops.street,
    // headline: state.listprops.headline,
    // description: state.listprops.description,
    // property_type: "Housing",
    // bedrooms: state.listprops.bedrooms,
    // accomodations: state.listprops.accomodations,
    // bathrooms: state.listprops.bathrooms
})
export default connect(mapStateToProps, {detailsinfo})(Details);