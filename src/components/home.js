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
    this.state = {isAdmin: true}
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
