import React, { useState, useEffect } from "react"
import s from "./../../styles/Radio/radio.module.css"
import { RadioStation } from './../../Redux/interfaces';
import wave from "./../../images/sound.gif"

type propsRadioTextZone = {
   station : RadioStation
}

const TextZone:React.FC<propsRadioTextZone> = ({station}) => {

    return(
<>
<div className = {s.text_zone}>
<div className = {s.main_text}>
    <div><i className={`fas fa-broadcast-tower ${s.radio_icon_main_text}`}
        ></i> {station.name}
    </div>
    <div>
    <span className = {s.pulse}></span>
    </div>
</div>



<div className = {s.status_radio}>Radio station is playing now </div>
<div><img className ={s.animVolume} src = {wave}/></div>
</div>
</>
    );
}

export default TextZone;