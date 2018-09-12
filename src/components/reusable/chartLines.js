import React, {Component} from "react";
import {Line} from "react-chartjs-2";

class ChartLines extends Component{

  render(){

    let vendors = this.props.vendors.map(vend => {
      return vend.name
    })

    let sales = this.props.vendors.map(vend => {
      return vend.sales
    })


    console.log(vendors, sales)
    return(
      <div>
        <Line
          data = {{
              labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
              datasets: [
                {
                  label: vendors[0],
                  data:[
                    sales[0]
                  ],
                  fill: false,
                  borderColor: [
                  "rgba(255,99,132,0.6)",
                  ],
                  borderDash: [1,1],
                  borderWidth: 3
                },

                {
                  label: vendors[1],
                  data: [
                    sales[1], 24000
                  ],
                  fill: false,
                  borderColor: "rgba(75,192,192,0.6)",
                  backgroundColor:"rgba(75,192,192,0.6)",
                  borderWidth: 3
                },
                {
                  label:  vendors[2],
                  data: [
                    sales[2], 21000
                  ],
                  fill: false,
                  borderColor: "green",
                  borderDash: [1,1],
                  borderWidth: 3
                }
              ]
          }}
          width= {240}
          height = {window.innerHeight - 100}
          options = {{
            maintainAspectRatio: false,
            legend: {display: true},
            title: {
              display: true,
              text: "Proyección"
            }
          }}
        />
      </div>
    );
  }
}

export default ChartLines;
