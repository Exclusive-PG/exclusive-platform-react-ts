import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import s from './../../styles/Movies/movies-styles.module.scss';
import  './../../styles/Movies/movies.scss'
import logo from './../../images/movie_logo.png';
import { Button, CircularProgress } from '@material-ui/core';
import SearchMovie from './SearchMovie';
import { API_MOVIES } from '../../api/api';
import { IMovies } from '../../Redux/interfaces';
import { Context } from '../context.js';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link, Prompt, Redirect } from 'react-router-dom';
import SliderMovie from './SliderMovie';
import Viewfilm from './ViewFilm';





const Movies = () => {


const [movieList,setMovieList] = useState<IMovies[]>([]);

// const [language,setLanguage ]  = useState<string>("ru");

const [currentPage , setCurrentPage] = useState<number>(1);

const [totalPages , setTotalPages] = useState<number>(0);

const [loading,setLoading] = useState<boolean>(false);

const [viewFilm,setViewFilm] = useState<string>("");

const [search,setSearchFilm] = useState<string>("");

let Pagination : Array<number>  = [];



const getTopMovieList = () =>{
  console.log(search);
  axios.get(search === "" ? ` https://api.themoviedb.org/3/movie/popular?api_key=${API_MOVIES}&language=ru-RU&page=${currentPage} ` :
  `https://api.themoviedb.org/3/search/movie?api_key=${API_MOVIES}&language=ru-RU&query=${search}&page=${currentPage}&include_adult=false`
   )
  .then((response:any)=>{
      console.log(response);
      const {data} = response;
      
      setMovieList(data.results);
      setTotalPages(data.total_pages);
    setTimeout(() =>   setLoading(true), 1000);
  })
  .catch((error:Error)=> console.log(error.message));
}



const changePageHandler = (page:number) =>{
if(page === currentPage) return

else{
  setCurrentPage(page) 
  setLoading(false)
    }
}
////context function

const refreshSearchFilm = (movies:any)=> setMovieList(movies);

const refreshTotalPages = (pages:number) =>  setTotalPages(pages);
 
const changeSearchSystem = (search:string) => setSearchFilm(search);




/// create Pagination link
const CreatorPagination = (countPage:number) : void =>{
  for(let i = 1 ; i <= countPage;i++){
     Pagination.push(i);
  }

  console.log("pagination changed");
}



/////get request TopMovie

useEffect(()=>getTopMovieList(),[search])


useEffect(()=>getTopMovieList(),[currentPage])

if(Pagination.length === 0)
{
CreatorPagination(totalPages)

}
    return(
      <Context.Provider value = {{refreshSearchFilm,refreshTotalPages,changeSearchSystem}}>

{viewFilm === "" ?
        <section >
          <Redirect to="/TopMovies"/>
            <div className={s.toolbar + ' ' + s.wrapperMovie}>top m{<img src = {logo}></img>}vie</div>      
                  <SliderMovie/>
                 <div className = {s.wrapperMovie}>

                    <div className="search___field_movie"><SearchMovie/></div>

                    <div className = {loading === true ?  s.listMovie : s.loading }>
                   { loading === true ? 
                        movieList.map((item:IMovies,index:number) =>(
                         
                          <div key ={item.id} className = {item.backdrop_path !== null ? `items item__${index}_` : "logo_not_found"} >      
                          {item.backdrop_path !==null   ?                                        
                                <>
                                  <img  className = "image_film_list" src = {"https://image.tmdb.org/t/p/w780" + item.backdrop_path}></img> 
                                      <div className="data_film_list">
                                        <div>{item.title}</div>
                                            <div>{item.release_date === undefined ? item.release_date :  item.release_date.replace(/-/g," ").split(" ").reverse().join(" / ")}</div>
                                              <div style = {{display:"flex",alignItems:"center",justifyContent:"center"}}><FavoriteBorderIcon color = "secondary" style = {{paddingRight:"5px"}}/>{item.vote_average}</div>
                                             <div> <Link  style = {{textDecoration :"none"}} to ={ `/TopMovies/film/${item.id}`} ><Button onClick = {()=>setViewFilm(item.id.toString())} variant="contained" color="secondary">Подробнее</Button> </Link> </div>
                                              
                                      </div>
                                      <div className = "background_hover"></div>
                                </>
                                  :
                                  <img  src = {logo}></img>
                          }
                          </div>      
                             
                         
                              )): <CircularProgress key = {Math.random()}color="secondary" />
                    
                    }
                    </div>
                          <div className="pagination">
                            {console.log(Pagination)}
                                {
                                  
                                  Pagination.map((page:number)=>(
                                        <span key= {page} >
                                          <Button onClick = {()=>{changePageHandler(page)}} variant={page === currentPage ? "contained" : "outlined"} color="secondary" style ={{padding : "0px",margin:"0 10px 10px 0"}}>{page}</Button>

                                          </span>
                                  ))
                                }
                          </div>
                 </div>

        </section>

        :
        <main>
         
      {
           movieList.map((item:IMovies,index:number) =>(
                   
            item.id.toString() === viewFilm &&  <section key = {item.id} className = "section_view__film">  <Viewfilm {...item}/> </section>
          
         ))
         
                         
      }
        <Prompt message={() =>  {setViewFilm("");getTopMovieList();}}/>
        </main>
                              }
        </Context.Provider>
    );
}

export default Movies;

