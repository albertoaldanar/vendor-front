import React, {Component} from "react";
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import * as XLSX from "xlsx";
import CSVReader from 'react-csv-reader';
import * as firebase from 'firebase';

class Settings extends Component{

  constructor(props){
    super(props);
    this.state = {
      unauthorizedSales: [],
      week: null,
      month: "",
      goal: 0, 
      ingresos: [{}],  loaded: false, type: ""
    }

    if(!firebase.apps.length){
      const firebaseConfig = {
        apiKey: "AIzaSyD3G-zK6USRWEAJy1_dtHdqZZb_GWDmifw",
        authDomain: "serecsin-1533314943191.firebaseapp.com",
        databaseURL: "https://serecsin-1533314943191.firebaseio.com",
        projectId: "serecsin-1533314943191",
        storageBucket: "",
        messagingSenderId: "1091946178343",
        appId: "1:1091946178343:web:68af7c6bb70c4584acab02"
      };

      this.dataBase = firebase.initializeApp(firebaseConfig);
    }
  }


  onChangeWeek(e){
    this.setState({week: e.target.value})
  }


  showData(){
    const {ingresos} = this.state;
    const months = { 1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril", 5: "Mayo", 6: "Junio", 7: "Julio", 8: "Agosto", 9: "Septiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre" }

    if(this.state.type =="Ingreso"){
      return ingresos.map(item => {
        return (
            <div className = "each-list">
              <p className ="center">{item.cliente}</p>
              <p className ="center">{item.importe} </p>
              <p className ="center">{item.lugar} </p>
              <p className ="center">{months[item.mes]} </p>
              <p className ="center">{item.año} </p>
              <p className ="center">{item.adeudoMes} </p>
              <p className ="center">{item.adeudoAño} </p>
            </div>
        );
      })
    } else {
      return ingresos.map(item => {
        return (
            <div className = "each-list">
              <p className ="center">{item.cliente}</p>
              <p className ="center">{item.importe} </p>
              <p className ="center">{item.lugar} </p>
              <p className ="center">{months[item.mes]} </p>
              <p className ="center">{item.año} </p>
              <p className ="center">{item.genero} </p>
            </div>
        );
      })
    }
  }

  changeData(list){
    this.setState({ingresos: list})
  }

  sendToFirestore(){

      const dbIngreso = firebase.firestore().collection('Ingresos');
      const dbEgreso = firebase.firestore().collection('egreso');

      return this.state.ingresos.map(x => {
        if(this.state.type == "Egreso"){
          dbEgreso.add({
            cliente: x.cliente, 
            importe: Number(x.importe), 
            lugar: x.lugar, 
            mes:  Number(x.mes), 
            año:  Number(x.año), 
            concepto: x.concepto, 
            genero:  x.genero
          });

        } else {
            dbIngreso.add({
              cliente: x.cliente, 
              importe: Number(x.importe), 
              lugar: x.lugar, 
              mes:  Number(x.mes), 
              año:  Number(x.año), 
              adeudoMes: x.adeudoMes, 
              adeudoAño:  x.adeudoAño
            });
        }
        this.setState({ingresos: [{}], loaded: true })
      })

  }

  onLoad(response){
      console.log(response);
      response.shift();

      const userList = [];

      for (var i = 0; i < response.length; i++) {
            if(response[i][0] == "Ingreso"){
              this.setState({type: "Ingreso"});

              const cliente = response[i][1];
              const importe = Number(response[i][2]);
              const lugar = response[i][3];
              const mes = Number(response[i][4]);
              const año = Number(response[i][5]);
              const adeudoMes = Number(response[i][6]);
              const adeudoAño = Number(response[i][7]);

              const newUser = { cliente, importe, lugar, mes, año, adeudoMes, adeudoAño };
            
              userList.push(newUser);
            } else {
              this.setState({type: "Egreso"});

              const cliente = response[i][1];
              const importe = Number(response[i][2]);
              const lugar = response[i][3];
              const mes = Number(response[i][4]);
              const año = Number(response[i][5]);
              const genero = response[i][6];
              const concepto = response[i][7];

              const newUser = { cliente, importe, lugar, mes, año, genero, concepto };
            
              userList.push(newUser);
            }
      } 
      
      this.changeData(userList);
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
    console.log(this.state.ingresos, this.state.type);

    return( 
      <div>
        <CSVReader
          cssClass="csv-reader-input"
          label="Archivo en CSV"
          onFileLoaded={this.onLoad.bind(this)}
          onError={this.handleDarkSideForce}
          inputId="ObiWan"
          inputStyle={{color: 'gray'}}
        />

        {this.showData()}

        {
          this.state.ingresos.length > 1  ?
          <button onClick= {this.sendToFirestore.bind(this)}>
              Registrar archivos
          </button> :
          null
        }
      </div>
    );
  }
}

export default Settings;
