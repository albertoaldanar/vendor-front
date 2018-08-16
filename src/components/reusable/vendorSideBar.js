import React from "react";
import {Link} from "react-router-dom";
import Chat from "../chat";
const VendorSideBar = () => {
  return(
      <div>
          <div className="side-nav">
            <Link to="/calendar">
              <i className ="fa fa-calendar"></i>
              <span>Calendario</span>
            </Link>

            <Link to="/chat">
              <i className ="fa fa-comment"></i>
              <span>Chat</span>
            </Link>

            <Link to="/team">
              <i className ="fa fa-users"></i>
              <span>Equipo</span>
            </Link>

            <a href="#">
              <i className ="fa fa-cogs"></i>
              <span>Pepe</span>
            </a>
        </div>

        <Chat/>
      </div>
  );
}


export default VendorSideBar;
