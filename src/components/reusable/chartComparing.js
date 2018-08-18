import React, {Component} from "react";
import {Bar, Line} from "react-chartjs-2";


class ChartComparing extends Component {

  constructor(props){
    super(props);
    this.state = {
      data:{
        labels: ["Meta","Luz Maria"],
        datasets: [
          {
            label: "Distancia para la meta",
            data: [
              234234,
              184233,
            ],
            backgroundColor: [
              "rgba(255,99,132,0.6)",
              "rgba(54,162,235,0.6)",
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
          height = {150}
          options = {{
            maintainAspectRatio: false,
            legend: {display: false},
            title: {
              display: true,
              text: "Meta"
            },
            type: "horizontalBar"
          }}
        />
      </div>
    );
  }
}


export default ChartComparing;
