import React, {Component} from "react";
import {Line} from "react-chartjs-2";

class ChartLines extends Component{

  render(){
    let values = {
        "Carlos" :{
          week1: 1000,
          week2: 2400,
          week3: 1400
        },
        "Luzm" :{
          week1: 560,
          week2: 2600,
          week3: 2600
        },
        "Daniel" :{
          week1: 500,
          week2: 2600,
        }
      }

    let names = Object.keys(values);

    let all = Object.values(values);

    console.log(names, all)

    let vendors = this.props.vendors.map(vend => {
      return vend.name
    })

    let sales = this.props.vendors.map(s => {
      return s.sales
    })

    var w1 = Object.values(this.props.week1);
    var w2 = Object.values(this.props.week2);

    return(
      <div>
        <Line
          data = {{
              labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
              datasets: [
                {
                  label: vendors[0],
                  data: [
                    all[0].week1, all[0].week1 + all[0].week2, all[0].week1 + all[0].week2 + all[0].week3
                    // w1[0], w1[0] + w2[0]
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
                     // w1[1], w1[1] + w2[1]
                    all[1].week1, all[1].week1 + all[1].week2, all[1].week1 + all[1].week2 + all[1].week3
                  ],
                  fill: false,
                  borderColor: "rgba(75,192,192,0.6)",
                  backgroundColor:"rgba(75,192,192,0.6)",
                  borderWidth: 3
                },
                {
                  label:  vendors[2],
                  data: [
                     // w1[2], w1[2] + w2[2]
                     all[2].week1, all[2].week1 + all[2].week2, all[2].week1 + all[2].week2 + all[2].week3
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
