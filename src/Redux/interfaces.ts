
import {
  GOOGLE_LOGIN_DATA,
  COMPLETE_TODO_ITEM,
  ADD_NEW_TODO_ITEM,
  REMOVE_TODO_ITEM,
  REFRESH_INPUT_TODO,
  LOAD_TODO_ITEM,
  PLAY_NOW,
  PLAY_OR_STOP,
} from "./types";

export interface dashBoard {
  id: number;
  name: string;
  url: string;
  isMain: boolean;
  action: string;
  styleDashBoard : styleDashBoard;
}

interface styleDashBoard{
  color: string;
  background : string;
}


export interface IGoogleLoginData {
  userName: string;
  urlImage: string;
  SignedTime: string;
  isLocalStorage: boolean;
}

export interface IGoogleLogin {
  googleLogin: IGoogleLoginData;
}

export interface WrapperDash {
  mainDash: Array<dashBoard>;
}

export interface IGoogleLoginAC {
  type: typeof GOOGLE_LOGIN_DATA;
  googleLogin: IGoogleLoginData;
}

///Start ToDO types ///////

export interface IToDo {
  id: string;
  contentToDo: string;
  completed: boolean;
  dateAdded: string;
}
export interface StateToDo {
  todo: Array<IToDo>;
  inputTodo: string;
}

export interface ActionCompletedTodo {
  type: typeof COMPLETE_TODO_ITEM;
  id: string;

}

export interface ActionAddTodo {
  type: typeof ADD_NEW_TODO_ITEM;
  inputTodo: string;
}
export interface ActionRemoveTodo {
  type: typeof REMOVE_TODO_ITEM;
  id: string;
}
export interface RefreshInput {
  type: typeof REFRESH_INPUT_TODO;
  inputTodo: string;
}
export interface LoadTodo {
  type: typeof LOAD_TODO_ITEM;
  local: Array<IToDo>;
}




export interface ActionPlayNowRS{
  type: typeof PLAY_NOW;
  data : RadioStation 
}

export interface ActionPlayOrPauseRS{
  type : typeof PLAY_OR_STOP ;
  //isPlaying : RadionStationIsPlaying
}

export type Actions = ActionAddTodo &
  ActionCompletedTodo &
  ActionRemoveTodo &
  RefreshInput &
  LoadTodo & ActionPlayNowRS & ActionPlayOrPauseRS;

///End ToDO types ///////

/////CHANGE LANGUAGES TYPE //////
interface LanguagePageMovie {
  readonly published: string;
  readonly update: string;
  readonly rating: string;
  readonly popularity: string;
  readonly sexual_content: string;
}

export interface en_US {
  MoviePage: LanguagePageMovie;
}

export interface ru_RU {
  MoviePage: LanguagePageMovie;
}

export interface Language {
  en: en_US;
  ru: ru_RU;
}

//////////TYPE MOVIES ///////////

export interface IMovies {
  image: string;
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  backdrop_path: string;
  popularity: string;
  adult: boolean;
  overview: string;
}

////////////TYPE EXCHANGE RATES /////////////


export interface IExchangeRates {
  base_code :string;
  base :string;
  conversion_rates: {[index:string]:any};
  time_last_update_utc: string;
}

//radio stations

export interface RadionStationStyle {
  color?:string,
  background:string
}

export interface RadioStation{
  name:string,
  stream : string,
  style:RadionStationStyle
  selected : boolean,
  
}
export interface IRadioStations{
 data :Array<RadioStation> 
 playNow : RadioStation
}

