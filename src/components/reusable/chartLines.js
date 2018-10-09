import React, {Component} from "react";
import {Line, Bar} from "react-chartjs-2";

class ChartLines extends Component{

  constructor(props){
    super(props);
  }

  render(){

    let names = Object.keys(this.props.weeks);
    let stats = Object.values(this.props.weeks);

    //Si es el acumulado, poner this.props.result en todas las datas

    return(
      <div>
        <Line
          data = {{
              labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
              datasets: [
                {
                  label: names[0],
                  data: stats[0],
                  fill: false,
                  borderColor: [
                    "blue",
                  ],
                  borderDash: [1,1],
                  borderWidth: 3
                },

                {
                  label: names[1],
                  data: stats[1],
                  fill: false,
                  borderColor: "orange",
                  backgroundColor:"orange",
                  borderWidth: 3
                },
                {
                  label: names[2],
                  data: stats[2],
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
