import React, {Component} from "react";
import {Line} from "react-chartjs-2";

//Hacer las intancias para que puedan consumirse en el ftin
class ChartPrediction extends Component{

  constructor(props){
    super(props);
    this.state = {
      projection: []
    }
  }

  componentWillMount(){
    fetch("http://localhost:3000/api/projection")
    .then(response => response.json())
    .then( res =>  {
      this.setState({projection: res.projection})
    })
  }

  render(){
    const {projection} = this.state;
    return(
      <div>
        <Line
          data = {{
            labels: ["Semana 1", "Semana 2", "Semena 3", "Semana 4"],
            datasets: [
              {
                label: "Meta",
                data: projection,
                fill: false,
                borderColor: "red",
                borderDash: [1,1],
                borderWidth: 3
              },
              {
              label: "Ventas",
                data: [
                  165555,
                  179549,
                  225473,
                  244834,
                ],
                fill: false,
                borderColor: "rgba(75,192,192,0.6)",
                backgroundColor:"rgba(75,192,192,0.6)",
                borderWidth: 3
              }
            ]
          }}
          width= {240}
          height = {240}
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

export default ChartPrediction;
