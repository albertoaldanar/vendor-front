import React, {Component} from "react";

import ChartPrediction from "./reusable/chartPrediction";
import ChartPositions from "./reusable/chartPositions";
class TeamStats extends Component{
  render(){
    return(
      <div className ="stats-page">
        <div className ="stat-card">
          <ChartPositions/>
        </div>
      </div>
    );
  }
}

export default TeamStats;
