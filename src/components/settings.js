import React, {Component} from "react";
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import * as XLSX from "xlsx";

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

  editData(){
    return fetch("http://localhost:3000/edit_data/", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "data": {
          "week": this.state.week
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log("Success")
      })
      .catch((e) => console.log(e))
  }

  onChangeWeek(e){
    this.setState({week: e.target.value})
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

  // readExcelFile(){
  //   var name = f.name; 
  //   const reader = new FileReader();
  //   reader.onload = (evt) => {
  //       /* Parse data */
  //       const bstr = evt.target.result;
  //       const wb = XLSX.read(bstr, {type:'binary'});
  //       /* Get first worksheet */
  //       const wsname = wb.SheetNames[0];
  //       const ws = wb.Sheets[wsname];
  //       /* Convert array of arrays */
  //       const data = XLSX.utils.sheet_to_csv(ws, {header:1});
  //       /* Update state */
  //       console.log("Data>>>"+data);
  //   };

  //   reader.readAsBinaryString(f);
  // }

  render(){
    const {unauthorizedSales, week} = this.state;
    console.log(week);

    return(
        <FilePond server ="http://localhost:8000/csv_reader"/>
    );
  }
}

export default Settings;
