import React, {Component} from "react";
import {Line} from "react-chartjs-2";

class ChartPrediction extends Component{
  constructor(props){
    super(props);
    this.state = {
      data:{
        labels: ["Semana 1", "Semana 2", "Semena 3", "Semana 4"],
        datasets: [
          {
            label: "Meta",
            data: [
              184234,
              213333,
              224233,
              254233,
            ],
            fill: false,
            borderColor: "red",
            borderDash: [1,1],
            borderWidth: 3
          },
          {
          label: "Ventas",
            data: [
              165555,
              179549,
              225473,
              244834,
            ],
            fill: false,
            borderColor: "rgba(75,192,192,0.6)",
            backgroundColor:"rgba(75,192,192,0.6)",
            borderWidth: 3
          }
        ]
      }
    }
  }

  render(){
    return(
      <div>
        <Line
          data = {this.state.data}
          width= {240}
          height = {240}
          options = {{
            maintainAspectRatio: false,
            legend: {display: true},
            title: {
              display: true,
              text: "Proyección"
            }
          }}
        />
      </div>
    );
  }
}

export default ChartPrediction;
