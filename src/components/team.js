import React, {Component} from "react";
import ChartPositions from "./reusable/chartPositions";
import ChartComparing from "./reusable/chartComparing";
class Team extends Component{

  constructor(props){
    super(props);
    this.state = {userSelected: ""}
  }

  render(){
    return(
      <div className ="team">
        <div className ="user-info">
          <div className ="user-detail">
            <img className ="center" width ="40" height ="40" src ="http://www.skylightsearch.co.uk/wp-content/uploads/2017/01/Hadie-profile-pic-circle-1.png"/>
            <p className ="center"> Luz Maria Payan</p>

          </div>
          <div className ="user-data">
            <p className ="blue-text">1RO</p>
          </div>
          <div className ="user-data">
            <p className ="blue-text">7554 $</p>
          </div>
          <div className ="user-data">
            <p className ="blue-text"> 7950 pts</p>
          </div>
        </div>

        <div className ="stat-horizontal">
          <div className ="center">
            <ChartComparing/>
          </div>
        </div>

        <div className ="stat-horizontal">
          <div className ="center">
            <ChartComparing/>
          </div>
        </div>

      </div>
    );
  }
}


export default Team;
