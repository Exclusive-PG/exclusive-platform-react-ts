import React , {useState,useEffect, ChangeEvent, KeyboardEventHandler, useRef} from "react";
import axios from "axios";
import { API_NEWS } from "../../api/api";
import s from "./../../styles/NewsApp/NewsApp.module.css"
import { CircularProgress, Paper, InputBase, Theme, Button } from "@material-ui/core";
import NewsItem, { propsNewsItem } from "./NewsItem/NewsItem";
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import PaginationNews, { PropsPaginationProps } from "./Pagination/PaginationNews";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 100 + '%',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

const NewsApp:React.FC = () =>{

    const [keyWord,setKeyWord] = useState<string>("news");

    const [stateNews,setStateNews] = useState<any>();

    const [currentPage, setCurrentPage] = useState<number|string>("1");

    const MaxPageSize:number = 5;

    const Pagination:Array<number> = [];
    
    const classes = useStyles();

    const [loading,setLoading] = useState<boolean>(false);
   
    let ref = useRef<HTMLInputElement>();

   // useEffect(()=>GetNews(),[])  

    useEffect(()=>GetNews(),[currentPage])

    const CreatorPagination = (countPage:number) : void =>{
      for(let i = 1 ; i <= countPage;i++){
        Pagination.push(i);
      }

    }

    const changePageHandler = (page:number) =>{
      if(page === currentPage) return
      
      else{
        setCurrentPage(page) 
        setLoading(false)
          }
      }

    console.log(stateNews)


    const GetNews = () =>{

    setLoading(false)
    //https://newsapi.org/v2/everything?q=bitcoin&apiKey=e5dea616fd414320a8b664c885432108
    
    axios.get(`https://newsapi.org/v2/everything?q=${keyWord}&apiKey=${API_NEWS}&language=en&page=${currentPage}`).then((response: any)=>{
        console.log(response)
    setStateNews(response.data);
    setLoading(true)
    }).catch((err:Error)=>{
        console.log(err);
    })

    }

    const changeInputNews = (event : ChangeEvent<HTMLInputElement>) => setKeyWord(event.target.value);

    const pressKeySearchNews = (event :  React.KeyboardEvent<HTMLDivElement>) => (event.key === "Enter" && ref.current!.value !== "" )  && GetNews()

    CreatorPagination(MaxPageSize)

    let propsPagination:PropsPaginationProps = {
      pagination:{
        maxPageSize : MaxPageSize,
        listPages : Pagination,
        changePageHandler : changePageHandler,
        currentPage : currentPage
      }
    }
    
    return(
        <main>
                {(stateNews !== undefined && loading === true)?<div>
    <section className={s.wrapper_news}>
    <h1 className={s.nameApp}>Fresh News</h1>
    <Paper  className={classes.root} >
        <InputBase
          className={classes.input}
          inputRef = {ref}
          placeholder="Search News"
          value ={keyWord}
           onChange = {changeInputNews}
           onKeyPress = {pressKeySearchNews}
        />
        <IconButton  className={classes.iconButton} onClick = {GetNews} aria-label="search">
     <SearchIcon/>
        </IconButton>
      
      </Paper>
      <h2 className={s.headline_news}><span className={s.span_style_news_headline}>Articles  <i className="fas fa-newspaper"></i></span></h2>
        <div className={s.grid_news} style = {{marginTop:"20px"}}>
           
      
           { stateNews.articles.map((item:propsNewsItem,index:number)=>(
        
                <NewsItem key={index} {...item} />)) 
           }
        </div>
        <div className={s.pagination}>
                                <PaginationNews   {...propsPagination}   />
                          </div>
        </section>  
        <section className={s.wrapper_news} style = {{display: loading === true ? "block" : "none"}} >
        <h2 className={s.headline_news}> <span className={s.span_style_news_headline}>Live Streams  <i className="fas fa-tv"></i></span></h2>
       
         <div className={s.grid_news} style = {{marginTop:"20px"}}>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/9Auq9mYxFEE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/ErX-LbZW-zE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/aHh8rA0hks8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/-upyPouRrB8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        </section>
        </div>:
                <div className = {s.center_loading}><CircularProgress key = {Math.random()} color="primary" /></div>
            }
        </main>
    );
}

export default NewsApp;




// <div className = {s.elem_grid} key = {index} >
                // <div><a href={item.url}><img className={s.img_news} src={item.urlToImage} /></a></div>
                // <div className ={s.data_news}>
                // <div className={s.title}><a href={item.url}>{item.title}</a></div>
                // <div className={s.data_time_author}>
                //     <div className=""><i className="far fa-clock"></i>  {item.publishedAt.replace(/[a-z]/gi," ")}</div>
                //     <div className=""><i className="far fa-user"></i> {item.author}</div>
                //     </div>
                // </div>
                //  </div>
                // 