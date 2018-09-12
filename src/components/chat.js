import React, {Component} from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import ChartPrediction from "./reusable/chartPrediction"
library.add(faStroopwafel)

class Chat extends Component {
  render(){
    return(
      <div>
        Chat
      </div>
    );
  }
}


export default Chat;
