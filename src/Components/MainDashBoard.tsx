import React from 'react';
import s from "./../styles/main_dashborad.module.css";
import { WrapperDash } from '../Redux/interfaces';
import { Route , Link} from "react-router-dom";
//import 'font-awesome/css/font-awesome.min.css';



const MainDashBoard:React.FC<WrapperDash> = ({mainDash}) =>{
debugger



    return(
        <section className = {s.section_dashboard}>
            <div className={s.grid}>
                
                   {
                    mainDash.map(dash => (
                        dash.isMain === true ? 
                       <Link to = {`/${dash.name.split(' ').join('')}`} title = {dash.name} className={s.main_section} key = {dash.id} 
                        style = {{background:dash.styleDashBoard.background,
                        color : dash.styleDashBoard.color
                        }}> 
                              <div className={s.main_name_section}><i className={dash.url}></i></div>
                              </Link>  
                         : 
                         <Link to = {`/${dash.name.split(' ').join('')}`} title = {dash.name} className={s.section} key = {dash.id} 
                         style = {{background:dash.styleDashBoard.background,
                                   color : dash.styleDashBoard.color
                         }}>
                              <div className={s.name_section}><i className={dash.url}></i></div>

                          </Link>  
                        
                    ))
                
                }
                   
            
            </div>

        </section>
    );
}
export default MainDashBoard;