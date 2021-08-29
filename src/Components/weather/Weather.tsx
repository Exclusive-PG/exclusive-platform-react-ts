import React, { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import s from './../../styles/Weather/weather.module.scss'
import CloudIcon from '@material-ui/icons/Cloud';
import { TextField, Button } from '@material-ui/core';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
// import ResponseImg from './../../images/weather_pesponse_.jpg';




interface ITemperature{
    temperature : string,
    temp_max :  string,
    temp_min : string,
    feels_like : string,
    humidity : string
}
interface IWeather{
    main : string,
    description :  string,
    icon : string,
    visibility : string,
    windSpeed : string
}

interface ILocation {
    city : string
    country :string
}
interface IInput {
    helperText : string,
    error : boolean
}

const Weather:React.FC = () =>{

    const APIkey = '39f0a57b825915c88c4e6fd88440ea37';
    const lang = 'en'
    const version = '2.5';


    const [city , setCity] = useState<string>("");
    const [parallax , setParallax] = useState<string>(`translate(0px)`);
    const [input , setInput] = useState<IInput>({helperText:"",error : false});
 //// data GET-request  
    const [dataLocation,setLocation] = useState<ILocation>({city:"",country:""});
    const [temparature , setTemparature] = useState<ITemperature>({temperature:"0",temp_max:"0",temp_min:"0",feels_like:"0",humidity : "0%"});
    const [dataWeather , setWeather] = useState<IWeather>({main:"",description:"",icon:"0",visibility:"0",windSpeed:"0"});
    const [isActiveBtn, setBtn] = useState<boolean>(false);
    const [responseIsOk , setResponseStatus] = useState<boolean>(false);



const convertToCelsius = (celsius:string) : string => (parseInt(celsius) - 273).toString();
const convertMeterToKm = (meter:string) : string => (parseInt(meter) * Math.pow(10,-3)).toString();


const getWeather = (location:string) =>{
    axios.get(`https://api.openweathermap.org/data/${version}/weather?q=${location}&appid=${APIkey}&lang=${lang}`).
then((response:any)=>{

    const {data} = response;
    const {main,weather} = data;

console.log(data);

setResponseStatus(true) 


    let temp:ITemperature = {
        temperature : convertToCelsius(main.temp),
        temp_max :   convertToCelsius(main.temp_max),
        temp_min : convertToCelsius(main.temp_min),
        feels_like:convertToCelsius(main.feels_like),
        humidity : main.humidity
    }

    let tempDataWeather:IWeather= {
        main : weather[0].main,
        description:weather[0].description,
        icon : weather[0].icon,
        visibility : `${convertMeterToKm(data.visibility)}  km`,
        windSpeed : `${data.wind.speed} km/h`
    }

    let tempDataLocation : ILocation = {
        city : data.name,
        country : data.sys.country,
    }

    setWeather(tempDataWeather);

    setTemparature(temp);

    setLocation(tempDataLocation); 

    setCity(data.name); 

    setInput({helperText:"",error:false})

     setBtn(true);
    console.log(data.name+city);
    return response;
  
})
.catch((error:Error)=>{
    setCity("");
    setResponseStatus(false);
    ref.current!.value ?  setBtn(false) : setBtn(true)
    setInput({helperText:"City not found",error:true})
})
}





useEffect(()=>{

axios.get('http://ip-api.com/json').
then((response:any)=>{
   // console.log(response);
    setCity(response.data.city);
    setBtn(false);
})
.catch((error:Error)=>{
    console.log(`Response (get city name): ${error.message}`);
    
})

},[])


let ref = React.useRef<HTMLInputElement>();
  


const inputChanged = (event:ChangeEvent<HTMLInputElement>) =>{

    setCity(event.target.value);

    event.target.value ? setBtn(false) : setBtn(true);
}



const parallaxEffect = (event:React.MouseEvent)=> setParallax(`translateX(${event.clientX*5 / 3000}px)`);


    return(
    <section onMouseMove = {parallaxEffect} >
        <section className={s.wrapper_weather} >



    <div className={s.wrapper_name_app}>  
       <CloudIcon  style={{ fontSize: 40 ,color:"blue"}}/> 
        <h2>Weather</h2>
        <WbSunnyIcon  style={{ fontSize: 40 , color : "red" }}/>
        </div>   

        {/* , {dataLocation.country} */}
        {responseIsOk ?
        <div className={responseIsOk ? s.block_response + ' ' + s.success : s.block_response} style = {{transform : parallax}}>
        
        <div className={s.city_data}>
          <div className={s.city_name}>{dataLocation.city},{dataLocation.country}</div>

          <div className={s.icon}><img  src={`http://openweathermap.org/img/wn/${dataWeather.icon}@2x.png`} alt={dataWeather.main} className={s.icon_main}/></div>
        
         </div>
        <div className={s.data_temperature}> {temparature.temperature === undefined ? "" : temparature!.temperature} &deg; C</div>



                     <div className="more_temp">
                         <div className="high_low_temp_data">{temparature.temp_min}&deg; / {temparature.temp_max}&deg;</div>
                            <div className={s.title}>low / high</div>                   
                    </div>
                    {/* {s.feels_like} */}
                <div className="feels_like">
                     <div className ="feels_like_data">{temparature.temperature} &deg;</div>
                        <div className={s.title}>feels like</div>
                </div>
                {/* {s.visibility} */}
                <div className = {s.visibility}>
                    <div className="visibility_data">{dataWeather.visibility}</div>
                    <div className={s.title}>visibility</div>
                </div>
           <div className={s.wrapperData}>    </div>    





                            {/* {s.description} */}
                <div className ={s.description}>
                        <div className="description_data">{dataWeather.description}</div>
                        <div className={s.title}>description</div>
                </div>
                {/* {s.humidity} */}
                <div className = {s.humidity}>
                    <div className="humidity_data">{temparature.humidity}%</div>
                    <div className={s.title}>humidity</div>
                </div>
                
                {/* {s.windSpeed} */}
                <div className={s.windSpeed}>
                    <div className="wind_data">{dataWeather.windSpeed}</div>
                    <div className={s.title}>wind</div>
                </div>   
        </div>
        
        : ""
        }
   

        <div className={responseIsOk ? s.input_section +' '+ s.success_response : s.input_section } >
        <TextField inputRef ={ref} className = {s.inputWeather} error ={input.error} id="outlined-basic" label="Your city" onChange ={inputChanged}  variant="filled" helperText ={input.helperText} value = {city}/>
        <Button onClick ={ ()=> getWeather(ref.current!.value)} variant="contained" color="secondary" className = {s.btnWeather} disabled = {isActiveBtn}>Get weather</Button>
        </div>
        
        
        
        
        
        
        
        </section>

        <section className={s.background_section} style = {{overflow:"hidden"}} ></section>
        </section>
    );
}

export default Weather;