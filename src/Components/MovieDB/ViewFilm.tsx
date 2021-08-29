import React from "react";
import { IMovies, en_US } from "../../Redux/interfaces";
import "./../../styles/Movies/view_item_movie.scss";
import {
  CircularProgressProps,
  Box,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { Redirect, Prompt } from "react-router-dom";

const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number }
) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        bottom={0}
        right={0}
        left={0}
        top={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="secondary"
          style={{
            fontSize: "22px",
            position: "absolute",
            left: "-37px",
            top: "-17px",
          }}
        >{`${(props.value / 10).toFixed(1)}`}</Typography>
      </Box>
    </Box>
  );
};

type Props = IMovies;

const Viewfilm: React.FC<Props> = (props) => {
  return (
    <>
{/* {props.id === undefined && <Redirect to = "TopMovies"/>} */}
    <div className="wrapper_view_film">
      <div className="name_view_film">{props.title}</div>
      <div className="wrapper_img_circularProgress_view_film">

        <div>
          <img
            className="img_view_film"
            src={
              "https://image.tmdb.org/t/p/w300_and_h450_bestv2" +
              props.backdrop_path
            }
          ></img>
        
          <CircularProgressWithLabel
            color="secondary"
            className="circular_progress"
            value={props.vote_average * 10}
            size={60}
          />
        </div>

        <div className="description_view_film">
          <div className="description__">Описание</div>
          <span>{props.overview !== "" ?  props.overview : "Описания отсутствует"}</span>
          </div>
      </div>

      {/* <div>{props.vote_average}</div> */}

    </div>
    </>
  );

          }
export default Viewfilm;
