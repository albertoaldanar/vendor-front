import React, {Component} from "react";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const myEventsList = [
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

class Calendar extends Component{

  constructor(props){
    super(props);
    this.state = {myEventsList: []}
  }

  render(){
    return(
      <div id = "mycalendar" className ="calendar-container">
        <BigCalendar

          eventPropGetter={
            (event, start, end, isSelected) => {
              let newStyle = {
                backgroundColor: "red",
                color: 'white',
                borderRadius: "0px",
                border: "none"
              };

                if (event.desc == "Descarga"){
                  newStyle.backgroundColor = "blue"
                }
              return {
                className: "",
                style: newStyle
              };
            }
          }

          events={myEventsList}
          startAccessor='startDate'
          endAccessor='endDate'
          selectable = 'ignoreEvents'
        />
      </div>
    );
  }
}

export default Calendar;
