import React, {Component} from "react";

class Welcome extends Component{


	logout(){
		localStorage.removeItem('login');
	}

	render(){

		return(
			<div className ="welcome">
				<div className ="intro-ser">
					<p className ="title-serecsin">Serecsin Analytics</p>
					<img  width ="70" height = "70" src ="https://image.flaticon.com/icons/svg/1162/1162302.svg"/>
				</div>
				<p className ="sub-title">Software de analisis financiero y de logistica de la empresa Serecsin SA DE CV.</p>

				<button onClick = {this.logout.bind(this)}>Cerrar sesión</button>
			</div>
		);
	}
}


export default Welcome;