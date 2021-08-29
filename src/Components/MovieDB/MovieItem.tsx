import React from 'react';

import s from './../../styles/Movies/movies-styles.module.scss'
// import { useSelector } from 'react-redux';
// import { AppState } from '../../Redux/store';
import {  en_US, IMovies } from './../../Redux/interfaces';

type Props = IMovies & en_US;

const MovieItemSlider:React.FC<Props> = (props) => {

const {MoviePage} = props;


  // const {en} = useSelector((state:AppState)=>state.ChangeLanguageReducer);
  // console.log(en);

    return(
    <>
        <img  src = {"https://image.tmdb.org/t/p/w1280" + props.backdrop_path}></img> 
        <div className={s.name_film}>{props.title}</div>
        <div className={s.about_film_slider}>
       <div className="published">{MoviePage.published} <span style = {{color:"#ff0000"}}>{props.release_date.replace(/-/g," ").split(" ").reverse().join(" / ")}</span> </div>
         <div className="update">{MoviePage.update} <span style = {{color:"#ff0000"}}>{props.release_date.replace(/-/g," ").split(" ").reverse().join(" / ")}</span></div>
       <div className="rating">{MoviePage.rating} <span style = {{color:"#ff0000"}}>{props.vote_average}</span></div>
       <div className="popularity">{MoviePage.popularity} <span style = {{color:"#ff0000"}}>{props.popularity}</span></div>
       <div className="sexual_content">{MoviePage.sexual_content} <span style = {{color:"#ff0000"}}>{props.adult ? "Yes" : "No"}</span></div>
        </div>
        </>
    );

}
export default MovieItemSlider;