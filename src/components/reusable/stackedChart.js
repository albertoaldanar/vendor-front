import React, {Component} from "react";
import {Bar} from "react-chartjs-2";

class StackedChart extends Component{

  constructor(props){
    super(props);
    this.state = {
      bonatti: {importe__sum: 0}
    }
  }


  render(){


  const {oxxo, bonatti, otros, gastosBonatti, gastosOxxo, gastosTiendas, totalTiendas, gastosOtros} = this.props;

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
              text: "Utilidad por grupo de cliente"
        },

    }

    let data ={ 
      	datasets:[

	      	{
		        label: 'Gastos',
		          data :[gastosBonatti, gastosOxxo, gastosOtros ],
		          backgroundColor: [
		                    "rgba(255,0,0,0.6)",
                        "rgba(255,0,0,0.6)",
                        "rgba(255,0,0,0.6)",

		          ]
	        },
		    {
		          label: 'Utilidades',
		          data:  [bonatti, oxxo, otros ],
		          backgroundColor: [
		                "rgba(0,153,204,0.6)",
                    "rgba(0,153,204,0.6)",
                    "rgba(0,153,204,0.6)",

		          ]  
	        },
    	],
      labels:['Bonatti', "Oxxo", "Tiendas"]
    }

    return(
    	<Bar data={data} options={options} />
    );
  }
}

export default StackedChart;
