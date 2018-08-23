import React, {Component} from "react";
import ChartPrediction from "./reusable/chartPrediction";
import ChartPositions from "./reusable/chartPositions";


class TeamStats extends Component{

  constructor(props){
    super(props);
    this.state = {vendors: []}
  }

  componentWillMount(){
    return fetch("http://localhost:3000/api/team_info")
      .then(res => res.json())
      .then(response => {
        this.setState({
          vendors: response.vendors,
        })
      })
  }

  render(){
    const {vendors} = this.state;

    return(
      <div className ="stats-page">
        <div className ="stat-card">
          <div className ="center">
            <ChartPositions vendors = {vendors}/>
          </div>
        </div>
      </div>
    );
  }
}

export default TeamStats;
