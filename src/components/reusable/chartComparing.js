import React, {Component} from "react";
import {Bar, Line} from "react-chartjs-2";

class ChartComparing extends Component {

  render(){
    return(
      <div>
        <Bar
          data = {{
              labels: [
              "Meta",
              this.props.vendorSelected
              ],
              datasets: [
                {
                  label: "Distancia para la meta",
                  data: [
                    this.props.goal,
                    this.props.vendorSales,
                  ],
                  backgroundColor: [
                    "rgba(255,99,132,0.6)",
                    "rgba(54,162,235,0.6)",
                  ]
                }
              ]
          }}
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
