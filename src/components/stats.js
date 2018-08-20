import React, {Component} from "react";
import ChartUsers from "./reusable/chartUsers";
import ChartProduct from "./reusable/chartProduct";
import ChartPrediction from "./reusable/chartPrediction";
import ChartPositions from "./reusable/chartPositions";
class Stats extends Component{

  constructor(props){
    super(props);
    this.state = { goal: 0, sales: 0 }
  }

  componentWillMount(){
    fetch("http://localhost:3000/api/team_info")
    .then(res => res.json())
    .then(response => {
      this.setState({goal: response.goal, sales: response.sales})
    })
  }

  render(){
    const {sales, goal} = this.state;
    return(
      <div className = "stats">
          <div className ="column">
            <div className ="card">
              <p className ="cardTitle">Meta</p>
              <p className ="bold">{goal} $</p>
              <p>{goal} $</p>
            </div>

            <div className ="card">
              <p className ="cardTitleB">Actual</p>
              <p className ="bold">{sales} $</p>
              <p >{sales} $</p>
            </div>

            <div className ="card ">
              <div className ="center">
                <ChartUsers/>
              </div>
            </div>
          </div>

          <div className ="column">
            <div className ="card">
              <p className ="black">Luz Maria</p>
              <p className ="first-place">1ro</p>
              <p>Llamada a prospecto</p>
              <p>Venta de equipo</p>
              <p>Venta de minisplit</p>
            </div>
            <div className ="card">
              <p className ="black">Roberto Sanchez</p>
              <p className ="last-place">5to</p>
              <p>Llamada a prospecto</p>
              <p>Venta de equipo</p>
              <p>Venta de minisplit</p>
            </div>
          </div>

          <div className ="column">
            <div className ="card">
              <div className ="center">
                <ChartPrediction/>
              </div>
            </div>
            <div className ="card ">
              <div className ="center">
                <ChartProduct/>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Stats;
