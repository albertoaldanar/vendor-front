import React, {Component} from "react";
import {Bar, Line} from "react-chartjs-2";

class ChartComparing extends Component {

  render(){
    console.log(this.props.vendorSales)
    return(
      <div>
        <Bar
          data = {{
              labels:
                ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
              datasets: [
                {
                  label: "Meta",
                  data: [
                    this.props.goal, this.props.goal, this.props.goal, this.props.goal
                  ],
                  backgroundColor: [
                    "rgba(255,99,132,0.6)",
                    "rgba(255,99,132,0.6)",
                    "rgba(255,99,132,0.6)",
                    "rgba(255,99,132,0.6)",
                  ]
                },
                {
                  label: this.props.vendorSelected,
                  data: this.props.vendorSales,
                  backgroundColor: [
                    "rgba(54,162,235,0.6)",
                    "rgba(54,162,235,0.6)",
                    "rgba(54,162,235,0.6)",
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
