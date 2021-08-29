import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../Redux/store';
import { IMovies } from '../../Redux/interfaces';
import MovieItemSlider from './MovieItem';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import s from './../../styles/Movies/movies-styles.module.scss';
import axios from 'axios';
import { API_MOVIES } from '../../api/api';



const SliderMovie:React.FC = ()=>{


    const {en} = useSelector((state:AppState)=>state.ChangeLanguageReducer);
    const {ru} = useSelector((state:AppState)=>state.ChangeLanguageReducer);

const [language,setLanguage ]  = useState<string>("en");
const [moviesTop,setMoviesTop] = useState<IMovies[]>([]);
const[sliderPosition,setsliderPosition] = useState<number>(0);



const getTopMovieSlider = ()=>{
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_MOVIES}&language=ru-RU&page=1`)
    .then((response:any)=>{
        console.log(response);
        const {data} = response;
        setMoviesTop(data.results);
    })
    .catch((error:Error)=> console.log(error.message));
}


useEffect(()=>getTopMovieSlider(),[])


//////Start contollers slider 
const moveSliderNext = ()=>{
    if(sliderPosition > -1900) setsliderPosition(sliderPosition - 100);
    else  setsliderPosition(0);
   
  }
  
  const moveSliderPrev = ()=>{
    if (sliderPosition >= 0) setsliderPosition(-1900); 
    else setsliderPosition(sliderPosition + 100);
  }
  ///////End controllers slider
  
  useEffect(() => {
    const interval : NodeJS.Timeout   = setInterval(() => {
  
  
      if(sliderPosition > -1900) setsliderPosition(sliderPosition - 100);
  
       else  setsliderPosition(0);
    }, 5000);
  
    return () => clearInterval(interval);
  },[sliderPosition]);
  
  



    return(
      
 <div className={s.wrapper_slider}>
        <div className={s.slider__line} style = {{left:sliderPosition + '%'}}>

                {
                moviesTop.map((movie:IMovies,index:number)=>(
                    <div key = {movie.id}  className = {s.imageTopSlider}>
                    {language === "en" ?  <MovieItemSlider {...movie}  {...en}/>  : <MovieItemSlider {...movie}  {...ru}/>             
                    }
                    </div>
                ))} 

        </div>
<div className = {s.controllersSlider}>

        <ArrowBackIosIcon color="secondary" style={{ fontSize: 40 }} className = {s.leftArrow} onClick = {()=> moveSliderPrev()}/>
        <ArrowForwardIosIcon color="secondary" style={{ fontSize: 40 }} className = {s.rightArrow} onClick = {() =>moveSliderNext()}/>
          
         </div>
</div>
    );
}

export default SliderMovie;