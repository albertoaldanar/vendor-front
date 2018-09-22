import React, {Component} from "react";
import ChartPositions from "./reusable/chartPositions";
import ChartComparing from "./reusable/chartComparing";
import Dropdown from 'react-dropdown';

class Team extends Component{

  constructor(props){
    super(props);
    this.state = {
      userSelected: {
        value: [0,0,0,0],
        label: "Elige un vendedor"
      },
       weeks: [],
       result: [],
       goal: 0}
  }

  componentWillMount(){
    return fetch("http://localhost:3000/api/week_stats")
      .then(res => res.json())
      .then(response => {
        this.setState({
          weeks: response.weeks,
          result: response.result,
          goal: response.goal
        })
      })
  }


  onChange(item){
    this.setState({userSelected: item})
  }

  render(){
    const {userSelected, goal, result} = this.state;

    let names = Object.keys(this.state.weeks)

    const options = [
      { value: result[0], label: names[0] },
      { value: result[1], label: names[1] },
      { value: result[2], label: names[2] },
    ]

    return(
      <div className ="team">
        <div className ="user-info">
          <div className ="user-detail">
            <img className ="icon-profile" width ="60" height = "50" src ="https://png.icons8.com/dotty/2x/administrator-male.png"/>
            <p className ="center"> {userSelected.label}</p>

          </div>
          <div className ="user-data">
            <p className ="blue-text">1RO</p>
          </div>
          <div className ="user-data">
            <p className ="blue-text">{userSelected.value}</p>
          </div>
          <div className ="user-data">
            <p className ="blue-text"> 7950 pts</p>
          </div>
        </div>

        <div className ="stat-horizontal">
          <div className ="center">
            <ChartComparing goal = {goal} vendorSales= {this.state.userSelected.value} vendorSelected ={userSelected.label}/>
            <Dropdown options={options} onChange={this.onChange.bind(this)} value={userSelected} placeholder="Selecciona un vendedor" key ={userSelected}/>
          </div>
        </div>

        <div className ="stat-horizontal">
          <div className ="center">
            <ChartComparing/>
          </div>
        </div>

      </div>
    );
  }
}


export default Team;
