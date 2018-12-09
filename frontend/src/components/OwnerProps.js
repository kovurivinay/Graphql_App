import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import {Node_IP, Node_Port} from "./../config";

class OwnerProps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props:[],
            currentPage: 1,
            todosPerPage: 5,
        }

    }



    componentDidMount() {
        var data = {
            name: localStorage.getItem('email')
        }
        axios.post(Node_IP+Node_Port+'/get_properties', data)
            .then((response) => {
                //update the state with the response data
                
                console.log(response.data)
                this.setState({
                    props: response.data,

                });
                
            });


    }
    handleClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {
        const { props, currentPage, todosPerPage } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const prop = props.slice(indexOfFirstTodo, indexOfLastTodo);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(props.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li class="page-item"><a class="page-link" key={number}
                    id={number}
                    onClick={this.handleClick}>{number}</a></li>
            );
        });
        
        //iterate over Bookings to create a table row
        let details = prop.map(booking => {
            return (
                <tr>
                    <td>{booking.headline}</td>
                    <td>{booking.owner}</td>
                    <td>{booking.startdate}</td>
                     <td>{booking.enddate}</td>
                     <td>{booking.Customer_name}</td>
                     {(booking.Booked_dates.length>0)?<td>{booking.Booked_dates.trim().split(" ")[0].substr(0,10)}----{booking.Booked_dates.trim().split(" ")[booking.Booked_dates.trim().split(" ").length-1].substr(0,10)}</td>:<td></td>}

                </tr>

            )
        })
        //if not logged in go to login page
        let redirectVar = null;
        // if(!cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/login"/>
        // }
        return (
            <div>
                {redirectVar}
                <div class="container">
                    <h2>List of All Properties</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Property Name</th>
                                <th>Owner name</th>
                                <th>Available From</th>
                                <th>To</th>
                                <th>Booked by</th>
                                <th>Booked Dates</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*Display the Tbale row based on data recieved*/}
                            {details}
                        </tbody>
                    </table>
                    <div className="col-lg-9 col-lg-offset-3">
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        {renderPageNumbers}
                    </ul>
                </nav>
            </div>

                </div>

            </div>
        )
    }

}


export default OwnerProps