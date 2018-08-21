import React, {Component} from "react";
import {Bar, Line, Pie, Doughnut} from "react-chartjs-2";


class ChartUsers extends Component {

  // getVendorNumbers(){
  //   this.props.vendors.map(vend => {
  //     return(
  //       vend.sales
  //     );
  //   })
  // }

  // getUserNames(){
  //   this.props.vendors.map(vend => {
  //     return(
  //       vend.sales
  //     );
  //   })
  // }


  constructor(props){
    super(props);
    this.state = {
      data:{
        labels: ["Carlos Baez","Luz Maria","Jose Beltran","Raul Jimex"],
        datasets: [
          {
            label: "Ventas",
            data: [
              234234,
              234233,
              434343,
              454944,
            ],
            backgroundColor: [
              "#4682B4",
              "rgba(54,162,235,0.6)",
              "#DC143C",
              "rgba(75,192,192,0.6)",
            ]
          }
        ]
      }
    }
  }
  render(){
    return(
      <div>
        <Pie
          data = {this.state.data}
          width = {240}
          height = {240}
          options = {{
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


export default ChartUsers;
