import React from 'react';
import ReactDOM from 'react-dom';
import './index1.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Kepper from './compo/Kepper';


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
