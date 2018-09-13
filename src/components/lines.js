import React, {Component} from "react";
import ChartLines from "./reusable/chartLines";

class Lines extends Component{

  constructor(props){
    super(props);
    this.state = {
      week1: {},
      week2: {},
      week3: {},
      week4: {},
      vendors: []
    }
  }

  componentWillMount(){
    fetch("http://localhost:3000/api/week_stats")
    .then(res => res.json())
    .then(response => {
      this.setState({
        week1: response.week1,
        week2: response.week2,
        vendors: response.vendors
      })
    })
  }

  render(){
    const {week1, vendors, week2} = this.state;

    return(
      <div className = "white">
        <ChartLines week1 = {week1} week2 = {week2} vendors = {vendors}/>
      </div>
    );
  }
}


export default Lines;
