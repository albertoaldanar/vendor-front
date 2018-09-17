import React, {Component} from "react";
import ChartLines from "./reusable/chartLines";

class Lines extends Component{

constructor(props){
    super(props);
    this.state = {
      weeks : {},
      example: {}
    }
  }

  componentWillMount(){
    fetch("http://192.168.1.68:3000/api/week_stats")
    .then(res => res.json())
    .then(response => {
      this.setState({
        weeks: response.weeks,
        example: response.example
      })
    })
  }

  render(){
    const {weeks, example} = this.state;

    return(
      <div className = "white">
        <ChartLines example= {example} weeks = {weeks}/>
      </div>
    );
  }
}


export default Lines;
