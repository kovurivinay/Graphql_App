import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import { Node_IP, Node_Port } from "./../../config";

class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            messageslist: []
        }
    }

    componentDidMount() {


        //console.log(localStorage.getItem('email'))
        var data = {
            to: localStorage.getItem('email'),

        }
        axios.post(Node_IP + Node_Port + '/get_messages', data)
            .then(res => {
                console.log(res.data)
                this.setState({
                    messages: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    reply = (e, v) => {
        console.log(e + v)
    }

    send = (e, to) => {
        //e.preventDefault();
        const data = {
            message: this.state.message,
            from: localStorage.getItem('email'),
            to: to,
        }
        console.log(data)
        axios.post(Node_IP + Node_Port + '/messages', data)
            .then(res => {
                console.log("message sent")

            }).catch(err => {
                console.log(err)
            })
    }
    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    render() {
        let messageslist = this.state.messages.map(msg => {
            return (
                <tr >
                    <td>{msg.from}</td>

                    <td>{msg.message}</td>
                    <td>
                        <button data-toggle="modal" data-target="#exampleModalCenter">Reply</button>
                        <div class="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">Send a message</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <input onChange={this.change} autofocus="autofocus" className="details_item form-control" name="message" placeholder="Message to the Owner"></input><br></br>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" onClick={(e) => this.send(e, msg.from)} class="btn btn-primary">Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td><button>Delete</button></td>

                </tr>
            );
        });
        console.log(messageslist)

        return (
            <div>
                <div className="col-lg-12 col-lg-offset-2"></div>
                <div>

                    <div class="container">
                        <h2>Inbox</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>From</th>

                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>

                                {messageslist}
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
        );

    }
}

export default Inbox;