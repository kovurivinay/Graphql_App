import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import {Node_IP, Node_Port} from "./../config";

class BookingHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings:[],
            name:localStorage.getItem('email'),
            Booked_dates:"",
            currentPage: 1,
            todosPerPage: 5,
        }

    }


    componentDidMount(){
        var data={
            name:localStorage.getItem('email')
        }
        axios.post(Node_IP+Node_Port+'/get_bookings',data)
                .then((response) => {
                //update the state with the response data
                console.log(response.data)
                this.setState({
                    bookings : response.data,
                    
                }); 
            }).catch(err => {
                console.log(err);
            });

            
    }

    handleClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    
    render(){
        const { bookings, currentPage, todosPerPage } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const bookings1 = bookings.slice(indexOfFirstTodo, indexOfLastTodo);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(bookings.length / todosPerPage); i++) {
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
         let details = bookings1.map(booking => {
             return(
                 <tr>
                     <td>{booking.headline}</td>
                     <td>{booking.owner}</td>
                     <td>{booking.city}</td>
                     <td>{booking.price}</td>
                     <td>{booking.Booked_dates.trim().split(" ")[0].substr(0,10)}</td>
                     <td>{booking.Booked_dates.trim().split(" ")[booking.Booked_dates.trim().split(" ").length-1].substr(0,10)}</td>
                     
                     
                 </tr>
                
             )
        })
        //if not logged in go to login page
        let redirectVar = null;
        // if(!cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/login"/>
        // }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <h2>List of All Bookings</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Property Name</th>
                                    <th>Owner name</th>
                                    <th>City</th>
                                    <th>Price</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
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


export default BookingHistory