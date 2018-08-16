import React, {Component} from "react";
import {Bar, Line, Pie, Doughnut} from "react-chartjs-2";


class ChartPositions extends Component {

  constructor(props){
    super(props);
    this.state = {
      data:{
        labels: ["Carlos Baez","Luz Maria","Jose Beltran","Raul Jimex", "Alberto Aldana", "Raul Ortiz", "Geronimo", "Gerardo Ruiz"],
        datasets: [
          {
            label: "Puntos",
            data: [
              234234,
              234233,
              434343,
              454944,
              454944,
              423423,
              459435,
              473644,
            ],
            backgroundColor: [
              "rgba(255,99,132,0.6)",
              "rgba(54,162,235,0.6)",
              "rgba(255,206,86,0.6)",
              "rgba(75,192,192,0.6)",
              "rgba(289,300,96,0.6)",
              "rgba(178,206,86,0.6)",
              "rgba(190,150,86,0.6)",
              "rgba(99,132,86,0.6)",
            ]
          }
        ]
      }
    }
  }
  render(){
    return(
      <div>
        <Bar
          data = {this.state.data}
          width = {window.innerWidth}
          height = {window.innerHeight- 95}
          options = {{
            maintainAspectRatio: false,
            legend: {display: false},
            title: {
              display: true,
              text: "Total ventas"
            }
          }}
        />
      </div>
    );
  }
}


export default ChartPositions;
