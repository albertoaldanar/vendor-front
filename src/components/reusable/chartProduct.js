import React, {Component} from "react";
import {Doughnut, Pie} from "react-chartjs-2";

class ChartProduct extends Component{

  render(){
    let products = Object.keys(this.props.products)
    let sales = Object.values(this.props.products)
    var i = 0

    var amount = sales.map(x => {
      return i += x
    })

    const top = amount[amount.length - 1]

    var pct  = sales.map(x => {
      return ((x / top) * 100).toFixed(2);
    })


    console.log(pct)

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
              text: "Utilidad por producto"
            }
          }}
        />
      </div>
    );
  }
}

export default ChartProduct;
