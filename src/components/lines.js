import React, {Component} from "react";
import ChartLines from "./reusable/chartLines";

class Lines extends Component{

  constructor(props){
    super(props);
    this.state = {
      week1: {},
      vendors: []
    }
  }

  componentWillMount(){
    fetch("http://localhost:3000/api/week_stats")
    .then(res => res.json())
    .then(response => {
      this.setState({
        week1: response.week1,
        vendors: response.vendors
      })
    })
  }

  render(){
    const {week1, vendors} = this.state;

    return(
      <div className = "white">
        <ChartLines week = {week1} vendors = {vendors}/>
      </div>
    );
  }
}


export default Lines;
