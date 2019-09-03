import React, {Component} from "react";
import ChartLines from "./reusable/chartLines";
import ChartPositions from "./reusable/chartPositions";

class Lines extends Component{

  constructor(props){
    super(props);
    this.state = {
      weeks : {},
      result: []
    }
  }

  componentWillMount(){
    fetch("http://localhost:3000/api/week_stats")
    .then(res => res.json())
    .then(response => {
      this.setState({
        weeks: response.weeks,
        result: response.result
      })
    })
  }

  render(){
    const {weeks,result} = this.state;

    return(
      <div className = "white">
        <p className = "title"> Unidad y perdidas por recolección</p>
          <div className ="card">
              <div className ="center">
                <ChartPositions/>
              </div>
          </div>
      </div>
    );
  }
}


export default Lines;
