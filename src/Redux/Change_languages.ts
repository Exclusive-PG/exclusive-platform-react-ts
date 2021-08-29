
import { Language } from './interfaces';

let initialState:Language = {
en :{
    MoviePage :{
        popularity : "popularity", published : "published" , rating : "rating" , sexual_content : "sexual_content" , update : "update"
    },
},


ru : {
    MoviePage:{
        popularity : "популярность", published : "опубликовано" , rating : "рейтинг" , sexual_content : "сексуальный контент" , update : "Обновлено"
    }
}


}





const ChangeLanguageReducer = (state:any  = initialState  , action:any) => {

    switch(action.type){



    default: return state;
    }
}

export default ChangeLanguageReducer;