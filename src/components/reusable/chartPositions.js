import React, {Component} from "react";
import {Bar, Line, Pie, Doughnut} from "react-chartjs-2";


class ChartPositions extends Component {
  render(){

    let vendors = this.props.vendors.map(vend => {
      return vend.name
    })

    let sales = this.props.vendors.map(vend => {
      return vend.sales
    })

    return(
      <div>
        <Bar
          data = {{
              labels: vendors,
              datasets: [
                {
                  label: "Puntos",
                  data: sales,
                  backgroundColor: [
                    "rgba(255,99,132,0.6)",
                    "rgba(54,162,235,0.6)",
                    "rgba(255,206,86,0.6)",
                    "rgba(75,192,192,0.6)",
                  ]
                }
              ]
          }}
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
