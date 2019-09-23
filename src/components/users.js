import React, {Component} from "react";
import * as firebase from 'firebase';

class Users extends Component{

	constructor(props){
    	super(props);

    	this.state = {allUsers: [], userSelected: {}, showEdit: false, password: "", username: "", access: "", name: "", access: "", id: null}

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

	async componentWillMount(){
		return this.getUsers();
	}


	deleteAccount(){
		  const {username, password, nombre, access} = this.state;

		  const db = firebase.firestore();

		  let userRef = db.collection("user").where("username", "==", username).get()
      		.then(function(querySnapshot) {
	        	querySnapshot.forEach(function(doc) {
	              console.log(doc.id, " => ", doc.data());
	              // Build doc ref from doc.id
	              doc.ref.delete();
	         	});
      		})

      	   return this.getUsers();	
	}


	updateAccount(){
		  const {username, password, nombre, access, id} = this.state;

		  const db = firebase.firestore();

		  let userRef = db.collection("user").where("id", "==", id).get()
      		.then(function(querySnapshot) {
	        	querySnapshot.forEach(function(doc) {
	              console.log(doc.id, " => ", doc.data());
	              // Build doc ref from doc.id
	              db.collection("user").doc(doc.id).update({username, password, access});
	         	});
      		})

      		alert("Tus cambios se han guardado");
      	   	// window.location.reload(false);
	}


	deleteAccount(id){
		  const {username, password, nombre, access} = this.state;

		  const db = firebase.firestore();

		  let userRef = db.collection("user").where("id", "==", id).get()
      		.then(function(querySnapshot) {
	        	querySnapshot.forEach(function(doc) {
	              console.log(doc.id, " => ", doc.data());
	              // Build doc ref from doc.id
	              doc.ref.delete();
	         	});
      		})

      	   alert("Esta cuenta se ha eliminado");
      	   // window.location.reload(false);	
	}


	handlePassword(event){
		this.setState({ password: event.target.value });
	}

	handleUsername(event){
		this.setState({ username: event.target.value });
	}

	seletUser(user){
		this.setState({username: user.username, password: user.password, name: user.nombre, access: user.access, showEdit: true, id: user.id})
	}

	accessAdmin(event){
    	this.setState({access: event.target.value});
  	}


	editUser(){

		const accessOptions = ["Admin Total", "Admin Gráficas", "Admin Archivos", "Conductor"];

		if(this.state.username){
			return(
				<div>
					<div className = "users-num">	
						<div>	
							<p>ACCESO: </p>
			                <select id="access" className="select" onChange={this.accessAdmin.bind(this)}>
			                	value = {this.state.access}
			                    {accessOptions.map((item, index) => {
			                      return (
			                        <option key={item} value={item}>
			                          {item}
			                        </option>
			                      );
			                    })}
			                </select>
						</div>
						<div>
							<p>USUARIO:</p>
							<form>
		                      <div className ="field">
		                        <input type="text" name="username" value = {this.state.username} onChange = {this.handleUsername.bind(this)}/>
		                      </div>
	                    	</form>
						</div>

						<div>
							<p>CONTRASEÑA:</p>
							<form>
		                      <div className ="field">
		                        <input type="text" name="contra" value = {this.state.password} onChange = {this.handlePassword.bind(this)}/>
		                      </div>
	                    	</form>
						</div>
					</div>

					<button className="save-button" onClick = {this.updateAccount.bind(this)}> Guardar cambios </button>
					<button className="delete-button" onClick={this.deleteAccount.bind(this)}> Eliminar cuenta </button>
				</div>
			);
		} else {
			return null;
		}
	}

	getUsers(){
		const db = firebase.firestore();

    	const allUsers = [];
	    let cPerdidos = db.collection('user').get()
	      .then(snapshot => {
	        snapshot.forEach(doc => {
	          allUsers.push(doc.data());
	        })
	      });
	      this.setState({allUsers});
	}


	renderUsers(){

		var access= localStorage.getItem('access');

		if(access == "Admin Total"){
			return this.state.allUsers.map(x => {

			    return(
				          <div className = "user-info">
				          	<p className = "two-u"> {x.nombre} </p>
				            <p className = "one-u"> {x.access}  <button onClick = {this.seletUser.bind(this, x)}> Editar </button> </p>
				          </div>
			      );
			})
		} else {
			return(
				<div>
		          <img  width ="70" height = "70" src ="https://image.flaticon.com/icons/svg/395/395848.svg"/>
		          <p className ="blocked">Esta función es solo para Administradores con total acceso !</p>
		        </div>
			);
		}

	}

	render(){
		console.log(this.state.username);

		return(
				<div>
					<div className = "user-info">
			              <p className = "one-u bold"> Tipo de usuario</p>
			              <p className = "two-u bold"> Usuario</p>
			        </div>

			        
					{this.renderUsers()}
					{this.editUser()}
				</div>
		);
	}
}


export default Users;