import React,{Component} from "react";
import Header from "./reusable/header";
import AdminSideBar from "./reusable/adminSideBar";
import VendorSideBar from "./reusable/vendorSideBar";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import Chat from "./chat"
library.add(faStroopwafel)
class Home extends Component{

  constructor(props){
    super(props);
    this.state = {isAdmin: null}
  }

  componentWillMount(){
    fetch("http://192.168.0.8:3000/api/user_type")
      .then(res => res.json())
      .then(resJson => {
        this.setState({isAdmin: resJson.type})
      })
      .catch(e => console.log(e));
  }


  defineUserType(){
    if(this.state.isAdmin){
      return <AdminSideBar/>
    } else {
      return <VendorSideBar/>
    }
  }

  render(){
    return(
      <div>
        <Header/>
        {this.defineUserType()}
      </div>
    );
  }
}


export default Home;
