import React, {Component} from "react";
import {Doughnut} from "react-chartjs-2";

class ChartProduct extends Component{

  render(){
    let products = Object.keys(this.props.products)
    let sales = Object.values(this.props.products)

    return(
      <div>
        <Doughnut
          data = {{
              labels: products,
              datasets: [
                {
                  label: "Ventas",
                  data: sales,
                  backgroundColor: [
                    "#DC143C",
                    "#9ACD32",
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

export default ChartProduct;
