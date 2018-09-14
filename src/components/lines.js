import React, {Component} from "react";
import ChartLines from "./reusable/chartLines";

class Lines extends Component{

  constructor(props){
    super(props);
    this.state = {
      weeks : {},
      vendors: []
    }
  }

  componentWillMount(){
    fetch("http://localhost:3000/api/week_stats")
    .then(res => res.json())
    .then(response => {
      this.setState({
        weeks: response.weeks,
        vendors: response.vendors
      })
    })
  }

  render(){
    const {weeks, vendors} = this.state;

    return(
      <div className = "white">
        <ChartLines weeks = {weeks} vendors = {vendors}/>
      </div>
    );
  }
}


export default Lines;
