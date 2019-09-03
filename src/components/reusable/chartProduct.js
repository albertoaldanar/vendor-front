import React, {Component} from "react";
import {Doughnut, Pie} from "react-chartjs-2";

class ChartProduct extends Component{

  render(){

    const monthEgresos = this.props.egreso.map(x => {
      return x.genero;
    })

    const dataEgresos = this.props.egreso.map(x => {
      return x.importe__sum;
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
                    "#00BFFF",
                    "#E6E6FA",
                    "#008080",
                    "rgba(75,192,192,0.6)",
                    "#00BFFF",
                    "#E6E6FA",
                    "#008080",
                    "rgba(75,192,192,0.6)"
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
