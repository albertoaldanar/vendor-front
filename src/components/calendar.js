import React, {Component} from "react";

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer


const myEventsList= [
  {
    title: 'All Day Event very long title',
    startDate: new Date(2018, 7, 18),
    endDate: new Date(2018, 7, 18),
    desc: 'Big conference for important people'
  },
  {
    title: 'Event 2',
    startDate: new Date(2018, 7, 18),
    endDate: new Date(2018, 7, 18),
    desc: 'refer'
  }
]


class Calendar extends Component{

  constructor(props){
    super(props);
    this.state = {myEventsList: []}
  }

  componentWillMount(){
    fetch("http://localhost:3000/api/task_admins")
    .then(response => response.json())
    .then(res => {
      this.setState({myEventsList: res.allTasks})
    })
  }

  render(){
    return(
      <div id = "mycalendar" className ="calendar-container">
        <BigCalendar
          events={myEventsList}
          startAccessor='startDate'
          endAccessor='endDate'
          selectable = {true}
        />
      </div>
    );
  }
}

export default Calendar;
