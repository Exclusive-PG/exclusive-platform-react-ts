import React, { useState, ChangeEvent, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { API_MOVIES } from '../../api/api';
import { Context } from '../context.js';
import HomeIcon from '@material-ui/icons/Home';

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


const SearchMovie:React.FC = () =>{

const {changeSearchSystem,refreshSearchFilm,refreshTotalPages} = useContext(Context);


const changeSearchText = (event:ChangeEvent<HTMLInputElement>) =>  setSearchText(event.target.value) ;


const getSearchMovie = () => {
if(searchText === "")  return;

else{
  axios.get(`
  https://api.themoviedb.org/3/search/movie?api_key=${API_MOVIES}&language=ru-RU&query=${searchText}&page=1&include_adult=false`)
  .then((response:any)=>{
      console.log(response);
      const {data} = response;
      
      refreshSearchFilm(data.results);
      refreshTotalPages(data.total_pages);
      changeSearchSystem(searchText);

      console.log("SEARCH TEXT :  "  + searchText);
  })
  .catch((error:Error)=>{
      console.log(error.message)
  })
}
}

    const [searchText,setSearchText] = useState<string>("");

   const classes = useStyles();

    
    return(
        <Paper  className={classes.root}>
          <HomeIcon color = "secondary" style = {{margin: "0 20px",fontSize:40}} onClick = {()=>{
          //  if(searchText === "") return
           changeSearchSystem("");
           setSearchText("")
            }} />
        <InputBase
          className={classes.input}
          placeholder="Поиск фильмов"
          value ={searchText}
          onChange = {changeSearchText}
        />
        <IconButton  className={classes.iconButton}  aria-label="search" onClick = {()=>getSearchMovie()}>
          <SearchIcon />
        </IconButton>
      
      </Paper>
    );
}

export default SearchMovie;