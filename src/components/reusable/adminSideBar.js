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

    if(access == "soloData"){
      return(
        <div className="side-nav">
            <Link smooth to="/stats#stats">
              <img  width ="25" height = "25" src ="https://image.flaticon.com/icons/svg/478/478544.svg"/>
              <span>Estadisticas</span>
            </Link>

            <Link smooth to="/stats#kpis">
                <img  width ="40" height = "40" src ="https://image.flaticon.com/icons/svg/1611/1611179.svg"/>
                <span>KPI´S </span>
            </Link>

            <Link smooth to="/stats#clients">
              <img  width ="35" height = "35" src ="https://image.flaticon.com/icons/svg/1528/1528669.svg"/>
              <span> Clientes </span>
            </Link>


            <Link smooth to="/stats#bus">
              <img  width ="35" height = "35" src ="https://image.flaticon.com/icons/svg/74/74928.svg"/>
              <span> Recolección </span>
            </Link>
        </div>
      );
    } else if(access == "total"){
      return(
        <div className="side-nav">
            <Link smooth to="/stats#stats">
              <img  width ="25" height = "25" src ="https://image.flaticon.com/icons/svg/478/478544.svg"/>
              <span>Estadisticas</span>
            </Link>

            <Link smooth to="/stats#kpis">
                <img  width ="40" height = "40" src ="https://image.flaticon.com/icons/svg/1611/1611179.svg"/>
                <span>KPI´S </span>
            </Link>

            <Link smooth to="/stats#clients">
              <img  width ="35" height = "35" src ="https://image.flaticon.com/icons/svg/1528/1528669.svg"/>
              <span> Clientes </span>
            </Link>


            <Link smooth to="/stats#bus">
              <img  width ="35" height = "35" src ="https://image.flaticon.com/icons/svg/74/74928.svg"/>
              <span> Recolección </span>
            </Link>

            <Link smooth to="/settings">
              <img  width ="35" height = "35" src ="https://image.flaticon.com/icons/svg/149/149213.svg"/>
              <span> Archivos </span>
            </Link>
        </div>
      );
    }
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
