import React, {Component} from "react";
import * as firebase from 'firebase';


class Login extends Component{

	constructor(props){
		super(props);

		this.state = {username: "", password: "", errorMessage : ""}

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
