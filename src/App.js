import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-dropdown/style.css'
import React, { Component } from 'react';
import logo from './logo.svg';
import Home from "./components/home";
import Chat from "./components/chat";
import Calendar from "./components/calendar";
import Stats from "./components/stats";
import TeamStats from "./components/teamStats";
import Lines from "./components/lines";
import Team from "./components/team";
import Settings from "./components/settings";
import CardView from "./components/reusable/cardView";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import "./team.css";
import "./teamStats.css";
import "./settings.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Home/>
          <CardView>
            <Route exact path ="/stats" component ={Stats}/>
            <Route exact path="/chat" component={TeamStats} />
            <Route exact path="/graphics" component={Chat} />
            <Route exact path="/lines" component={Lines} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/team" component={Team} />
            <Route exact path="/settings" component={Settings} />
          </CardView>
        </div>
      </Router>
    );
  }
}

export default App;
