import React, {Component} from "react";
import {Line} from "react-chartjs-2";

class ChartLines extends Component{

  render(){
    let values = {
        "Carlos" :{
          week1: 1000,
          week2: 2400
        },
        "Luzm" :{
          week1: 560,
          week2: 2600
        },
        "Daniel" :{
          week1: 500,
          week2: 2600,
        }
      }

    let names = Object.keys(this.props.weeks);

    let all = Object.values(values);
    let x = Object.values(this.props.weeks);

    console.log(Object.values(this.props.weeks))

    return(
      <div>
        <Line
          data = {{
              labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
              datasets: [
                {
                  label: names[0],
                  data: [
                    all[0].week1, all[0].week1 + all[0].week2
                  ],
                  fill: false,
                  borderColor: [
                    "rgba(255,99,132,0.6)",
                  ],
                  borderDash: [1,1],
                  borderWidth: 3
                },

                {
                  label: names[1],
                  data: [
                    all[1].week1, all[1].week1 + all[1].week2
                  ],
                  fill: false,
                  borderColor: "rgba(75,192,192,0.6)",
                  backgroundColor:"rgba(75,192,192,0.6)",
                  borderWidth: 3
                },
                {
                  label:  names[2],
                  data: [
                     all[2].week1, all[2].week1 + all[2].week2
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
