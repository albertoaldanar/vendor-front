import React, {Component} from "react";

class Settings extends Component{

  constructor(props){
    super(props);
    this.state = {
      unauthorizedSales: [],
      week: null,
      month: "",
      goal: 0
    }
  }

  renderSales(list){
    const sales = list.map(s => {
      return (
        <div className ="unauthorized-list">
          <div className ="each-list">
            <ul>
              <li key={s.id}>
                {s.brand}
              </li>
            </ul>
          </div>
        </div>
      );
    });
    return sales;
  }

  changeData(){
    const {month, goal, week} = this.state;

    return fetch("http://localhost:3000/authorize/", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "sale": {
          "authorized": true
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log("Success")
      })
      .catch((e) => console.log(e))
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
    const {unauthorizedSales} = this.state;

    return(
      <div>
        <h3 className ="sales-title">Ventas sin autorizar</h3>
        <div>
          {this.renderSales(unauthorizedSales)}
        </div>
      </div>
    );
  }
}

export default Settings;
