import { IGoogleLogin, IGoogleLoginAC, IGoogleLoginData } from "./interfaces";
import { GOOGLE_LOGIN_DATA } from './types';

export const STATIC_USERNAME_GOOGLE = "User";

let initialState:IGoogleLogin  = {
    googleLogin : {
        userName : STATIC_USERNAME_GOOGLE , 
        urlImage : "" ,
        SignedTime :  "",
        isLocalStorage : false,
    }
}

const reducerGoogleLogin = (state:IGoogleLogin = initialState , action : IGoogleLoginAC )  =>{

    switch(action.type) {
            case GOOGLE_LOGIN_DATA : {
                localStorage.setItem('SESSION_DATA', JSON.stringify(action.googleLogin));
                console.log("SIGNED IN GOOGLE ACCOUNT")      
             
                return {
                    ...state,
                    googleLogin : action.googleLogin
                } 
            }
           


       default : return state;
    }

}
console.log(initialState);
export const updateDataUserGoogleAC = (data:IGoogleLoginData) =>  ({
type : GOOGLE_LOGIN_DATA,
googleLogin :data
})




export default reducerGoogleLogin;


