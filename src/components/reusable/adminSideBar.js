import React, {Component} from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

import Chat from "../chat"
import { HashLink as Link } from 'react-router-hash-link';
import smoothscroll from 'smoothscroll-polyfill';

class AdminSideBar extends Component{

  componentWillMount(){
      smoothscroll.polyfill();
  }

  sidebarType(){
    var access = localStorage.getItem('access');


      return(
        <div className="side-nav">

            <Link smooth to="/settings">
              <img  width ="25" height = "25" src ="https://image.flaticon.com/icons/svg/149/149213.svg"/>
              <span> Reportes </span>
            </Link>

             <Link smooth to="/itinerary">
              <img  width ="25" height = "25" src ="https://image.flaticon.com/icons/svg/1179/1179054.svg"/>
              <span> Itinerario </span>
            </Link>
        </div>
      );
  }

  render(){
    var access= localStorage.getItem('access');

    return(
      <div>
        {this.sidebarType()}
        <Chat/>
      </div>
    );
  }
}


export default AdminSideBar;
