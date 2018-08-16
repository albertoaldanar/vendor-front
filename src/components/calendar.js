import React, {Component} from "react";

import BigCalendar from 'react-big-calendar';
import moment from 'moment';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const myEventsList= [
  {
    title: 'All Day Event very long title',
    startDate: new Date(2018, 7, 16),
    endDate: new Date(2018, 7, 16),
    desc: 'Big conference for important people'
  },
  {
    title: 'Event 2',
    startDate: new Date(2018, 7, 17),
    endDate: new Date(2018, 7, 17),
  }
]



const Calendar = props => (
  <div id = "mycalendar" className ="calendar-container">
    <BigCalendar
      events={myEventsList}
      startAccessor='startDate'
      endAccessor='endDate'
      selectable = {true}
    />
  </div>
);

export default Calendar;
