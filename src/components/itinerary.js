import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import React, {Component} from "react";
import * as firebase from 'firebase';
import Calendar from "./calendar";
import BigCalendar from 'react-big-calendar';
import { HashLink as Link } from 'react-router-hash-link';
import Modal from 'react-responsive-modal';
import API from "../apis/tasks";
import CSVReader from 'react-csv-reader';
import * as XLSX from "xlsx";
import Loader from 'react-loader-spinner';

const dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Sabado", "Domingo"];

var date = new Date();
var d = date.getDay();


class Itinerary extends Component{

	constructor(props){
		super(props);
		this.state ={
			openModal: false, day: dias[d], client: "", itinerary: [],
      modalVisible: true, editModal: false, id: null, clientDay: "",
      newItinerary: []
		}

	}

	async componentWillMount(){

    console.log(new Date().toLocaleString("es-ES", {timeZone: "America/Denver"}))

    this.simpleGetItinerary();
	}


  async simpleGetItinerary(){
      const {day} = this.state;

       try {
              const taskResponse = await API.getTasks(day);
              console.log('users respuest =>', taskResponse);
              this.setState({modalVisible: true});

              if (taskResponse.tasks) {
                  this.setState({
                      modalVisible: false,
                      itinerary: taskResponse.tasks
                  });

              } else {
                alert("Ha ocurrido un error, vuelva a intentarlo mas tarde.")
              }

        } catch (err) {
              alert(err);
              if (err instanceof TypeError) {
                  if (err.message == 'Network request failed') {
                      alert("No hay internet");
                      console.log("No hay internet")
                  }
                  else {
                      alert("El servicio esta fallando.")
                      console.log('Ups..', 'Por el momento este servicio no esta disponible, vuelva a intentarlo mas tarde');
                  }
              }
        }
  }


  async getItinerary(value){

      const {day} = this.state;
      this.setState({ day: value.target.value })


      if(day){
        try {
              const taskResponse = await API.getTasks(value.target.value);

              this.setState({modalVisible: true});
              console.log('users respuest =>', taskResponse);

              if (taskResponse.tasks) {
                  this.setState({
                      modalVisible: false,
                      itinerary: taskResponse.tasks
                  });

              } else {
                alert("Ha ocurrido un error, vuelva a intentarlo mas tarde.")
              }

        } catch (err) {
              alert(err);
              if (err instanceof TypeError) {
                  if (err.message == 'Network request failed') {
                      alert("No hay internet");
                      console.log("No hay internet")
                  }
                  else {
                      alert("El servicio esta fallando.")
                      console.log('Ups..', 'Por el momento este servicio no esta disponible, vuelva a intentarlo mas tarde');
                  }
              }
        }
      } else {
        alert("Favor de asignar un dia")
      }
  }


  async editTask(){

      const {id, clientDay, client, day} = this.state;


      if(day && clientDay && client){
        try {
              const taskResponse = await API.updateTask(id, clientDay, client);
              console.log('users respuest =>', taskResponse);

              if (taskResponse.response == "SUCCESS") {
                  this.setState({
                      day: taskResponse.task_updated.day,
                      editModal: false,
                      client: "",
                      id: null,
                      clientDay: ""
                  });

                  this.simpleGetItinerary();

                   alert("Se ha actualizado correctamente!");

              } else {
                alert("Ha ocurrido un error, vuelva a intentarlo mas tarde.")
              }

        } catch (err) {
              alert(err);
              if (err instanceof TypeError) {
                  if (err.message == 'Network request failed') {
                      alert("No hay internet");
                      console.log("No hay internet")
                  }
                  else {
                      alert("El servicio esta fallando.")
                      console.log('Ups..', 'Por el momento este servicio no esta disponible, vuelva a intentarlo mas tarde');
                  }
              }
        }
      } else {
        alert("Favor de asignar datos de registro")
      }
  }

  async deleteTask(){

      const { id } = this.state;

      if(id){

        try {
              const taskResponse = await API.deleteTask(id);
              console.log('users respuest =>', taskResponse);

              if (taskResponse.response == "SUCCESS") {
                  this.setState({
                      editModal: false,
                      client: "",
                      id: null,
                      clientDay: ""
                  });

                  this.simpleGetItinerary();

                  alert("Se ha eliminado correctamente :)")

              } else {
                alert("Ha ocurrido un error, vuelva a intentarlo mas tarde.")
              }

        } catch (err) {
              alert(err);
              if (err instanceof TypeError) {
                  if (err.message == 'Network request failed') {
                      alert("No hay internet");
                      console.log("No hay internet")
                  }
                  else {
                      alert("El servicio esta fallando.")
                      console.log('Ups..', 'Por el momento este servicio no esta disponible, vuelva a intentarlo mas tarde');
                  }
              }
        }
      } else {
        alert("Favor de seleccionar un cliente")
      }
  }


  async deleteMultipleTasks(){

      const { day } = this.state;

      if(day){

        try {
              const taskResponse = await API.deleteMultiple(day);
              console.log('delete respuesta =>', taskResponse);

              if (taskResponse.response == "SUCCESS") {
                  this.setState({
                      editModal: false,
                      client: "",
                      id: null,
                      clientDay: ""
                  });

                this.createMultipleTasks();

              } else {
                alert("Ha ocurrido un error, vuelva a intentarlo mas tarde.")
              }

        } catch (err) {
              alert(err);
              if (err instanceof TypeError) {
                  if (err.message == 'Network request failed') {
                      alert("No hay internet");
                      console.log("No hay internet")
                  }
                  else {
                      alert("El servicio esta fallando.")
                      console.log('Ups..', 'Por el momento este servicio no esta disponible, vuelva a intentarlo mas tarde');
                  }
              }
        }
      } else {
        alert("Favor de seleccionar un cliente")
      }
  }

  async createMultipleTasks(){

      const { newItinerary } = this.state;

      if(newItinerary.length > 0){

        try {
              const taskResponse = await API.createMultiple(newItinerary);
              console.log('users respuest =>', taskResponse);

              if (taskResponse.response == "SUCCESS") {
                  this.setState({
                      itinerary: taskResponse.tasks
                  });

                  this.setState({
                    itineraryModal: false
                  })

                  this.simpleGetItinerary();

              } else {
                alert("Ha ocurrido un error, vuelva a intentarlo mas tarde.")
              }

        } catch (err) {
              alert(err);
              if (err instanceof TypeError) {
                  if (err.message == 'Network request failed') {
                      alert("No hay internet");
                      console.log("No hay internet")
                  }
                  else {
                      alert("El servicio esta fallando.")
                      console.log('Ups..', 'Por el momento este servicio no esta disponible, vuelva a intentarlo mas tarde');
                  }
              }
        }
      } else {
        alert("Favor de crear itinerario")
      }
  }

  handleClient(event){
    this.setState({ client: event.target.value });
  }


  selectTask(task){
    this.setState({ editModal: true, id: task.id, client: task.client, clientDay: task.day  })
  }

  closeAndClean(){
    this.setState({
      client: "",
      id: null,
      editModal: false,
      clientDay: "",
      newItinerary: [],
      itineraryModal: false
    });
  }


  renderTasks(){
    const { itinerary } = this.state;

    if(itinerary.length > 0){
      return itinerary.map(x => {
        return(
          <div style = {{display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: 10 , borderBottomWidth: 0.4, borderBottomColor: "red" }}>
            <p style ={{marginRight: 15, marginTop: 8}}>{x.client}</p>
            <div onClick = {this.selectTask.bind(this, x)}>
              <p style = {{ padding: 5, border: "0.4 solid black", fontSize: 10, textDecoration: "underline", cursor: "pointer", marginTop: 5 }}>
                Editar
              </p>
            </div>
          </div>
        )
      })
    } else {
      return (
        <p style ={{marginRight: 15, marginTop: 8}}> No hay itinerario para {this.state.day}</p>
      )
    }
  }


  onLoad(response){
      console.log("response =>", response);

      const myArray = [];

      response.map(array => {
        return myArray.push({ "client": array[0], "day": array[1] });
      })

      this.setState({ newItinerary: myArray, itineraryModal: true })

      console.log("itinerary JSON => ", this.state.newItinerary);

  }

	render(){

  	const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

		return(
			<div>

        <Modal open= {this.state.editModal} center onClose = {this.closeAndClean.bind(this)}>
              <div>
                <p>Cliente:</p>
                <form>
                  <div className ="field">
                    <input type="text" name="client" value = {this.state.client} onChange = {this.handleClient.bind(this)}/>
                  </div>
                </form>
              </div>

              <div style = {{marginTop: 15, justifyConent: "center", alignSelf: "center"}}>

                <select id="type" className="select" onChange={ value => this.setState({ clientDay: value.target.value })} value = {this.state.clientDay}>
                  {
                    days.map(day => {
                      return(
                        <option value= {day}>
                          {day}
                        </option>
                      )
                    })
                  }
                </select>
              </div>


              <div style = {{marginTop: 20, marginLeft: 5}}>
                <button className="save-button" onClick = { this.editTask.bind(this) }> Guardar cambios </button>
              </div>

            <div style = {{marginTop: 20, marginLeft: 5}} onClick = {this.deleteTask.bind(this)}>
                <button className="delete-button"> Eliminar </button>
              </div>

        </Modal>

        <Modal open= {this.state.itineraryModal} center onClose = {this.closeAndClean.bind(this)}>

              <div style = {{marginTop: 15, justifyConent: "center", alignSelf: "center"}}>
                {
                  this.state.newItinerary.map( it => {
                    return(
                      <div>
                        <p>{it.client}</p>
                      </div>
                    )
                  })
                }
              </div>


              <div style = {{marginTop: 20, marginLeft: 5}} onClick = {this.deleteMultipleTasks.bind(this)}>
                <button className="save-button"> Crear itinerario de {this.state.day} </button>
              </div>
        </Modal>

				<p className = "title-route" style = {{fontSize: 20,}}>Itinerario semanal <img  width ="30" height = "30" src ="https://image.flaticon.com/icons/svg/1179/1179054.svg"/></p>

        <div style = {{display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <select id="type" className="select" onChange={ value => this.getItinerary(value)} value = {this.state.day}>
            {
              days.map(day => {
                return(
                  <option value= {day}>
                    {day}
                  </option>
                )
              })
            }
          </select>

          <div className = "users" style = {{marginBottom: 10}}>
            <CSVReader
              cssClass="csv-reader-input"
              label=""
              onFileLoaded={this.onLoad.bind(this)}
              onError={this.handleDarkSideForce}
              inputId="ObiWan"
              inputStyle={{color: 'gray'}}
            />
          </div>
        </div>

        <div style = {{marginTop: 25}}>
        {
          this.state.modalVisible ?
           <Loader
              type="Oval"
              color="black"
              height={50}
              width={50}
              visible = {this.state.modalVisible}
            />

            :
            this.renderTasks()
        }
        </div>


			</div>
		);
	}
}



export default Itinerary;
