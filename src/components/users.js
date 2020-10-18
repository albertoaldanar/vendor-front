import React, {Component} from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import * as firebase from 'firebase';
import API from "../apis/users";
import Loader from 'react-loader-spinner';
import Modal from 'react-responsive-modal';

class Users extends Component{

	constructor(props){
    	super(props);

    	this.state = {
        allUsers: [], userSelected: {}, showEdit: false, password: "",
        username: "", access: "", name: "", access: "", id: null, visibleModal: false,
        createModal: false, userType: "Conductor", access: "Reportes e itinerario"
      }

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


	updateAccount(){

	}


	async getUsers(){
		  const {username, password, nombre, access, id} = this.state;

      try {
        this.setState({visibleModal: true});

            const usersResponse = await API.getAllUsers();
            console.log('users respuest =>', usersResponse);

            if (usersResponse.users) {
                this.setState({
                  visibleModal: false,
                  allUsers: usersResponse.users
                });
            } else {
              alert("Ha ocurrido un error, vuelva a intentarlo mas tarde.")
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

  closeAndClean(){
    this.setState({
      createModal: false,
      username: "",
      password: "",
      userType: "Conductor",
      id: null,
    });
  }

	handlePassword(event){
		this.setState({ password: event.target.value });
	}

	handleUsername(event){
		this.setState({ username: event.target.value });
	}

	selectUser(user){
		this.setState({ username: user.username, password: user.password, access: user.access, createModal: true, id: user.id, userType: user.user_type })
	}

	accessAdmin(event){
    this.setState({ access: event.target.value });
  }

	async createUser(){

      const { username, password, userType, access } = this.state;

      if(username && password){
        try {
              const usersResponse = await API.createUser(username, password, userType, access);
              console.log('users respuest =>', usersResponse);

              if (usersResponse.response == "SUCCESS") {
                  this.setState({
                    createModal: false, username: "", password: "", userType: "Conductor", access: "Reportes e itinerario"
                  });

                  this.getUsers();
              } else {
                alert("Ha ocurrido un error, vuelva a intentarlo mas tarde.")
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
      } else {
        alert("Favor de llenar todos los campos")
      }

	}

    async updateUser(){

      const { username, password, userType, access, id } = this.state;

      if(username && password){
        try {

              const usersResponse = await API.editUser(id, username, password, userType, access);
              console.log('users respuest =>', usersResponse);

              if (usersResponse.response == "SUCCESS") {
                  this.setState({
                    createModal: false, username: "", password: "", userType: "Conductor", access: "Reportes e itinerario"
                  });

                  this.getUsers();

                  alert("Usuario se ha editado correctamente :)")
              } else {
                alert("Ha ocurrido un error, vuelva a intentarlo mas tarde.")
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
      } else {
        alert("Favor de llenar todos los campos")
      }

  }



	renderUsers(){
    const { allUsers } = this.state;
		var access= "Admin Total";

		if(access == "Admin Total"){

      if(allUsers.length > 0){
          return this.state.allUsers.map( x => {

          return(
                  <div className = "user-info">
                    <p className = "two-u"> {x.username} </p>
                    <p className = "one-u"> {x.access}  <button onClick = {this.selectUser.bind(this, x)}> Editar </button> </p>
                  </div>
            );
        })
      } else {
        return    <Loader
                      type="Oval"
                      color="black"
                      height={50}
                      width={50}
                      visible = {this.state.visibleModal}
                  />

      }

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
		console.log("type => ", this.state.userType);
    console.log("state => ", this.state);

		return(
				<div>
          <button onClick = {() => this.setState({createModal: true})}> Crear usuario </button>
          <Modal open= {this.state.createModal} center onClose = {this.closeAndClean.bind(this)}>
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

              <div style = {{marginTop: 15, justifyConent: "center", alignSelf: "center"}}>
                <select id="type" className="select" onChange={ value => this.setState({userType: value.target.value })} value = {this.state.userType}>

                      <option value= "Conductor">
                        Conductor
                      </option>

                      <option value= "Administrador" >
                        Administrador
                      </option>
                </select>
              </div>

              {
                this.state.userType == "Administrador" ?
                  <div style = {{marginTop: 15, justifyConent: "center", alignSelf: "center"}}>
                    <select id="type" className="select" onChange={ value => this.setState({access: value.target.value })} value = {this.state.access}>
                          <option value= "Reportes e itinerario">
                            Reportes e itinerario
                          </option>

                          <option value= "Total" >
                            Total
                          </option>
                    </select>
                  </div>
                :
                  null
              }

              {
                  this.state.username && this.state.password ?
                      <div style = {{marginTop: 20, marginLeft: 5}}>
                        <button className="save-button" onClick = { this.state.id  == null ? this.createUser.bind(this) : this.updateUser.bind(this)}> Guardar cambios </button>
                      </div>
                  :
                  null
              }

          </Modal>

					<div className = "user-info">
			              <p className = "one-u bold"> Tipo de usuario</p>
			              <p className = "two-u bold"> Usuario</p>
			        </div>

					{this.renderUsers()}
				</div>
		);
	}
}


export default Users;
