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


const [movieList,setMovieList] = useState([]);

 const [language,setLanguage ]  = useState("en");

const [currentPage , setCurrentPage] = useState(1);

const [totalPages , setTotalPages] = useState(0);

const [loading,setLoading] = useState(false);

const [viewFilm,setViewFilm] = useState("");

const [search,setSearchFilm] = useState("");

let Pagination   = [];



const getTopMovieList = () =>{
  console.log(search);
  axios.get(search === "" ? ` https://api.themoviedb.org/3/movie/popular?api_key=${API_MOVIES}&language=${language}&page=${currentPage} ` :
  `https://api.themoviedb.org/3/search/movie?api_key=${API_MOVIES}&language=ru-RU&query=${search}&page=${currentPage}&include_adult=false`
   )
  .then((response)=>{
      console.log(response);
      const {data} = response;
      
      setMovieList(data.results);
      setTotalPages(data.total_pages);
    setTimeout(() =>   setLoading(true), 1000);
  })
  .catch((error)=> console.log(error.message));
}



const changePageHandler = (page) =>{
if(page === currentPage) return

else{
  setCurrentPage(page) 
  setLoading(false)
    }
}
////context function

const refreshSearchFilm = (movies)=> setMovieList(movies);

const refreshTotalPages = (pages) =>  setTotalPages(pages);
 
const changeSearchSystem = (search) => setSearchFilm(search);




/// create Pagination link
const CreatorPagination = (countPage)   =>{
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
                        movieList.map((item,index) =>(
                         
                          <div key ={item.id} className = {item.backdrop_path !== null ? `items item__${index}_` : "logo_not_found"} >      
                          {item.backdrop_path !==null   ?                                        
                                <>
                                  <img  className = "image_film_list" src = {"https://image.tmdb.org/t/p/w780" + item.backdrop_path}></img> 
                                      <div className="data_film_list">
                                        <div>{item.title}</div>
                                            <div>{item.release_date === undefined ? item.release_date :  item.release_date.replace(/-/g," ").split(" ").reverse().join(" / ")}</div>
                                              <div style = {{display:"flex",alignItems:"center",justifyContent:"center"}}><FavoriteBorderIcon color = "secondary" style = {{paddingRight:"5px"}}/>{item.vote_average}</div>
                                             <div> <Link  style = {{textDecoration :"none"}} to ={ `/TopMovies/film/${item.id}`} ><Button onClick = {()=>setViewFilm(item.id.toString())} variant="contained" color="secondary">Detail</Button> </Link> </div>
                                              
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
                                  
                                  Pagination.map((page)=>(
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
           movieList.map((item,index) =>(
                   
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

