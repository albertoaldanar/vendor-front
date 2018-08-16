import React, {Component} from "react";
import {Doughnut} from "react-chartjs-2";
class ChartProduct extends Component{

  constructor(props){
    super(props);
    this.state = {
      data:{
        labels: ["Minisplit","Paquetes","VRF",],
        datasets: [
          {
            label: "Ventas",
            data: [
              234234,
              234233,
              434343,
            ],
            backgroundColor: [
              "#DC143C",
              "#9ACD32",
              "#008080",
            ]
          }
        ]
      }
    }
  }
  render(){
    return(
      <div>
        <Doughnut
          data = {this.state.data}
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
