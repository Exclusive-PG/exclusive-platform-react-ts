import React , {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import s from "./../../styles/main_dashborad.module.css"






const TwoRowDashBoard:React.FC = () =>{




    return(
        <>
        <div className={s.two_row_section}>
                <Link to="/News" title = "news" className={`${s.app_two_row} ${s.newsApp}`}><i className="fas fa-newspaper fa-3x"></i></Link>
                <Link to="/Radio" title = "radio" className={`${s.app_two_row} ${s.radioApp}`}><i className="fas fa-headphones fa-3x"></i></Link>
            </div>
        
        </>
    );
}

export default TwoRowDashBoard;
