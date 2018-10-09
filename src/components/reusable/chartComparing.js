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
                  label: this.props.vendorSelected,
                  data: this.props.vendorSales,
                  backgroundColor: [
                    "#1E90FF",
                    "#1E90FF",
                    "#1E90FF",
                    "#1E90FF",
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
