import "react-big-calendar/lib/css/react-big-calendar.css";

import React, { Component } from 'react';
import logo from './logo.svg';
import Home from "./components/home";
import Chat from "./components/chat";
import Calendar from "./components/calendar";
import Stats from "./components/stats";
import TeamStats from "./components/teamStats";
import Team from "./components/team";
import CardView from "./components/reusable/cardView";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import "./team.css";
import "./teamStats.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Home/>
          <CardView>
            <Route exact path="/chat" component={TeamStats} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path ="/stats" component ={Stats}/>
            <Route exact path="/team" component={Team} />
          </CardView>
        </div>
      </Router>
    );
  }
}

export default App;
