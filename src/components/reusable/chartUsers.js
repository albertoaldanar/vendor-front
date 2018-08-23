import React, {Component} from "react";
import {Bar, Line, Pie, Doughnut} from "react-chartjs-2";


class ChartUsers extends Component {

  render(){
    let vendors = this.props.vendors.map(vend => {
      return vend.name
    })

    let sales = this.props.vendors.map(vend => {
      return vend.sales
    })

    return(
      <div>
        <Pie
          data = {{
              labels: vendors,
              datasets: [
                {
                  label: "Ventas",
                  data: sales,
                  backgroundColor: [
                    "#4682B4",
                    "rgba(54,162,235,0.6)",
                    "#DC143C",
                    "rgba(75,192,192,0.6)",
                  ]
                }
              ]
          }}
          width = {240}
          height = {240}
          options = {{
            legend: {display: false},
            title: {
              display: true,
              text: "Ventas en Porcentaje"
            }
          }}
        />
      </div>
    );
  }
}


export default ChartUsers;
