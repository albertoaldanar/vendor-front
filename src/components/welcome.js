import React, {Component} from "react";

class Welcome extends Component{

	render(){

    var logged = localStorage.getItem("LOGGED");
    var access = localStorage.getItem("ACCESS");
    var user = localStorage.getItem("USER");

    console.log("local storage => ", logged, access, user);

		return(
			<div className ="welcome">
				<div className ="intro-ser">
					<p className ="title-serecsin">Serecsin Analytics</p>
					<img  width ="70" height = "70" src ="https://image.flaticon.com/icons/svg/1162/1162302.svg"/>
				</div>
				<p className ="sub-title">Software de analisis financiero y de logistica de la empresa Serecsin SA DE CV.</p>
			</div>
		);
	}
}


export default Welcome;
