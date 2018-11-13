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
       goal: 0,
       sales: 0
    }
  }

  componentWillMount(){
    return fetch("http://localhost:3000/api/week_stats")
      .then(res => res.json())
      .then(response => {
        this.setState({
          weeks: response.weeks,
          result: response.result,
          goal: response.goal,
          sales: response.sales
        })
      })
  }


  onChange(item){
    this.setState({userSelected: item})
  }

  getPct(value, goal){
    return (( value / (goal / 4) ) * 100).toFixed(2);
  }

  render(){
    const { userSelected, goal, result, sales } = this.state;

    let names = Object.keys(this.state.weeks)
    // let sales = Object.values(this.state.weeks)
    let indGoal = goal / 4

    var last_element = userSelected.value[userSelected.value.length - 1];

    //Si quieres quitar el acomulado: Cambiar result por sales

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
            <p className ="center user-label"> {userSelected.label}</p>

          </div>
          <div className ="user-data">
            <p className ="blue-text"> {indGoal} $</p>
          </div>
          <div className ="user-data">
            <p className ="blue-text"> {last_element} $</p>
          </div>
          <div className ="user-data">
            <p className ="blue-text"> {this.getPct(last_element, goal)} %</p>
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
