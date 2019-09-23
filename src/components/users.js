import React, {Component} from "react";
import * as firebase from 'firebase';

class Users extends Component{

	constructor(props){
    	super(props);

    	this.state = {allUsers: []}

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

	componentWillMount(){
		return this.getUsers();
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

		return this.state.allUsers.map(x => {

		    return(
		          <div className = "user-info">
		          	<p className = "two-u"> {x.nombre} </p>
		            <p className = "one-u"> {x.access} </p>
		             
		          </div>
		      );
		})
	}

	render(){
		console.log(this.state.allUsers);

		return(
			<div>
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