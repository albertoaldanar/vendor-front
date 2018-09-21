import React, {Component} from "react";
import ChartLines from "./reusable/chartLines";

class Lines extends Component{

  constructor(props){
    super(props);
    this.state = {
      weeks : {},
      result: [],

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
        <ChartLines weeks = {weeks} result = {result}/>
      </div>
    );
  }
}


export default Lines;
