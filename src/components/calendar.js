import React, {Component} from "react";

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer


class Calendar extends Component{

  constructor(props){
    super(props);
    this.state = {myEventsList: []}
  }

  componentWillMount(){
    fetch("http://localhost:3000/api/tasks")
    .then(response => response.json())
    .then(res => {
      this.setState({myEventsList: res})
    })
  }

  render(){
    return(
      <div id = "mycalendar" className ="calendar-container">
        <BigCalendar
          events={this.state.myEventsList}
          startAccessor='startDate'
          endAccessor='endDate'
          selectable = {true}
        />
      </div>
    );
  }
}

export default Calendar;
