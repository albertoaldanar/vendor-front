import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import Chat from "../chat"

const AdminSideBar = () => {
  return(
      <div>
          <div className="side-nav">
            <Link to="/calendar">
              <img  width ="25" height = "25" src ="https://image.flaticon.com/icons/svg/149/149906.svg"/>
              <span>Calendario</span>
            </Link>

            <Link to="/stats">
              <img  width ="25" height = "25" src ="https://image.flaticon.com/icons/svg/134/134483.svg"/>
              <span>Estadisticas</span>
            </Link>

            <Link to="/team">
              <img  width ="25" height = "25" src ="https://image.flaticon.com/icons/svg/726/726185.svg"/>
              <span>Equipo</span>
            </Link>

            <Link to="/chat">
              <img  width ="25" height = "25" src ="https://image.flaticon.com/icons/svg/126/126395.svg"/>
              <span>Posiciones</span>
            </Link>

            <Link to="/chat">
              <img  width ="25" height = "25" src ="https://image.flaticon.com/icons/svg/685/685813.svg"/>
              <span>Chat</span>
            </Link>

        </div>

        <Chat/>
      </div>
  );
}

export default AdminSideBar;
