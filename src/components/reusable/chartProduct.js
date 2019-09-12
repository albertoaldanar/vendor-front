import React, {Component} from "react";
import {Doughnut, Pie} from "react-chartjs-2";

class ChartProduct extends Component{

  render(){

    const monthEgresos = this.props.egreso.map(x => {
      return x.key;
    })

    const dataEgresos = this.props.egreso.map(x => {
      return x.value
    })

    return(
      <div>
        <Pie
          data = {{
              labels: monthEgresos,
              datasets: [
                {
                  label: "Ventas",
                  data: dataEgresos,
                  backgroundColor: [
                    "#00BFFF",
                    "#E6E6FA",
                    "#008080",
                    "rgba(75,192,192,0.6)",
                    "#DC143C",
                    "#FF8C00",
                    "#FFD700",
                    "#ADFF2F",
                    "#4B0082",
                    "#ADD8E6",
                    "#20B2AA",
                    "#BA55D3",
                    "#FFDEAD",
                    "#DB7093",
                    "#4169E1",
                    "#708090"
                  ]
                }
              ]
          }}
          width = {410} //240 tamaño normal
          height = {410}
          options = {{
            legend: {display: true, position: "bottom"},
            title: {
              display: true,
              text: this.props.title
            }
          }}
        />
      </div>
    );
  }
}

export default ChartProduct;
