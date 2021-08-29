import React  from "react";
import s from "./../../styles/NewsApp/NewsApp.module.css"
import { Button } from "@material-ui/core";

type pagination = {
    maxPageSize : number
    listPages : Array<number>
    changePageHandler : (page : number) => void
    currentPage : number | string
}

export type PropsPaginationProps = {
    pagination : pagination,

}

let defaultValuePage:number = 0;


const PaginationNews:React.FC<PropsPaginationProps> = ({pagination }) =>{



    return(
        <div style = {{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
                      {
                            
                        pagination.listPages.map((page:number ,index:number)=>(
                              <span key= {page} >
                                 
                                   <Button onClick = {()=>{pagination.changePageHandler(page);defaultValuePage = -1}} variant="contained" color={(page === pagination.currentPage) || (index === defaultValuePage && defaultValuePage === 0 ) ? "secondary" : "inherit"} style ={{padding : "0px",margin:"0 10px 10px 0"}}>{page}</Button>
                              </span>
                                  ))
                                }
            </div>

    );
}

export default PaginationNews;


