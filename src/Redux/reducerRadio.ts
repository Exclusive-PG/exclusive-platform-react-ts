import { IRadioStations, Actions, RadioStation } from "./interfaces";
import { PLAY_NOW, PLAY_OR_STOP } from "./types";





const colorsHex:Array<string> = ["#E74C3C ","#8E44AD","#3498DB","#2ECC71","#F1C40F","#D35400"]

const getRandomColors = () :string =>{
    let tempIndex = Math.floor(Math.random()*colorsHex.length);
    return colorsHex[tempIndex];
}

console.log(getRandomColors());

const initialState:IRadioStations = {
    data:[
        {name : "Ambient Fantasy",stream:"http://orion.shoutca.st:8193/stream",style:{background:getRandomColors()},selected:false},
        {name : "Ambient and Chillout",stream:"http://orion.shoutca.st:8994/stream",style:{background:getRandomColors()},selected:false},
        {name : "Christmas Channel",stream:"http://orion.shoutca.st:8982/stream",style:{background:getRandomColors()},selected:false},
        {name : "Classical",stream:"http://orion.shoutca.st:8193/stream",style:{background:getRandomColors()},selected:false},
        {name : "Best Dance '90s",stream:"http://orion.shoutca.st:8643/stream",style:{background:getRandomColors()},selected:false},
        {name : "House",stream:"http://orion.shoutca.st:8986/stream",style:{background:getRandomColors()},selected:false},
        {name : "Techno",stream:"http://orion.shoutca.st:8938/stream",style:{background:getRandomColors()},selected:false},
        {name : "New Wave '80s",stream:"http://orion.shoutca.st:8123/stream",style:{background:getRandomColors()},selected:false},
    ],
    playNow : {
        name : "",stream:"",style:{background:getRandomColors()},selected:false
    }
    
}

const reducerRadio = (state : IRadioStations = initialState , action:Actions ) => {

    switch(action.type){

        case PLAY_NOW : {
            return{
                ...state,
                  playNow : action.data
            }
        }
       
    }

    return state;
}

export const playNowAC = (data:RadioStation):Object =>({
    type : PLAY_NOW,
    data
})

    
export default reducerRadio;