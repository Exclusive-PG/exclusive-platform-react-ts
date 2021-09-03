import React, { useState, useEffect } from 'react';
import  './../../styles/main_header.scss';
import {Person , Mic} from '@material-ui/icons';
import {GoogleLogin, GoogleLoginResponse} from 'react-google-login';
import { ClientID } from '../../api/api';
import { PropsHeader } from './headerC';
import { IGoogleLoginData } from '../../Redux/interfaces';
import { Avatar } from '@material-ui/core';
import { getDate } from '../../Redux/Global_functions';
import { STATIC_USERNAME_GOOGLE } from '../../Redux/reducerGoogleLogin';







const Header = ({googleLogin,GoogleAC}) =>{
    //hook get date //DATE
    const [date , setDate] = useState("00:00");


      useEffect(()=>{
        const interval =  setInterval(()=>{
             setDate(getDate);
         },1000);
         return () => clearInterval(interval);
     },[]);


////End Date ------------------------------------


///Google Login

const responseGoogle =(response )   =>{

    console.log(response.getBasicProfile().getEmail());
    const {name , imageUrl} = response.profileObj;

/////  dispatch data Google Login ///

    GoogleAC({
       userName: name,urlImage : imageUrl,SignedTime : Date.now().toString(),isLocalStorage : true
    });

    console.log(response);
    console.log(`Sign in account : ${getDate()}`);
}



/// Load Google Account from LocalStorage
useEffect(()=>{
         
    if(localStorage.getItem("SESSION_DATA")){
    
        let data = JSON.parse(localStorage.getItem("SESSION_DATA"));
        
        GoogleAC(data);
        
        }   
        
         },[])
    

    return(
        <header className = "main__screen_header">

        <div className="left_block">
    <>{googleLogin.userName === STATIC_USERNAME_GOOGLE && <GoogleLogin clientId = {ClientID} onSuccess= {responseGoogle} onFailure = {responseGoogle} /> }</>
        
        
        <div className="data-user">
        <div className="section_text_data_user">
        <div className="nickname_user">{googleLogin.userName}</div>
        <div className="section_status">
        <div className="status_user">Online</div>
        <div className="icon_status"></div>
        </div>
        </div>
        
        <div >{googleLogin.urlImage ? <Avatar alt={googleLogin.userName} src= {googleLogin.urlImage} style ={{marginRight:10 , width:80,height:80}} /> : <Person style = {{fontSize : 40,color:"primary"}}/> }</div>
        </div>


     </div>  
            

        <div className="right_block">
        <div className="date_now_user">{date}</div>

        </div>
        </header>
    );
}

export default Header;