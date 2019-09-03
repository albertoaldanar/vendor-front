import React, {Component} from "react";
import {HorizontalBar} from "react-chartjs-2";

class ChartTotals extends Component{

  constructor(props){
    super(props);
  }

  render(){

 	const options = {
       scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        },
        title: {
              display: true,
              text: "Estadisticas del mes"
        },

    }

     const months = { 1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril", 5: "Mayo", 6: "Junio", 7: "Julio", 8: "Agosto", 9: "Septiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre" }

    let data ={ 
      	datasets:[

	      	{
		        label: 'Gastos',
		          data :[this.props.totalEgresos],
		          backgroundColor: [
		                    "rgba(255,0,0,0.6)",
		          ]
	        },
		    {
		          label: 'Utilidades',
		          data:  [this.props.totalIngresos],
		          backgroundColor: [
		                "rgba(0,153,204,0.6)",
		          ]  
	        },
    	],
      labels:[months[this.props.month]]
    }

    return(
    	<HorizontalBar data={data} options={options} />
    );
  }
}

export default ChartTotals;