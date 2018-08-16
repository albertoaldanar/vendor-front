import React, {Component} from "react";
import ChartPositions from "./reusable/chartPositions";
class Team extends Component{

  constructor(props){
    super(props);
    this.state = {userSelected: ""}
  }

  render(){
    return(
      <div>
        <div className ="user-info">
          <div className ="user-data column-user">
            <img width ="60" height ="30" src ="http://www.skylightsearch.co.uk/wp-content/uploads/2017/01/Hadie-profile-pic-circle-1.png"/>
            <p>Luz Maria Payan</p>
          </div>
          <div className ="user-data">
            <p className ="blue-text">39 hrs</p>
          </div>
          <div className ="user-data">
            <p className ="blue-text">CDI</p>
          </div>
          <div className ="user-data">
            <p className ="blue-text"> 350 $</p>
          </div>
        </div>

        <div className ="user-infoB">
          <div className ="user-tasks">
            <div className ="devider">
              <p className ="date">Lunes 25 Agosto 2017</p>
              <p className ="hour">2:45 hr</p>
            </div>

            <p className ="task">Llamar seguimiento a Marriot</p>
            <p className ="task">Cerrar venta con Basa Pinturas</p>
            <p className ="task">Llamar 5 prospectos nuevos</p>
          </div>

          <div className ="pepe">
            <div className ="user-tasks" >
              <p className ="cardTitle">Posición</p>
              <p className ="bold">1RO</p>
            </div>
            <div className ="user-tasks" >
              <p className ="cardTitleB">Puntos</p>
              <p className ="bold">790</p>
            </div>
            <div className ="user-tasks" >
              <p className ="cardTitleC">Ventas</p>
              <p className ="bold">480 $</p>
            </div>
          </div>

          <div className ="user-tasks">
            <div className ="center">
              <ChartPositions/>
            </div>
          </div>
        </div>

        <div className ="finish">
        </div>

      </div>
    );
  }
}


export default Team;
