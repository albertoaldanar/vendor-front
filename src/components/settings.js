import React, {Component} from "react";
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import * as XLSX from "xlsx";
import CSVReader from 'react-csv-reader';
import * as firebase from 'firebase';
// import { SegmentedControl } from 'segmented-control-react';


class Settings extends Component{

  constructor(props){
    super(props);
    this.state = {
      unauthorizedSales: [],
      week: null,
      month: "",
      goal: 0, 
      ingresos: [{}],  loaded: false, type: "", message: "", ingresosThisMonth: [[]], months: { 1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril", 5: "Mayo", 6: "Junio", 7: "Julio", 8: "Agosto", 9: "Septiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre" }
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


  fetchData(){
    const db = firebase.firestore()

    var today = new Date();
    var dd = today.getDate();
    var mm = 1

    var year = new Date().getFullYear();

    const arrayI = []
    let ingRef = db.collection('Ingresos').where('año', '==', year).orderBy("mes").get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          arrayI.push(doc.data());

          this.setState({ingresosThisMonth: arrayI, ready: true});
        });
      })
  }


  componentWillMount(){
      return this.fetchData();
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
      const dbClientesGanados = firebase.firestore().collection('clientesGanados');
      const dbClientesPerdidos = firebase.firestore().collection('clientesPerdidos');

      return this.state.ingresos.map(x => {
        if(this.state.type == "Egreso"){
          dbEgreso.add({
            cliente: x.cliente, 
            importe: Number(x.importe), 
            lugar: x.lugar, 
            mes:  Number(x.mes), 
            año:  Number(x.año), 
            concepto: x.concepto, 
            genero:  x.genero, 
            concepto: x.concepto, 
            cantidad: x.cantidad, 
            metodoPago: x.metodoPago, 
            cuentaOrigen: x.cuentaOrigen, 
            formaPago: x.formaPago, 
            cfdi: x.cfdi, 
            folio: x.folio
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
            
            if(x.clienteGanado!== ""){
              dbClientesGanados.add({
                cliente: x.clienteGanado, 
                año: Number(x.año), 
                mes: Number(x.mes)
              });
            }

            if(x.clientePerdido!== ""){
              dbClientesPerdidos.add({
                cliente: x.clientePerdido, 
                año: Number(x.año), 
                mes: Number(x.mes)
              });
            }
        }
        this.setState({ingresos: [{}], loaded: true, message: "Archivo enviado exitosamente a la base de datos :)" })
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
              const clienteGanado = response[i][8];
              const clientePerdido = response[i][9];

              const newUser = { cliente, importe, lugar, mes, año, adeudoMes, adeudoAño, clienteGanado, clientePerdido };
            
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
              const cantidad = response[i][8];
              const metodoPago = response[i][9];
              const cuentaOrigen = response[i][10];
              const formaPago = response[i][11];
              const cfdi = response[i][12];
              const folio = response[i][13];


              const newUser = { cliente, importe, lugar, mes, año, genero, concepto, cantidad, metodoPago, cuentaOrigen, formaPago, cfdi, folio };
            
              userList.push(newUser);
            }
      } 
      
      this.changeData(userList);
  }


  render(){
    const {unauthorizedSales, week} = this.state;

    const segments = [
      { name: 'All' },
      { name: 'Unread', disabled: true },
      { name: 'Drafts' },
      { name: 'Trash' },
      { name: 'Pins' }
    ];

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
        <p className ="top">{this.state.message}</p>

        {
          this.state.ingresos.length > 1  ?
          <button onClick= {this.sendToFirestore.bind(this)}>
              Registrar archivos
          </button> :
          null
        }

        <div className ="card">
            <h2>Best movies of the year</h2>
            <label htmlFor="movies">Select Year</label>
            <select id="movies" className="select" onChange={this.fetchData.bind(this)}>
              <option defaultValue="" disabled>
                Select your option
              </option>
              {this.state.ingresosThisMonth.map((item, index) => {
                return (
                  <option key={index} value={item.cliente}>
                    {item.cliente}
                  </option>
                );
              })}
            </select>
        </div>
      </div>
    );
  }
}



export default Settings;
