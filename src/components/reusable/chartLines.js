import React, {Component} from "react";
import {Line} from "react-chartjs-2";

class ChartLines extends Component{

  constructor(props){
    super(props);
    this.state = {x: []}
  }

  render(){


    let names = Object.keys(this.props.weeks);

    var vend1 = this.props.example[Object.keys(this.props.example)[0]];
    var vend2 = this.props.example[Object.keys(this.props.example)[1]];
    var vend3 = this.props.example[Object.keys(this.props.example)[2]];

    return(
      <div>
        <Line
          data = {{
              labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
              datasets: [
                {
                  label: names[0],
                  data: vend1,
                  fill: false,
                  borderColor: [
                    "rgba(255,99,132,0.6)",
                  ],
                  borderDash: [1,1],
                  borderWidth: 3
                },

                {
                  label: names[1],
                  data: vend2,
                  fill: false,
                  borderColor: "rgba(75,192,192,0.6)",
                  backgroundColor:"rgba(75,192,192,0.6)",
                  borderWidth: 3
                },
                {
                  label:  names[2],
                  data: vend3,
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
