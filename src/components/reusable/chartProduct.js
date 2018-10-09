import React, {Component} from "react";
import {Doughnut, Pie} from "react-chartjs-2";

class ChartProduct extends Component{

  render(){
    let products = Object.keys(this.props.products)
    let sales = Object.values(this.props.products)

    return(
      <div>
        <Pie
          data = {{
              labels: products,
              datasets: [
                {
                  label: "Ventas",
                  data: sales,
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
