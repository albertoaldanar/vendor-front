import React, {Component} from "react";
import * as firebase from 'firebase';
import Calendar from "./calendar";
import BigCalendar from 'react-big-calendar';
import { HashLink as Link } from 'react-router-hash-link';
import Modal from 'react-responsive-modal';
import Select from "react-dropdown-select";

class Itinerary extends Component{

	constructor(props){
		super(props);
		this.state ={
			openModal: false, day: "", client: "", itinerario: ""
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
		const db = firebase.firestore();

		const month = new Date().getMonth() + 1;

		var today = new Date();
    	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    	var dateTime = date+' '+time;

    	console.log(dateTime);

	    const itinerario = [];
	    let cGanados = db.collection('itinerario').where("mes", "==", month).get()
	      .then(snapshot => {
	        snapshot.forEach(doc => {
	          itinerario.push(doc.data());
	        })
	      });
	      this.setState({ itinerario });
	}

	registerRouteClient(){

		const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

		const db = firebase.firestore();
		let itinerarioDB = db.collection('itinerario')

		const month = new Date().getMonth() + 1;
		const day = new Date().getDay();

		// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  //   	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  //   	var dateTime = date+' '+time;
    	itinerarioDB.add({
    		day: this.state.day, mes: month, client: this.state.client
    	})

    	this.setState({openModal: false, client: ""})

	}

	render(){
// 		const events = [
//   {
//     title: 'Carga de gas',
//     startDate: new Date(2019, 8, 3),
//     endDate: new Date(2019, 8, 3),
//     desc: 'Descarga'
//   },
//   {
//     title: 'Descarga',
//     startDate: new Date(2019, 8, 2),
//     endDate: new Date(2019, 8, 2),
//     desc: 'refer',
//     allDay: false
//   }
// ]	
	console.log(this.state.itinerario)


	const events = this.state.itinerario.map(x=> {
      return {
        title: x.client, 
        startDate: x.date, 
        endDate: x.date, 
        allDay: true
      }
    })

	const days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

		return(
			<div>	
				<p className = "title-route">Ruta semanal <img  width ="30" height = "30" src ="https://image.flaticon.com/icons/svg/1179/1179054.svg"/></p>
					
				<div className = "users">
				  <button onClick = {() => this.setState({openModal: true})}>
              		<span>Añadir ruta +</span>
            	  </button>
            	</div>

				<div className = "card">
			      <div id = "mycalendar" className ="calendar-container">

			      	<Modal open={this.state.openModal} onClose={() => this.setState({openModal: false})} center>
          				<p className = "modal-title">Registro</p>

          				<div className = "users">
          				    <select id="years" className="select" onChange={(event) => this.setState({day: event.target.value})}>
			                  value={this.state.day}
			                    {days.map((item, index) => {
			                      return (
			                        <option key={index} value={item}>
			                          {item}
			                        </option>
			                      );
			                    })}
			                </select>

			                <div className ="input-modal">
				               	<form>
			                      <div className ="field">
			                        <input type="text" name="contra" value = {this.state.client} onChange = {(event) => this.setState({client: event.target.value})}/>
			                      </div>
		                    	</form>
	                    	</div>
          					<button onClick = {this.registerRouteClient.bind(this)}>Registrar parada</button>
          				</div>
        			</Modal>
			        <BigCalendar

			          eventPropGetter={
			            (event, start, end, isSelected) => {
			              let newStyle = {
			                backgroundColor: "#B0C4DE",
			                color: 'white',
			                borderRadius: "0px",
			                border: "none"
			              };
			              return {
			                className: "",
			                style: newStyle
			              };
			            }
			          }
			          events={events}
			          startAccessor='startDate'
			          endAccessor='endDate'
			          selectable = 'ignoreEvents'
			          defaultView={'week'}
					  views={['day', 'week']}
			        />
			      </div>
			    </div>
			</div>
		);
	}
}



export default Itinerary;