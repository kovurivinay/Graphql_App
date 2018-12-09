import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import '../../App.css';

//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super(props);
        //this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            direct1: false
        }
    }
    //handle logout to destroy the cookie
    handleLogout1 = () => {
        // if (cookie.load('ccookie')) {
        if(localStorage.getItem('cookie')=="customer"){
            console.log("Removed traveler cookie")
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('email')
            localStorage.removeItem('cookie')
            //console.log(localStorage.getItem('email'))
            //cookie.remove('ccookie', { path: '/' })
        }
        else if (localStorage.getItem('cookie')=="owner") {
            console.log("Removed owner cookie")
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('email')
            localStorage.removeItem('cookie')
            //cookie.remove('ocookie', { path: '/' })
        }
    }

    messagesButton = ()=>{
        this.props.history.push("/UserMenu/Inbox", this.state)
    }

    render() {
        //if Cookie is set render Logout Button
        let navLogin1 = null;
        if (localStorage.getItem('cookie')=="customer") {
            console.log("Able to read cookie");
            navLogin1 = (
                <ul className="nav navbar-nav navbar-right">
                    <li class="dropdown ">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            {localStorage.getItem('email')}<span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href='/UserMenu/Profile'>Customer Profile</a></li>
                            <li><a href='/BookingHistory'>Trip History</a></li>
                        </ul>
                    </li>
                    <li><div><i className="fas fa-envelope fa-2x margin-top-messages" onClick={this.messagesButton}></i></div></li>
                    <li className="cblue"><Link to="/ListProp">List Your Property</Link></li>
                    <li><Link to="" onClick={this.handleLogout1.bind(this)}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }
        else if (localStorage.getItem('cookie')=="owner") {
            console.log("Able to read cookie");
            navLogin1 = (
                <ul className="nav navbar-nav navbar-right">
                    <li class="dropdown ">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            {localStorage.getItem('email')}<span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href='/UserMenu/Profile'>Owner Profile</a></li>
                            <li><a href='/OwnerProps'>Owner Dashboard</a></li>
                        </ul>
                    </li>
                    <li><div><i className="fas fa-envelope fa-2x margin-top-messages" onClick={this.messagesButton}></i></div></li>
                    <li className="cblue"><Link to="/ListProp">List Your Property</Link></li>
                    <li><Link to="/Home" onClick={this.handleLogout1.bind(this)}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }
        else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin1 = (
                <ul className="nav navbar-nav navbar-right">
                    <li class="dropdown ">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            Login<span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href='/Clogin'>Customer Login</a></li>
                            <li><a href='/ologin'>Owner Login</a></li>
                        </ul>
                    </li>
                </ul>
            )
        }

        return (
            <div>
                <nav className="navbar navbar-transparent margin-minus">
                    <div className="container">
                        <div class="navbar-header">
                            <Link to="/Home"> <img className="" src={require('../../imgs/logo.svg')}></img> </Link>
                        </div>
                        <ul class="nav navbar-nav navbar-right">
                            {/*<li><Link to="/home">Home</Link></li>
        <li><Link to="/create">Add a Student</Link></li> */}
                            <li>{navLogin1}</li>
                            <li> </li>
                            <li ></li>
                            <li className="margin-icon navbar-item"><a href="/Home"> <i class="fas fa-home fa-2x"></i></a></li>
                        </ul>
                    </div>
                </nav>
            </div>

        )
    }
}
export default Navbar;