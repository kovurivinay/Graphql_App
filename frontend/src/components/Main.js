import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Details from './ListProps/Details';
import Create from './Create/Create';
import Navbar from './LandingPage/Navbar';
import ListProp from './ListProp';
import Bookingops from './ListProps/Bookingops';
import Profile from './User/Profile';
import ProfileDetails from './User/ProfileDetails';
import UserMenu from './User/UserMenu';
import Signup from './User/Signup';
import Osignup from './User/Osignup';
import CLogin from './User/CLogin';
import OLogin from './User/OLogin';
import Inbox from './User/Inbox';
import Footer from './Footer';
import Photos from './ListProps/Photos';
import Location from './ListProps/Location';
import Availability from './ListProps/Availability';
import Displayprops from './Displayprops';
import PropDetails from './PropDetails';
import BookingHistory from './BookingHistory';
import OwnerProps from './OwnerProps';


//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                
                <Route path="/" component={Navbar}/>
                <Route path="/Home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/Details" component={Details}/>
                <Route path="/Bookingops" component={Bookingops}/>
                <Route path="/ListProp" component={ListProp}/>
                <Route path="/UserMenu" component={UserMenu}/>
                <Route path="/UserMenu/Profile" component={Profile}/>
                <Route path="/Signup" component={Signup}/>
                <Route path="/CLogin" component={CLogin}/>
                <Route path="/OLogin" component={OLogin}/>
                <Route path="/Osignup" component={Osignup}/>
                <Route path="/Footer" component={Footer}/>
                <Route path="/Photos" component={Photos}/>
                <Route path="/Location" component={Location}/>
                <Route path="/Availability" component={Availability}/>
                <Route path="/Displayprops" component={Displayprops}/>
                <Route path="/PropDetails" component={PropDetails} />
                <Route path="/BookingHistory" component={BookingHistory} />
                <Route path="/OwnerProps" component={OwnerProps} />
                <Route path="/ProfileDetails" component={ProfileDetails} />
                <Route path="/UserMenu/Inbox" component={Inbox}/>
            </div>
            
        )
    }
}
//Export The Main Component
export default Main;