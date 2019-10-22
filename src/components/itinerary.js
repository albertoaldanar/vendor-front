import React, {Component} from "react";
import * as firebase from 'firebase';
import Calendar from "./calendar";
import BigCalendar from 'react-big-calendar';
import { HashLink as Link } from 'react-router-hash-link';
import Modal from 'react-responsive-modal';

class Itinerary extends Component{

	constructor(props){
		super(props);
		this.state ={
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

	render(){
		const events = [
  {
    title: 'Carga de gas',
    startDate: new Date(2019, 8, 3),
    endDate: new Date(2019, 8, 3),
    desc: 'Descarga'
  },
  {
    title: 'Descarga',
    startDate: new Date(2019, 8, 2),
    endDate: new Date(2019, 8, 2),
    desc: 'refer',
    allDay: false
  }
]
		return(
			<div>	
				<p className = "title-route">Ruta semanal <img  width ="30" height = "30" src ="https://image.flaticon.com/icons/svg/1179/1179054.svg"/></p>
					
				<div className = "card">
			      <div id = "mycalendar" className ="calendar-container">
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