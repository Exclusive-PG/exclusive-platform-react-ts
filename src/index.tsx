import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './Redux/store';
//import {BrowserRouter as Router} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { HashRouter} from "react-router-dom";

ReactDOM.render(
 <React.StrictMode>
<HashRouter basename = {process.env.PUBLIC_URL}>  
   {/* <Router> */}
  <Provider store = {store}>

    <App />
    </Provider>
    {/* </Router> */}
    </HashRouter>    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
