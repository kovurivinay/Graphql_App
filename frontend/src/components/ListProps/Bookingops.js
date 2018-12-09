import React, { Component } from 'react';
import '../../App.css';

class Bookingops extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.onclick1=this.onclick1.bind(this)
    }
    onclick1=(e)=>{
        e.preventDefault();

        console.log(this.state)
        this.props.callbackFromParent2();
    }

    render() {

        return (
            <div>
                <h3 class="page-header">Booking Options</h3>
                <p class=" desc1 font-weight-normal">Select a booking method.</p>

                <form role="form" className="form-group">


                    <div class="form-check checkbox">
                        <span class="reco label label-warning"><span>Recommended</span></span><br></br>
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                        <label class="form-check-label" for="exampleRadios1">
                            <b>Instant Booking</b>
                        </label>
                    </div>
                    <div class="option-explanation col-lg-offset-1" name="choice"><p><span>Automatically accept booking requests from all travelers for dates you have available, and add the bookings to your calendar. </span>
                    </p><a class="learn-more"><span>Learn more</span></a></div>
                    <div class="form-check checkbox ">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                        <label class="form-check-label" for="exampleRadios2">
                            <b>24-Hour Review</b>
                         </label>
                         
                    </div>
                    <div class="option-explanation col-lg-offset-1" name="choice"><p><span>Allow 24 hours to communicate with guests and accept booking requests. </span>
                    </p><a class="learn-more"><span>Learn more</span></a></div>
                    
                    <br></br>
                                <br></br>
                    <div class="row">
                        <div class="col-xs-5">
                            <a class="btn btn-default btn-rounded btn-sm" label="Back" href="" type="button">
                                <span class="btn__label">Back</span></a></div>
                        <div class="col-xs-5">
                            <a onClick={this.onclick1} class="btn btn-primary btn-rounded btn-sm" label="Next" href="" type="button">
                                <span class="btn__label">Next</span></a></div>
                                
                    </div>
                </form>



            </div>
        )
    }
}

export default Bookingops;
