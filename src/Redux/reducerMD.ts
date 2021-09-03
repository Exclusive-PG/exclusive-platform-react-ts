
import { WrapperDash } from './interfaces';



 const sizeIcon : string = "fa-2x";





let initialState : WrapperDash = {
    mainDash: [
        {id:2 ,name : "ToDo List" , url : `fas fa-tasks ${sizeIcon}`, isMain : false , action : "",styleDashBoard:{background:"#8E44AD",color:"#fff"}},
        {id:3 ,name : "Exchange Rates",  url : `fas fa-dollar-sign ${sizeIcon}`,  isMain : false , action : "",styleDashBoard:{background:"#2ECC71",color:"#fff"}},
        {id:4 ,name : "Top Movies" , url : `fas fa-film ${sizeIcon}`,  isMain : false , action : "",styleDashBoard:{background:"#E74C3C",color:"#fff"}},
        {id:5 ,name : "Weather" , url : `fas fa-cloud-sun-rain ${sizeIcon}`,  isMain : false , action : "",styleDashBoard:{background:"#3498DB ",color:"#fff"}},
        
    ],
}

const reducerDashBoard = (state : WrapperDash = initialState , action:string )  =>{

    
       return state;
    

}

export default reducerDashBoard;