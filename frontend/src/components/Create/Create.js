// import React, {Component} from 'react';
// import {Redirect} from 'react-router';
// import axios from 'axios';
// import cookie from 'react-cookies';
// import {Node_IP, Node_Port} from "./../../config";

// class Create extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//             Sname:"",
//             Sid:"",
//             Sdept:"",
//             direct:false
//         }
//         this.Sname = this.Sname.bind(this);
//         this.Sid = this.Sid.bind(this);
//         this.Sdept = this.Sdept.bind(this);
//         this.addStudent = this.addStudent.bind(this);
//     }
//     Sname=(e)=>{
//         this.setState({
//             Sname: e.target.value
//         })
//     }
//     Sid=(e)=>{
//         this.setState({
//             Sid: e.target.value
//         })
//     }
//     Sdept=(e)=>{
//         this.setState({
//             Sdept: e.target.value
//         })
//     }
//     addStudent(e){
//        e.preventDefault();
//         const data={
//             Sid:this.state.Sid,
//             Sname:this.state.Sname,
//             Sdept:this.state.Sdept
//         }
//          axios.post(Node_IP+Node_Port+'/create',data)
//                   .then((response) => {
//                   //update the state with the response data
//                   console.log(response.status);
//                   this.setState({
//                         direct:true
//                   })
//               }).catch(function (error) {
//                   console.log(error);
//                 });
//     }
//     render(){
//         let redirectVar = null;
//         if(!cookie.load('cookie')){
//             redirectVar = <Redirect to= "/login"/>
//         }
//         var redirectTo=null;
//         if(this.state.direct){
//             redirectTo=<Redirect to= "/home"/>
//         }
//         return(
//             <div>
//             {redirectVar}
//             {redirectTo}
//                 <br/>
//                 <div className="container">
//                     <form>
//                         <div style={{width: '30%'}} className="form-group">
//                             <input required  type="text" onChange = {this.Sid} className="form-control" name="StudentId" placeholder="Student Id" />
//                         </div>
//                         <br/>
//                         <div style={{width: '30%'}} className="form-group">
//                                 <input required type="text" onChange = {this.Sname} className="form-control" name="Name" placeholder="Name"/>
//                         </div>
//                         <br/>
//                         <div style={{width: '30%'}} className="form-group">
//                                 <input required type="text" onChange = {this.Sdept} className="form-control" name="Dept" placeholder="Department"/>
//                         </div>
//                         <br/>
//                         <div style={{width: '30%'}}>
//                             <button className="btn btn-success" type="submit" onClick={this.addStudent}>Create</button>
//                         </div> 
//                     </form>
//                 </div>
//             </div>
//         )
//     }
// }

// export default Create;