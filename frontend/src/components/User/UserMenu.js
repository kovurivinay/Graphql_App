import React, { Component } from 'react';
import '../../App.css';
import { Route } from 'react-router-dom';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Inbox from './Inbox';

class UserMenu extends Component {
    constructor() {
        super();
        this.state = {
            rvar:""
        }
    }

    render() {

        return (
            <div>
                <div className="container-fluid">
                    <div className="col-lg-7 col-lg-offset-2">
                        <ul class="nav nav-tabs nav-justified">
                            <li className="tabs_menu1" ><Link to="/UserMenu/Inbox" activeClassName="active">Inbox</Link></li>
                            <li className="tabs_menu"><a href="#">My Trips</a></li>
                            <li class=" tabs_menu"><Link to="/UserMenu/Profile" activeClassName="active">Profile</Link></li>
                            <li className="tabs_menu"><a href="#">Account</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-12 free-space"></div>
                <div>
                
                </div>
                
            </div>
        )
    }
}

export default UserMenu;