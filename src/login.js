import React, {Component} from "react";
import * as firebase from 'firebase';


class Login extends Component{

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



	render(){
		console.log(this.state.username);

		return(
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
		);
	}
}


export default Login