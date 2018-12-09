import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {pricinginfo} from '../../actions/index'
import {connect} from 'react-redux';

class Availability extends Component {
  constructor(props){
    super(props);
    this.state = {
        startdate:"",
        enddate:"",
        price:""
    };
    this.change=this.change.bind(this);
    this.onclick1=this.onclick1.bind(this);
  }

  change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
}
onclick1=(e)=>{
    e.preventDefault();

    console.log(this.state)
    if (this.state.startdate == "") {
        alert("Enter startdate!")
    }
    else if (this.state.enddate == "") {
        alert("Enter enddate!")
    }
    else if (this.state.price == "") {
        alert("Enter price!")
    }
    else {
        this.props.pricinginfo(this.state);
        this.props.callbackFromParent4();
    }

}
  
  render() {
      
        return (
          <div>
          <h2>
          Availability
          </h2>
          Already know when you would like your property to be available?
          <div className="row  margin-bottom1">
          <form class="form  ">
          <h4 className="padding-left-1">Select a starting and ending date for setting up your availability</h4>
          <div class="form-group col-lg-5 border1 back-gray">
          <br></br>
          <strong>Start Date:</strong>
          <div className="center2 "><input type="date" name="startdate"  onChange = {this.change}/></div></div>
          
          <div class="form-group col-lg-5 border1 back-gray">
          <br></br>
          <strong>End Date:</strong>
          <div className="center2"> <input type="date" name="enddate"  onChange = {this.change}/> </div></div>
              <div class="form-group col-lg-12">
                     <strong>Price:</strong>
                  <input name="price" type="text" errorText={this.state.usernameError} class="form-control" placeholder="Enter Price per Night" onChange = {this.change}/>
              </div>
              <div class="row margin-top1 margin-bottom1">
                        <div class="col-xs-5">
                            <a class="btn btn-default btn-rounded btn-sm" label="Back" href="" type="button">
                                <span class="btn__label">Back</span></a></div>
                        <div class="col-xs-5">
                            <a onClick={this.onclick1} class="btn btn-primary btn-rounded btn-sm" label="Next" href="" type="button">
                                <span class="btn__label">Submit</span></a></div>
                                
                    </div>
              
          </form>
      </div>
          </div>
          
        )
  }
}

// export default Availability;

export default connect("", { pricinginfo })(Availability);
