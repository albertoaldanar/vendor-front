import React, {Component} from "react";
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import * as XLSX from "xlsx";
import CSVReader from 'react-csv-reader';
import * as firebase from 'firebase';
// import { SegmentedControl } from 'segmented-control-react';
import * as jsPDF from 'jspdf'
import html2canvas from "html2canvas";
import Modal from 'react-modal';


class Settings extends Component{

  constructor(props){
    super(props);
    this.state = {
      unauthorizedSales: [],
      week: null,
      month: "",
      goal: 0, 
      year: new Date().getFullYear(), month: new Date().getMonth() + 1, allStops: [], momments: null, otherArray: [{}], modalShow: false,
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

  componentWillMount(){
      return this.fetchData();
  }

  openModal() {
    this.setState({modalShow: true});
  }

  fetchData(){
    const db = firebase.firestore()

    const par = [];
    let parad = db.collection('parada').where('año', '==', this.state.year).where("mes", "==", this.state.month).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          par.push(doc.data());
          this.setState({allStops: par});

          // let counts = par.reduce((prev, curr) => {
          //       let count = prev.get(curr.mes) || 0;
          //       prev.set(curr.mes, curr.length);
          //       return prev;
          //     }, new Map());

          //     // then, map your counts object back to an array
          //     let reducedObjArr = [...counts].map(([key, value]) => {
          //       return {key, value}
          //     })
          //     this.setState({paradasCount: reducedObjArr});

          // var counts = {};
          // par.forEach(x => { 
          //   counts[x.client] = (counts[x.client] || 0) +1 ;
          // });

          // this.setState({paradasCount: counts})
        });
      })
  }


  getDocReady(){

        const functionWithPromise = item => {
            console.log(item)
            this.setState({momments: item})
        }


        const iterateArray = item => {
                this.setState({otherArray: item})
        }

        const anAsyncFunction = async item => {
                return await functionWithPromise(item)
        }

        const getData = async (list) => {
                return await Promise.all(list.map(item => anAsyncFunction(item)))
        }

        const groupBy = key => array =>
            array.reduce((objectsByKeyValue, obj) => {
              const value = obj[key];

              objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);

              var objectFormat = Object.entries(objectsByKeyValue);

              var clients = objectFormat.map(x => {
                  return {"Key": x[0], "value": x[1]}
              });

              console.log(objectFormat)

              const data = getData(objectFormat)

              const data2 = iterateArray(clients);
              // console.log(objectsByKeyValue);

              // console.log(clients);

              return objectsByKeyValue;

        }, {});

        const groupByClient = groupBy('client');

        const onlyClientStops = this.state.allStops.filter(x => x.client != "INCIDENTE" && x.client!= "BASURA" && x.client!= "GASOLINA");

       
        const result = JSON.stringify({
            objectsByClient: groupByClient(onlyClientStops),
        }, null, 2); 

        console.log(result); 

        this.setState({modalShow: true})
  }


  printDocument() {
    const input = document.getElementById('divToPrint');
    const months = { 1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril", 5: "Mayo", 6: "Junio", 7: "Julio", 8: "Agosto", 9: "Septiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre" };

    const onlyClientStops = this.state.allStops.filter(x => x.client != "INCIDENTE" && x.client!= "BASURA" && x.client!= "GASOLINA");
    console.log(onlyClientStops);
          var count = 1;

          this.state.otherArray.map((x, index) => {
              
              console.log(x.Key);
              html2canvas(input)
                .then((canvas) => {
                  const imgData = canvas.toDataURL('image/png');
                  const pdf = new jsPDF();

                  
              x.value.map((y, ind) => { 
                    //Fecha
                    count += 1

                    pdf.setFont('courier')
                    pdf.setFontType('normal')
                    pdf.setFontSize(10) 
                    pdf.text(`${y.arrived_at}`, 10, count * 40)
                    //Lugar
                    pdf.setFont('courier')
                    pdf.setFontType('normal')
                    pdf.setFontSize(10) 
                    pdf.text(`${y.lat}- ${y.lng}`, 60, count * 40)
                    //Comentario
                    pdf.setFont('courier')
                    pdf.setFontType('normal')
                    pdf.setFontSize(10) 
                    pdf.text(`${y.comments}`, 120, count * 40)
                    //Fotos
                    pdf.setFont('courier')
                    pdf.setFontType('normal')
                    pdf.setFontSize(10) 
                    pdf.text(`Fotos`, 180, count * 40)
                    pdf.addPage();
              });

              const paradasOK = x.value.filter(x => x.fallida == false).length;
              const paradasFail = x.value.filter(x => x.fallida).length;

              pdf.setFont('courier')
              pdf.setFontType('normal') 
              pdf.text("Reporte Mensual", 10 , 10)  

              pdf.setFont('helvetica')
              pdf.setFontType('bold')
              pdf.text(`Cliente: ${x.Key}`, 10 , 30)

              pdf.setFont('courier')
              pdf.setFontType('normal') 
              pdf.text(`${months[this.state.month]} - ${this.state.year}`, 140 , 10)

              pdf.text(`Información del mes:`, 10 , 50)
              pdf.text(` * Recolecciones del mes:  ${x.value.length}`, 10 , 60)
              pdf.text(` * Recolecciones fallidas: ${paradasFail}`, 10 , 70)
              pdf.text(` * Recolecciones logradas: ${paradasOK}`, 10 , 80)

              pdf.setFont('helvetica')
              pdf.setFontType('bold') 
              pdf.text(`Día`, 10 , 100)

              pdf.setFont('helvetica')
              pdf.setFontType('bold') 
              pdf.text(`Comentario`, 120 , 100)

              pdf.setFont('helvetica')
              pdf.setFontType('bold') 
              pdf.text(`Lugar`, 60 , 100)

              pdf.setFont('helvetica')
              pdf.setFontType('bold') 
              pdf.text(`Fotos`, 180 , 100)

              pdf.save(`${x.Key} / ${months[this.state.month]} / ${this.state.year}`)
             
          })
      });

      this.setState({modalShow: false})

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


  blockView(){
    var access = localStorage.getItem('access');

    if(access == "Admin Gráficas" || access == "Conductor"){
      return (
        <div>
          <img  width ="70" height = "70" src ="https://image.flaticon.com/icons/svg/395/395848.svg"/>
          <p className ="blocked">Esta función es solo para Administradores con total acceso !</p>
        </div>
      );
    } else {
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
          </div>
        );
    }
  }

  render(){
    const {unauthorizedSales, week} = this.state;
    console.log(this.state.momments, this.state.otherArray);


    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    return (
      <div>
        {this.blockView()}

        <div className = "pdf" id = "divToPrint">
          <button onClick={this.getDocReady.bind(this)}>Generar PDF</button>
          <Modal
            isOpen={this.state.modalShow}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className = "modal-button">
              <button  onClick={() => this.setState({modalShow: false})}> X </button>
            </div>
            <button onClick={this.printDocument.bind(this)}>Descargar reportes en PDF</button>
          </Modal>
        </div>
      </div>
    )
  }
}



export default Settings;
