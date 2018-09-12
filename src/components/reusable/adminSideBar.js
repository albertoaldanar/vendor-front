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
              <img  width ="25" height = "25" src ="https://image.flaticon.com/icons/svg/149/149375.svg"/>
              <span>Calendario</span>
            </Link>

            <Link to="/stats">
              <img  width ="25" height = "25" src ="https://image.flaticon.com/icons/svg/478/478544.svg"/>
              <span>Estadisticas</span>
            </Link>

            <Link to="/team">
              <img  width ="25" height = "25" src ="https://image.flaticon.com/icons/svg/944/944039.svg"/>
              <span>Vendedores</span>
            </Link>

            <Link to="/chat">
              <img  width ="25" height = "25" src ="https://image.flaticon.com/icons/svg/485/485440.svg"/>
              <span>Posiciones</span>
            </Link>

            <Link to="/lines">
              <img  width ="25" height = "25" src ="https://image.flaticon.com/icons/svg/134/134808.svg"/>
              <span>Chat</span>
            </Link>
        </div>
        <Chat/>
      </div>
  );
}

export default AdminSideBar;
