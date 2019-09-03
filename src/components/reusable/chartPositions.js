import React, {Component} from "react";
import {Bar, Line, Pie, Doughnut, HorizontalBar} from "react-chartjs-2";


class ChartPositions extends Component {
  render(){

    // let vendors = this.props.vendors.map(vend => {
    //   return vend.name
    // })

    let clients = this.props.payByClient.map(x => {
        return x.cliente
    })

    let data = this.props.payByClient.map(x => {
        return (x.importe__sum / 30).toFixed(2)
    })
    // console.log(vendors)

    return(
      <div>
        <HorizontalBar
          data = {{
              labels: clients,
              datasets: [
                {
                  label: "$",
                  data: data,
                  backgroundColor: [
                    "rgba(255,99,132,0.6)",
                    "rgba(54,162,235,0.6)",
                    "rgba(255,206,86,0.6)",
                    "rgba(75,192,192,0.6)",
                    "rgba(255,99,132,0.6)",
                    "rgba(54,162,235,0.6)",
                    "rgba(255,206,86,0.6)",
                    "rgba(75,192,192,0.6)",
                    "rgba(255,99,132,0.6)",
                    "rgba(54,162,235,0.6)",
                    "rgba(255,206,86,0.6)",
                    "rgba(75,192,192,0.6)",
                    "rgba(255,99,132,0.6)",
                    "rgba(54,162,235,0.6)",
                    "rgba(255,206,86,0.6)",
                    "rgba(75,192,192,0.6)",
                    "rgba(255,99,132,0.6)",
                    "rgba(54,162,235,0.6)",
                    "rgba(255,206,86,0.6)",
                    "rgba(75,192,192,0.6)",
                  ]
                }
              ]
          }}
          width = {window.innerWidth * 0.85}
          height = {window.innerHeight- 95}
          options = {{
            maintainAspectRatio: true,
            legend: {display: false},
            title: {
              display: true,
              text: "Utilidad y perdida por recolección"
            },
            
          }}
        />
      </div>
    );
  }
}


export default ChartPositions;
