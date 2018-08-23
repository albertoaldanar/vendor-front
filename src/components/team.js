import React, {Component} from "react";
import ChartPositions from "./reusable/chartPositions";
import ChartComparing from "./reusable/chartComparing";
import Dropdown from 'react-dropdown'

class Team extends Component{

  constructor(props){
    super(props);
    this.state = {userSelected: "", vendors: []}
  }

  componentWillMount(){
    return fetch("http://localhost:3000/api/team_info")
      .then(res => res.json())
      .then(response => {
        this.setState({
          vendors: response.vendors,
          goal: response.goal
        })
      })
  }

  onChange(item){
    this.setState({userSelected: item})
  }

  getValues(){
    const {vendors} = this.state;

    return(
      vendors.map((vend, i ) => {
        return(
         { key: i, value: vend.sales, label: vend.name}
        );
      })
    )
  }

  render(){
    const {userSelected, goal} = this.state;
    const options = [
      { value: {name: "Alberto", age: 24}, label: 'One' },
      { value: 'two', label: 'Two' },
      { value: 'three', label: 'Three' }
    ]

    const defaultOption = options[0]
    console.log(this.state.userSelected.value, goal)

    return(
      <div className ="team">
        <div className ="user-info">
          <div className ="user-detail">
            <img className ="center" width ="40" height ="40" src ="http://www.skylightsearch.co.uk/wp-content/uploads/2017/01/Hadie-profile-pic-circle-1.png"/>
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
            <ChartComparing goal = {goal} vendorSales= {userSelected.value} vendorSelected ={userSelected.label}/>
            <Dropdown options={this.getValues()} onChange={this.onChange.bind(this)} value={userSelected} placeholder="Selecciona un vendedor" key ={userSelected}/>
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
