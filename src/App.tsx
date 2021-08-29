import React, { useState } from "react";
import "./App.scss";

import { Route, Redirect } from "react-router-dom";
import Home from "./Components/Home"
import ToDoList from "./Components/ToDoList/ToDoList";
import Weather from "./Components/weather/Weather";
import Movies from "./Components/MovieDB/Movies";
//import exchangeRates from "./Components/Exchange_rates/exchangeRates";
import ExchangeRates from "./Components/Exchange_rates/exchangeRates"
import NewsApp from "./Components/NewsApp/NewsApp";
import RadioApp from "./Components/Radio/Radio";
// import MovieBuild from "./Components/MovieDB/MovieBuild";




const App: React.FC = () => {

  return (
    <>


     <Redirect from="/" to = "/home"/> 
    
     <Route path = "/home" render = {()=><main className="app_wrapper"> <Home/> </main>}></Route> 
  
      <Route path = "/ToDoList" render = {() => <ToDoList/>}></Route>
      <Route path = "/Weather" render = {() => <Weather/>}></Route>
      <Route path = "/TopMovies" render = {() => <Movies/>}></Route>
       <Route path = "/ExchangeRates" render ={()=> <ExchangeRates/> }></Route>
       <Route path = "/News" render={()=><NewsApp/>}></Route>
       <Route path = "/Radio" render={()=><RadioApp/>}></Route>
      </>
  );
};

export default App;
