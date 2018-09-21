import React, {Component} from "react";
import {Line, Bar} from "react-chartjs-2";

class ChartLines extends Component{

  constructor(props){
    super(props);
  }

  render(){

    let names = Object.keys(this.props.weeks);

    return(
      <div>
        <Line
          data = {{
              labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
              datasets: [
                {
                  label: names[0],
                  data: this.props.result[0],
                  fill: false,
                  borderColor: [
                    "rgba(255,99,132,0.6)",
                  ],
                  borderDash: [1,1],
                  borderWidth: 3
                },

                {
                  label: names[1],
                  data: this.props.result[1],
                  fill: false,
                  borderColor: "rgba(75,192,192,0.6)",
                  backgroundColor:"rgba(75,192,192,0.6)",
                  borderWidth: 3
                },
                {
                  label: names[2],
                  data: this.props.result[2],
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
