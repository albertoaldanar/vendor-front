import React, {Component} from "react";
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import * as XLSX from "xlsx";
import CSVReader from 'react-csv-reader';
import * as firebase from 'firebase';
import * as jsPDF from 'jspdf'
import html2canvas from "html2canvas";
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../apis/routes";
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import moment from 'moment'

class Settings extends Component{

  constructor(props){
    super(props);
    this.state = {
      unauthorizedSales: [],
      week: null,
      year: new Date().getFullYear(), month: 0, anotherArray: [], allStops: [], momments: null, otherArray: [{}], modalShow: false, stops: [], routeView: true,
      ingresos: [{}],  loaded: false, type: "", message: "", ingresosThisMonth: [[]],
      day: new Date(), loadingModal: false, stopsByClient: {}, dataReady: false, monthResponse: "", yearResponse: ""
    }
  }

  componentWillMount(){

      const obj = {"1": "hello", "2":"heogkokegr", "3": "jrifjer"}

      console.log("DATE => ", moment(new Date()).format("YYYY-MM-DD"));
      console.log("MARCA =>", Object.keys(obj).length);
      return this.getStops();
  }


  openModal() {
    this.setState({modalShow: true});
  }

  async getStopsByClient() {

    const { month, year } = this.state;
    const monthString = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    if(month != 0 ){
      this.setState({loadingModal: true, routeView: false});


      try {
          const stopsResponse = await API.getStops("client", "", month, year);
          console.log('by client respuesta =>', stopsResponse);

          this.setState({loadingModal: true});

          if (stopsResponse.stops) {
              this.setState({
                  monthResponse: monthString[this.state.month - 1],
                  yearResponse: this.state.year,
                  modalVisible: false,
                  stopsByClient: stopsResponse.stops,
                  loadingModal: false,
              });


          } else {
              this.setState({ loadingModal: false });
              alert("Ha ocurrido un error, vuelva a intentarlo mas tarde.")
          }

      } catch (err) {
            this.setState({ loadingModal: false });
            alert(err);
            if (err instanceof TypeError) {
              if (err.message == 'Network request failed') {
                  alert("No hay internet");
                  console.log("No hay internet")
              } else {
                alert("El servicio esta fallando.")
                console.log('Ups..', 'Por el momento este servicio no esta disponible, vuelva a intentarlo mas tarde');
              }
            }
      }
    } else {
      alert("Favor de escojer un mes para generar reporte")
    }

  }

  async getStops(){

      this.setState({loadingModal: true});

      const doo = new Date();

      const today = new Date( doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000) );

      try {
          const stopsResponse = await API.getStops("route", new Date().toLocaleString("en-US", {timeZone: "America/Denver"}));
          console.log('stops respuesta =>', stopsResponse);

          this.setState({loadingModal: true});

          if (stopsResponse.stops) {
              this.setState({
                  modalVisible: false,
                  stops: stopsResponse.stops,
                  loadingModal: false
              });

          } else {
              this.setState({ loadingModal: false });
              alert("Ha ocurrido un error, vuelva a intentarlo mas tarde.")
          }

      } catch (err) {
            this.setState({ loadingModal: false });
            alert(err);
            if (err instanceof TypeError) {
              if (err.message == 'Network request failed') {
                  alert("No hay internet");
                  console.log("No hay internet")
              } else {
                alert("El servicio esta fallando.")
                console.log('Ups..', 'Por el momento este servicio no esta disponible, vuelva a intentarlo mas tarde');
              }
            }
      }
  }

  async onChangeDay(day){

      console.log("day => ", day)

      this.setState({loadingModal: true, day: day});

      try {
          const stopsResponse = await API.getStops("route", new Date(day).toLocaleString("en-US", {timeZone: "America/Denver"}));
          console.log('stops respuesta =>', stopsResponse);

          this.setState({loadingModal: true});

          if (stopsResponse.stops) {
              this.setState({
                  modalVisible: false,
                  stops: stopsResponse.stops,
                  loadingModal: false,
              });

          } else {
              this.setState({ loadingModal: false });
              alert("Ha ocurrido un error, vuelva a intentarlo mas tarde.")
          }

      } catch (err) {
            this.setState({ loadingModal: false });
            alert(err);
            if (err instanceof TypeError) {
              if (err.message == 'Network request failed') {
                  alert("No hay internet");
                  console.log("No hay internet")
              } else {
                alert("El servicio esta fallando.")
                console.log('Ups..', 'Por el momento este servicio no esta disponible, vuelva a intentarlo mas tarde');
              }
            }
      }
  }

  async deleteStop(id){
    try {
          const stopsResponse = await API.deleteStop(id);
          console.log('stops respuesta =>', stopsResponse);

          this.setState({loadingModal: true});

          if (stopsResponse.response == "SUCCESS") {
              this.setState({
                  modalVisible: false,
                  loadingModal: false,
              });

              alert("Se ha eliminado correctamente")
              this.onChangeDay(this.state.day);

          } else {
              this.setState({ loadingModal: false });
              alert("Ha ocurrido un error, vuelva a intentarlo mas tarde.")
          }

      } catch (err) {
            this.setState({ loadingModal: false });
            alert(err);
            if (err instanceof TypeError) {
              if (err.message == 'Network request failed') {
                  alert("No hay internet");
                  console.log("No hay internet")
              } else {
                alert("El servicio esta fallando.")
                console.log('Ups..', 'Por el momento este servicio no esta disponible, vuelva a intentarlo mas tarde');
              }
            }
      }
  }

  generateRouteDoc(){

    const { stops } = this.state;

    const input = document.getElementById('divToPrint');

    const titulos = ["Cliente", "Exitosa", "Comentarios", "Hora", "Foto"];
    const positionHorizontal = [10, 50, 90, 150, 190];
    const positionVertical = [55, 85, 115, 145, 175, 205, 235, 265, 35, 65, 95, 125, 155, 185, 205, 245, 35, 65, 95, 125, 155, 185, 205, 245, 35, 65, 95, 125, 155, 185, 205, 245,];


    html2canvas(input)
                .then((canvas) => {

                  const imgData = canvas.toDataURL('image/png');
                  const pdf = new jsPDF();

                    pdf.setFont('courier')
                    pdf.setFontType('bold')
                    pdf.setFontSize(10)
                    pdf.text(`Reporte del día ${moment(this.state.day).format("YYYY-MM-DD")}`, 10, 10)

                    pdf.setFont('courier')
                    pdf.setFontType('bold')
                    pdf.setFontSize(10)
                    pdf.text(`Total paradas: ${stops.length}`, 10, 20)

                    titulos.map((titulo, index) => {
                      pdf.setFont('courier')
                      pdf.setFontType('bold')
                      pdf.setFontSize(10)
                      pdf.text(`${titulo}`, positionHorizontal[index], 35)
                    })


                    stops.map((stop, index) => {
                        console.log("stop =>", stop)
                      var exitosa = stop.fail == false ? "SI" : "NO";
                      const hour = new Date(stop.created_at).getHours();
                      const minutes = new Date(stop.created_at).getMinutes();
                      var splitComments = pdf.splitTextToSize(stop.comments, 40);
                      var splitClient = pdf.splitTextToSize(stop.client, 40);

                      if(index == 8){
                        pdf.addPage();
                      }

                      pdf.setFont('courier')
                      pdf.setFontType('normal')
                      pdf.setFontSize(10)
                      pdf.text(10, positionVertical[index], splitClient)

                      pdf.setFont('courier')
                      pdf.setFontType('normal')
                      pdf.setFontSize(10)
                      pdf.text(`${exitosa}`, 56, positionVertical[index])

                      pdf.setFont('courier')
                      pdf.setFontType('normal')
                      pdf.setFontSize(10)
                      pdf.text(90, positionVertical[index], splitComments)

                      pdf.setFont('courier')
                      pdf.setFontType('normal')
                      pdf.setFontSize(10)
                      pdf.text(`${(hour).toString() + ":" + (minutes).toString()}` , 150, positionVertical[index])

                      stop.photos[0] != undefined ? pdf.addImage(`data:image/png;base64,${stop.photos[0]}`, 'PNG', 183, positionVertical[index] - 10, 20, 20) : null;
                    })

                    pdf.save(`Ruta ${moment(this.state.day).format("YYYY-MM-DD")}`)
    })
  }


  printDocument() {

    const { stopsByClient } = this.state;
    const input = document.getElementById('divToPrint');
    const monthString = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const titulos = ["Día", "Exitosa", "Comentarios", "Hora", "Foto"];
    const positionHorizontal = [10, 50, 90, 150, 190];
    const positionVertical = [55, 85, 115, 145, 175, 205, 235, 265, 295, 325, 355];

    for (let [key, value] of Object.entries(stopsByClient)) {
        console.log(`${key}: ${value.length} paradas`);

            html2canvas(input)
                .then((canvas) => {

                  const imgData = canvas.toDataURL('image/png');
                  const pdf = new jsPDF();

                  pdf.setFont('courier')
                  pdf.setFontType('bold')
                  pdf.setFontSize(10)
                  pdf.text(`Cliente: ${key}`, 10, 10)

                  pdf.setFont('courier')
                  pdf.setFontType('bold')
                  pdf.setFontSize(10)
                  pdf.text(`Mes: ${this.state.monthResponse} - ${this.state.yearResponse}`, 10, 20)

                  pdf.setFont('courier')
                  pdf.setFontType('bold')
                  pdf.setFontSize(10)
                  pdf.text(`Paradas: ${value.length}`, 10, 30)

                  titulos.map((titulo, index) => {
                    pdf.setFont('courier')
                    pdf.setFontType('bold')
                    pdf.setFontSize(10)
                    pdf.text(`${titulo}`, positionHorizontal[index], 45)
                  })

                  value.map((stop, index) => {
                      var exitosa = stop.fail == false ? "SI" : "NO";
                      const hour = new Date(stop.created_at).getHours();
                      const minutes = new Date(stop.created_at).getMinutes();
                      var splitComments = pdf.splitTextToSize(stop.comments, 40);

                      pdf.setFont('courier')
                      pdf.setFontType('normal')
                      pdf.setFontSize(10)
                      pdf.text(`${stop.day}`, 10, positionVertical[index])

                      pdf.setFont('courier')
                      pdf.setFontType('normal')
                      pdf.setFontSize(10)
                      pdf.text(`${exitosa}`, 56, positionVertical[index])

                      pdf.setFont('courier')
                      pdf.setFontType('normal')
                      pdf.setFontSize(10)
                      pdf.text(90, positionVertical[index], splitComments)

                      pdf.setFont('courier')
                      pdf.setFontType('normal')
                      pdf.setFontSize(10)
                      pdf.text(`${(hour).toString() + ":" + (minutes).toString()}`, 150, positionVertical[index])

                      stop.photos[0] != undefined ? pdf.addImage(`data:image/png;base64,${stop.photos[0]}`, 'PNG', 183, positionVertical[index] - 10, 20, 20) : null;
                  })

                  pdf.save(`Reporte ${key} - Mes:${this.state.monthResponse}`)
            })
    }

  }

  showData(){
    const { stops } = this.state;

      var stopType;

      if(stops.length > 0){
        return stops.map((item, index) => {

          var stopType = item.client != "BASURA" && item.client != "GASOLINA" && item.client != "INCIDENTE" ? "Cliente" : item.client

          console.log("hours => ", new Date(item.created_at).getHours());

          const hour = new Date(item.created_at).getHours();
          const minutes = new Date(item.created_at).getMinutes();
          return (
                <div className = "each-list">
                  <p className ="center">{index + 1}) {item.client}</p>
                  <p className ="center">{item.day} </p>
                  <p className ="center">{(hour).toString() + ":" + (minutes).toString()} </p>
                  <p className ="center">{stopType} </p>

                  <img  width ="25" height = "25" src ="https://www.flaticon.es/svg/static/icons/svg/786/786195.svg" onClick = {this.deleteStop.bind(this, item.id)} style= {{cursor: "pointer"}}/>
                </div>
          );
        })
      } else {
          return(<div></div>)
      }
  }

  showDataByClient(){
      const { stopsByClient } = this.state;

      var stopArray = [];

      for (let [key, value] of Object.entries(stopsByClient)) {
        console.log(key, value.length);
        stopArray.push(`${key}: ${value.length} paradas`);
      }

      return stopArray;
  }


  labelDownload(){
    const { monthResponse } = this.state;

    if(monthResponse){
      if(Object.keys(this.state.stopsByClient).length > 0){
        return (
          <p style = {{cursor: "pointer", textDecoration: "underline", padding: 20}} onClick = {this.printDocument.bind(this)}>Descargar reporte de {this.state.monthResponse}</p>
        )
      } else {
        return (
          <p style = {{ padding: 20}}>No hay información del mes {this.state.monthResponse} del {this.state.yearResponse}</p>
        )
      }
    } else {
      null
    }


  }

  render(){
    const { unauthorizedSales, week, routeView, stopsByClient } = this.state;
    console.log("stops => ", this.state.stops);
    console.log("stops by client => ", this.state.stopsByClient);
    console.log("mes => ", this.state.month, this.state.year, this.state.monthResponse);

    const months = [ {mes: "Escoje un mes", key: 0}, {mes: "Enero", key: 1}, {mes: "Febrero", key: 2}, {mes: "Marzo", key: 3}, {mes: "Abril", key: 4}, {mes: "Mayo", key: 5}, {mes: "Junio", key: 6}, {mes: "Julio", key: 7}, {mes: "Agosto", key: 8}, {mes: "Septiembre", key: 9}, {mes: "Octubre", key: 10}, {mes: "Noviembre", key: 11}, {mes: "Diciembre", key: 12}];
    const monthString = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const years = [2020, 2021, 2022];

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

        <div className = "pdf" id = "divToPrint">

          <p className = "title-route" style ={{fontSize: 20, marginBottom: -5}}>Reportes mensuales <img  width ="30" height = "30" src ="https://image.flaticon.com/icons/svg/149/149213.svg"/></p>

          <div style = {{paddingTop: 10, display: "flex", flexDirection: "row", paddingBottom: 15, marginLeft: 25}}>
            <p
              style = {{marginRight: 15, textDecoration: routeView ? "underline": "none", cursor: "pointer"}}
              onClick = { () =>this.setState({ routeView: true })}
            >
              Reporte por rutas
            </p>
            <p
              style = {{marginLeft: 25, textDecoration: !routeView ? "underline": "none", cursor: "pointer"}}
              onClick = { () => this.setState({ routeView: false })}
            >
              Reporte por cliente
            </p>
          </div>

          <Modal
            isOpen={this.state.loadingModal}
            style={customStyles}
            ariaHideApp={false}
          >
            <p>Generando reportes...</p>
          </Modal>

          {
            routeView ?
              <div>
                  <DatePicker
                     selected={this.state.day}
                     onChange={ day => this.onChangeDay(day)}
                  />
                {
                  this.state.stops.length > 0 ?
                    <div>
                        <p style = {{cursor: "pointer", textDecoration: "underline", padding: 20}} onClick = {this.generateRouteDoc.bind(this)}>Descargar ruta</p>
                        <div>
                          <div className = "each-list">
                            <p className ="center" style = {{fontWeight: "700"}}>Cliente</p>
                            <p className ="center" style = {{fontWeight: "700"}}>Fecha </p>
                            <p className ="center" style = {{fontWeight: "700"}}>Hora </p>
                            <p className ="center" style = {{fontWeight: "700"}}>Tipo </p>
                            <p className ="center" style = {{fontWeight: "700"}}> </p>
                          </div>
                        </div>
                      {this.showData()}
                    </div>
                  :
                    <p style = {{fontStyle: "oblique", marginTop: 30}}>No hay paradas en la ruta de este día</p>
                }

              </div>
            :
              <div>
                <select id="months" className="select" onChange={month => this.setState({month: Number(month.target.value)})}>
                    {months.map((item, index) => {
                      return (
                        <option key={item.key} value={item.key}>
                          {item.mes}
                        </option>
                      );
                    })}
                </select>

                <select id="years" className="select" onChange={year => this.setState({year: Number(year.target.value)})}>
                  value={this.state.year}
                    {years.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                </select>

                <button className="primary" onClick = {this.getStopsByClient.bind(this)}>Crear reporte</button>

                <div style = {{marginTop: 30}}>
                  { this.labelDownload() }

                  {
                    this.showDataByClient().map(stop =>
                      <div style = {{marginBottom: 8}}>
                        <p>{stop}</p>
                      </div>
                    )
                  }
                </div>
              </div>
          }

        </div>
      </div>
    )
  }
}


export default Settings;
