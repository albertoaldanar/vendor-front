import React, {Component} from "react";
import ChartPositions from "./reusable/chartPositions";
import ChartComparing from "./reusable/chartComparing";
import Dropdown from 'react-dropdown'

const options = [
  { value: {name: "Alberto", age: 24}, label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' }
]

const defaultOption = options[0]

class Team extends Component{

  constructor(props){
    super(props);
    this.state = {userSelected: "", vendors: []}
  }

  componentWillMount(){
    return fetch("http://localhost:3000/api/team_info")
      .then(res => res.json())
      .then(response => {
        this.setState({vendors: response.vendors})
      })
  }

  onChange(item){
    this.setState({userSelected: item})
  }

  render(){
    console.log(this.state.userSelected)
    console.log(this.state.vendors)
    return(
      <div className ="team">
        <div className ="user-info">
          <div className ="user-detail">
            <img className ="center" width ="40" height ="40" src ="http://www.skylightsearch.co.uk/wp-content/uploads/2017/01/Hadie-profile-pic-circle-1.png"/>
            <p className ="center"> Luz Maria Payan</p>

          </div>
          <div className ="user-data">
            <p className ="blue-text">1RO</p>
          </div>
          <div className ="user-data">
            <p className ="blue-text">7554 $</p>
          </div>
          <div className ="user-data">
            <p className ="blue-text"> 7950 pts</p>
          </div>
        </div>

        <div className ="stat-horizontal">
          <div className ="center">
            <ChartComparing/>
          </div>
        </div>

        <div className ="stat-horizontal">
          <div className ="center">
            <ChartComparing/>
            <Dropdown options={options} onChange={this.onChange.bind(this)} value={defaultOption} placeholder="Select an option" />
          </div>
        </div>

      </div>
    );
  }
}


export default Team;
