import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Footer from './Footer';
import {Node_IP, Node_Port} from "./../config";

class Displayprops extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prs: [],
            ID: 0,
            Home_props: this.props.location.state,
            photos1: [],
            photos2: [],
            currentPage: 1,
            todosPerPage: 10,
            startdate:"",
            enddate:"",
            city:"",
            guests:""
        }
    }
    async componentDidMount() {
        console.log(this.state.Home_props)
        var data = {
            startdate: this.state.Home_props.startdate,
            enddate: this.state.Home_props.enddate,
            guests: this.state.Home_props.accomodations
        }
        await axios.post(Node_IP+Node_Port+'/search', data)
            .then((response) => {
                console.log("Status Code : ", response.data);
                if (response.status === 200) {
                    this.setState({
                        prs: response.data,
                        prsreuse:response.data
                    })
                } else {
                    console.log("not done")
                }
            });
        console.log(this.state)
        let details = this.state.prs.map(pr => {
            this.setState({
                photos1: [...this.state.photos1, pr.photos]
            })
        })
        console.log(this.state)
        for (var i = 0; i < this.state.photos1.length; i++) {
            var data = {
                photos: this.state.photos1[i]
            }

            await axios.post(Node_IP+Node_Port+'/download', data)
                .then((response) => {
                    //console.log("Inside download..Display propss")
                    //console.log("Status Code : ", response.data[0]);
                    if (response.status === 200) {
                        this.setState({
                            photos2: [...this.state.photos2, response.data[0]]
                        })
                    } else {
                        this.setState({
                            photos2: [...this.state.photos2, " waste"]
                        })
                        console.log("not done")
                    }
                }).catch(err => {
                    this.setState({
                        photos2: [...this.state.photos2, ""]
                    })
                    console.log(err);
                })

        }
    }

    // Without async, it's not setting state
    details = async (ID1) => {
        await this.setState({
            _id: ID1
        })
        //alert(this.state._id)
        this.props.history.push("/PropDetails", this.state)
    }
    handleClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    
    change = (e)=>{
        // this.setState({ [e.target.name]: e.target.value });
        // if(e.target.name=="country"){
        //     var temp=this.state.prsreuse.filter(function(pr){
        //         return pr.city==e.target.value
        //     })
        //     this.setState({
        //         prs:temp
        //     })
        //     console.log(temp)
            
        // }
        // else if(e.target.name=="startdate"){
        //     //if(this.state.)
        //     alert("")
        //     var temp=this.state.prsreuse.filter(function(pr){
        //         console.log(pr.startdate)
        //         console.log(e.target.value)
        //         console.log(e.target.value<=pr.startdate)
                
        //         return e.target.value<=pr.startdate
        //     })
            
        //     this.setState({
        //         prs:temp
        //     })
        //     console.log(temp)
        //}
    }
    render() {
        const { prs, photos2, currentPage, todosPerPage } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const props = prs.slice(indexOfFirstTodo, indexOfLastTodo);
        const photoslist = photos2.slice(indexOfFirstTodo, indexOfLastTodo);
        //console.log(props[1])
        //console.log(photos2)

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(prs.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li class="page-item"><a class="page-link" key={number}
                    id={number}
                    onClick={this.handleClick}>{number}</a></li>
            );
        });
        let details = []
        for (var i = 0; i < props.length; i++) {
            details.push(
                <div className="col-lg-9 border-prs margin-bottom1 rounded1 shadow-vin">
                    <div>
                        <div className="col-lg-3  container1">
                            <img src={'data:image/jpeg;base64,' + photoslist[i]}></img></div>
                        <div className="list- col-lg-6 container2">
                            <a href="" onClick={this.details.bind(this, props[i]._id)} className="list-group-item ">
                                <h4 className="">{props[i].headline}</h4>
                                <div class="HitInfo__details">
                                    <div class=" Details__label">House</div>
                                    <div class=" Details__label">{props[i].bedrooms} BR</div>
                                    <div class=" Details__label">{props[i].bathrooms} BA</div>
                                    <div class=" Details__label">Sleeps {props[i].accomodations}</div>
                                </div>
                                <p className="">{props[i].description.substr(0, 150)}</p>
                            </a>
                        </div>
                    </div>
                </div>
            )
        }

        return (<div>
            <div className="HomeContent">
                <p><input type="text" id="p1" className="place" name="country" placeholder="Where do you want to go" onChange={this.change}></input>
                    <input type="date" className="place inc-width" value={this.state.startdate} name="startdate" onChange={this.change} />
                    <input type="date" className="place inc-width" value={this.state.enddate} name="enddate" onChange={this.enddatechange} placeholder="Depart"></input>
                    <input type="number" className="place" name="accomodations" onChange={this.change} placeholder="Guests"></input>

                </p>
            </div>
            <div className="col-lg-9 col-lg-offset-3">
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        {renderPageNumbers}
                    </ul>
                </nav>
            </div>
            <div class="col-lg-1"></div>
            <div class="col-lg-11">
                {details}
            </div>{/*console.log(this.props.location.state)*/}
            <div class="col-lg-12 free-space"></div>
            <div class="col-lg-12 free-space"></div>
            <Footer />
        </div>)
    }
}

export default Displayprops