import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from "../src/components/home";
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import registerServiceWorker from './registerServiceWorker';

// var login = localStorage.setItem('login', "YES");

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
