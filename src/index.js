import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let password;

if (localStorage.getItem("password")) {
    password = localStorage.getItem("password")
} else {
    password = prompt("Contraseña:");
}

if(password === "0000") {
    localStorage.setItem("password", password)
    ReactDOM.render(<App />, document.getElementById('root'));
} else {
    ReactDOM.render(<div>Construccion!</div>, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
