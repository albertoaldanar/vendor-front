import React, {Component} from "react";

class Settings extends Component{

  constructor(props){
    super(props);
    this.state = {
      unauthorizedSales: []
    }
  }

  componentWillMount(){
    return fetch("http://localhost:3000/api/authorization")
      .then(response => response.json())
        .then(res => {
          this.setState({
            unauthorizedSales: res.unauthorized
          })
        })
      .catch(e => console.log(e))
  };

  render(){
    console.log(this.state.unauthorizedSales)
    return(
      <div>
        <p className = "center">Settings</p>
      </div>
    );
  }
}

export default Settings;
