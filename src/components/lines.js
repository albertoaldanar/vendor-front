import React, {Component} from "react";
import ChartLines from "./reusable/chartLines";

class Lines extends Component{

  constructor(props){
    super(props);
    this.state = {
      vendors: [],
      week: 1
    }
  }

  componentWillMount(){
    fetch("http://localhost:3000/api/team_info")
    .then(res => res.json())
    .then(response => {
      this.setState({vendors: response.vendors})
    })
  }

  render(){
    const {vendors} = this.state;
    return(
      <div className = "white">
        <ChartLines vendors = {vendors}/>
      </div>
    );
  }
}


export default Lines;
