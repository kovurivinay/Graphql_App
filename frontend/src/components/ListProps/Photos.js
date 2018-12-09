import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { photosinfo } from '../../actions/index'
import { connect } from 'react-redux';
import {Node_IP, Node_Port} from "./../../config";

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: '',
      imageView: '',
      a: []
    };
  }
  onChange = async (e) => {
    if (e.target.name == 'selectedFile') {
      await this.setState({
        selectedFile: e.target.files
      })
      const { selectedFile } = this.state;
      let formData = new FormData();


      for (var i = 0; i < this.state.selectedFile.length; i++) {
        formData.append('selectedFile', selectedFile[i]);
      }
      console.log(formData.values)
      await axios.post(Node_IP+Node_Port+'/dbpictures', formData)
        .then((result) => {
          // access results...
          // this.setState({
          //   photos:result
          // })
        });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }

  }


  onclick1 = (e) => {
    e.preventDefault();
    console.log(this.state)
    this.props.photosinfo(this.state);
    this.props.callbackFromParent3();
  }

  render() {
    const { description, selectedFile } = this.state;
    return (
      <div>

        <div>
          {this.state.imageView}
        </div>
        <div className="container-fluid">
          <h2><b>Add up to 5 photos of your property</b></h2>
          <hr></hr>
          <div class="">

            Showcase your property’s best features (no pets or people, please). Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file size, 2 photos minimum.
            <a href="" target="_blank">Need photos? Hire a professional.</a></div>
          <br></br>
          <div className="col-lg-11 photo-border">
            <div className="center1"><br></br>
              <br></br>
              <br></br>
              <input
                type="file"
                name="selectedFile"
                onChange={this.onChange}
                multiple
              />
            </div></div>
        </div>
        <div class="row margin-top1 margin-bottom1">
          <div class="col-xs-5">
            <a class="btn btn-default btn-rounded btn-sm" label="Back" href="" type="button">
              <span class="btn__label">Back</span></a></div>
          <div class="col-xs-5">
            <a onClick={this.onclick1} class="btn btn-primary btn-rounded btn-sm" label="Next" href="" type="button">
              <span class="btn__label">Next</span></a></div>
        </div>
        <br></br>
      </div>
    )
  }
}

// export default Photos;
export default connect("", { photosinfo })(Photos);
