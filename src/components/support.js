import React, {Component} from "react";


class Support extends Component{

	render(){
		return(	
			<div>
				<p>SOPORTE TECNICO PARA LA APLICACIÓN MOVIL DE SERECSIN</p>

				<div className = "space-a">
					<p className = "title-privacy">
						Si surge alguna falla en la aplicación, estos son los datos de nuestro desarrollador para pasar el reporte.
					</p>
				</div>

				<ul className ="title-privacy">
					<li>Nombre Alberto Aldana Ríos</li>
					<li>Teléfono: 667 105 7068</li>
					<li> Correo: albertoaldanar@gmail.com</li>
				</ul>
			</div>
		);
	}

}

export default Support;