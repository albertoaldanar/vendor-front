import React, {Component} from "react";
import {Bar, Line, Pie, Doughnut} from "react-chartjs-2";


class ChartUsers extends Component {

  render(){
    let products = Object.keys(this.props.prod)
    let count = Object.values(this.props.prod)

    var i = 0

    var amount = count.map(x => {
      return i += x
    })

    const top = amount[amount.length - 1]

    var pct  = count.map(x => {
      return ((x / top) * 100).toFixed(2);
    })

    return(
      <div>
        <Pie
          data = {{
              labels: products,
              datasets: [
                {
                  label: "Ventas",
                  data: pct,
                  backgroundColor: [
                    "#00BFFF",
                    "#E6E6FA",
                    "#008080",
                    "rgba(75,192,192,0.6)"
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
              text: "Ventas por producto"
            }
          }}
        />
      </div>
    );
  }
}


export default ChartUsers;
