import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-dropdown/style.css'
import React, { Component } from 'react';
import logo from './logo.svg';
import Home from "./components/home";
import Welcome from "./components/welcome";
import Chat from "./components/chat";
import Calendar from "./components/calendar";
import Stats from "./components/stats";
import TeamStats from "./components/teamStats";
import Lines from "./components/lines";
import Team from "./components/team";
import Settings from "./components/settings";
import CardView from "./components/reusable/cardView";
import Login from "./login";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import "./team.css";
import "./teamStats.css";
import "./settings.css";
import * as firebase from 'firebase';

class App extends Component {


  constructor(props){
    super(props);

    this.state = {username: "", password: "", errorMessage : ""}

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




  reloadComponent(){
      window.location.reload(false);
  }

  handleUsername(event) {
       this.setState({username: event.target.value});
  }


  handlePassword(event) {
       this.setState({password: event.target.value});
    }

  login(){
      const {username, password} = this.state;
      const dbUser = firebase.firestore().collection('user');

    if(username && password){

          dbUser.where('username', '==', username).where("password", "==", password).get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                console.log(doc.data());

                if(doc.data().username){
                localStorage.setItem("login", "SI")
                 return this.reloadComponent()

                } else {
                  this.setState({errorMessage: "Usuario o contraseña incorrectos", username: "", password: ""})
                }
              });
              })

      // return this.sendToHome();
    } else {
      this.setState({errorMessage: "Información incompleta", password: "", username: ""})
    }
  
  }

  render() {

    var login = localStorage.getItem('login');

    return (
      <Router>
          { login =="SI" ? 
            <div>
              <Home/>
              <p>Hello</p>
              <CardView>
                <Route exact path ="/" component ={Welcome}/>
                <Route exact path ="/stats" component ={Stats}/>
                <Route exact path="/chat" component={TeamStats} />
                <Route exact path="/graphics" component={Chat} />
                <Route exact path="/lines" component={Lines} />
                <Route exact path="/calendar" component={Calendar} />
                <Route exact path="/team" component={Team} />
                <Route exact path="/settings" component={Settings} />
              </CardView>
            </div> : 

              <div className = "login">
                <form>
                  <label>
                    Usuario:
                    <input type="text" name="username" value = {this.state.username} onChange = {this.handleUsername.bind(this)}/>
                  </label>

                  <label>
                    Contraseña:
                    <input type="password" name="password" value = {this.state.password} onChange = {this.handlePassword.bind(this)}/>
                  </label>
                </form>

                <button onClick = {this.login.bind(this)}>Login</button>
          
                <p>{this.state.errorMessage}</p>
              </div>

          }
      </Router>
    );
  }
}

export default App;
