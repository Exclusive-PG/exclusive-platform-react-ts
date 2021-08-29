
 export  const getDate = ():string =>{
    
    let date:Date = new Date();
    let hours :string | number = date.getHours();
    let minutes :string | number = date.getMinutes();
  
  
     hours = (hours < 10) ?  `0${hours}` : hours;
     minutes =  (minutes < 10) ?  `0${minutes}` : minutes;
  
    return `${hours}:${minutes}`;
  }
