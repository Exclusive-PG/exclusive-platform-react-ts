import React , {useState,useEffect} from "react";
import s from "./../../../styles/NewsApp/NewsApp.module.css"


export type propsNewsItem = {
    urlToImage : string,
    title : string,
    publishedAt : string,
    author : string,
    url:string
}



const NewsItem:React.FC<propsNewsItem> = (props) =>{

    return(

                <div className = {s.elem_grid}  >
                <div className = {s.wrapper_img}><a href={props.url} ><img className={s.img_news} src={props.urlToImage} /></a></div>
                <div className ={s.data_news}>
                <div className={s.title}><a href={props.url}>{props.title}</a></div>
                <div className={s.data_time_author}>
                    <div className=""><i className="far fa-clock"></i>  {props.publishedAt.replace(/[a-z]/gi," ")}</div>
                    <div className=""><i className="far fa-user"></i> {props.author}</div>
                    </div>
                </div>
                 </div>
                
            
    );
}

export default NewsItem;