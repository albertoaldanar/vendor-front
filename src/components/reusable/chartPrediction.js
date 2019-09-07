import React, {Component} from "react";
import {Line} from "react-chartjs-2";

//Hacer las intancias para que puedan consumirse en el ftin
class ChartPrediction extends Component{

  constructor(props){
    super(props);
    this.state = {
      projection: [],
      myTeam: []
    }
  }


  render(){

    const months = { 1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril", 5: "Mayo", 6: "Junio", 7: "Julio", 8: "Agosto", 9: "Septiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre" }

    const {projection, myTeam} = this.state;

    const monthIngresos = this.props.dataIngresos.map(x => {
      return months[x.key];
    })

    const dataIngresos = this.props.dataIngresos.map(x => {
      return x.value;
    })


    const dataEgresos = this.props.dataEgresos.map(x => {
      return x.value;
    })

    return(
      <div>
        <Line
          data = {{
            labels: monthIngresos,
            datasets: [
              {
                label: "Suma de utilidad",
                data: dataIngresos,
                fill: false,
                borderColor: "rgba(75,192,192,0.6)",
                backgroundColor:"rgba(75,192,192,0.6)",
                borderWidth: 3
              },
              {
              label: "Suma de costos",
                data: dataEgresos,
                fill: true,
                backgroundColor: "rgba(255, 25, 0, 0.5)",
                borderColor: "red" ,
                borderDash: [1,1],
                borderWidth: 3
              }
            ]
          }}
          width= {window.innerWidth * 0.85}
          height = {240}
          options = {{
            maintainAspectRatio: false,
            legend: {display: true, position: "bottom"},
            title: {
              display: true,
              text: "Crecimiento anual acumulado"
            }
          }}
        />
      </div>
    );
  }
}

export default ChartPrediction;
