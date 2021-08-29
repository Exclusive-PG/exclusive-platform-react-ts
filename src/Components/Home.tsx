import React from "react";
import HeaderC from "./header/headerC";
import DashBoardC from "./MainDashboard/Dashboard_con";
import TwoRowDashBoard from "./Main_News/TwoRowDashBoard";



const Home:React.FC = () =>{
    return(
        <>
      <HeaderC/>
     <DashBoardC/>
     
     <TwoRowDashBoard/>
        </>
    );
}
export default Home ;