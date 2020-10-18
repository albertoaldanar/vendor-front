import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'react-dropdown/style.css'
import React, { Component } from 'react';
import logo from './logo.svg';
import Home from "./components/home";
import Welcome from "./components/welcome";
import Chat from "./components/chat";
import Calendar from "./components/calendar";
import Stats from "./components/stats";
import TeamStats from "./components/teamStats";
import Support from "./components/support";
import Lines from "./components/lines";
import PrivacyPolitics from "./components/privacyPolitics";
import Itinerary from "./components/itinerary";
import Users from "./components/users";
import Team from "./components/team";
import Settings from "./components/settings";
import CardView from "./components/reusable/cardView";
import Login from "./login";
import Header from "./components/reusable/header";
import { BrowserRouter as Router, Route, Link, withRouter} from "react-router-dom";
import './App.css';
import "./team.css";
import "./teamStats.css";
import "./settings.css";
import API from "./apis/login";
import Loader from 'react-loader-spinner'

class App extends Component {


  constructor(props){
    super(props);

    this.state = {username: "", password: "", errorMessage : "", visibleModal: false}
  }

  logout(){
    localStorage.removeItem('LOGGED');

     window.location.reload(false);
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

  async login(){

    const {username, password} = this.state;

        try {
            this.setState({visibleModal: true});

            const loginResponse = await API.logIn(username, password);
            console.log('login respuest =>', loginResponse);

            if (loginResponse.response == 'SUCCESS') {
                this.setState({visibleModal: false});

                localStorage.setItem("LOGGED", "SI");
                localStorage.setItem("ACCESS", "Admin Total");
                localStorage.setItem("USER", loginResponse.user[0].username);

                this.setState({password: "", username: ""});
                return this.reloadComponent();

            } else if(loginResponse.response == "Invalid credentials"){
                this.setState({visibleModal: false, password: "", username: ""});

                alert("Usuario o contraseña incorrectos");
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

  blockUserManagement(){
      var access = localStorage.getItem('access');

        return(
            <div className ="users">
                  <Link to="/users">
                    <img  width ="25" height = "25" src ="https://image.flaticon.com/icons/svg/1605/1605401.svg"/>
                    <span className ="user-name">Manejar usuarios</span>
                  </Link>
            </div>
        );

  }

  render() {

    var logged = localStorage.getItem('LOGGED');

    return (
      <Router>
          { logged == "SI" ?
            <div>
              <div className ="header">
                <p className ="bussines-name">Serecsin SA de CV</p>
                {this.blockUserManagement()}
                <button onClick={this.logout.bind(this)} className = "button-logout">
                  Logout
                </button>
              </div>
              <Home/>
              <p>Hello</p>
              <CardView>
                <Route exact path ="/" component ={Welcome}/>
                <Route exact path ="/stats" component ={Stats}/>
                <Route exact path="/chat" component={TeamStats} />
                <Route exact path="/support" component={Support} />
                <Route exact path="/graphics" component={Chat} />
                <Route exact path="/lines" component={Lines} />
                <Route exact path="/calendar" component={Calendar} />
                <Route exact path="/itinerary" component={Itinerary} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/team" component={Team} />
                <Route exact path ="/privacyPolitics" component ={PrivacyPolitics}/>
                <Route exact path="/settings" component={Settings} />
              </CardView>
            </div>

            :

              <div>
                  <p className ="logoleft">Serecsin SA de CV</p>


                  <div className = "login">

                    <form>
                      <div className ="field">
                        <label>
                          Usuario:
                          <input type="text" name="username" value = {this.state.username} onChange = {this.handleUsername.bind(this)}/>
                        </label>
                      </div>

                      <label>
                        Contraseña:
                        <input type="password" name="password" value = {this.state.password} onChange = {this.handlePassword.bind(this)}/>
                      </label>
                    </form>

                    <button onClick = {this.login.bind(this)}>Login</button>

                    <p className = "errorMessage">{this.state.errorMessage}</p>

                    <Route exact path ="/privacyPolitics" component ={PrivacyPolitics}/>
                    <Route exact path="/support" component={Support}/>
                  </div>
              </div>

          }
      </Router>
    );
  }
}

export default App;
