import { connect } from "react-redux";
import Header from './header';
import { AppState } from "../../Redux/store";
import { IGoogleLogin, IGoogleLoginData } from "../../Redux/interfaces";
import { updateDataUserGoogleAC } from './../../Redux/reducerGoogleLogin';
import { Dispatch } from "redux";



type propsAC = {
    GoogleAC : (data : IGoogleLoginData) => void;

}



let mapStateToProps = (state: AppState) : IGoogleLogin => 
({
    googleLogin: state.reducerGoogleLogin.googleLogin
});



let mapDispatchToProps = (dispatch : Dispatch) : propsAC =>({
 GoogleAC : (data:IGoogleLoginData)  =>{
   
    dispatch(updateDataUserGoogleAC(data))
 }
  
})

export type PropsHeader = propsAC & IGoogleLogin;

const HeaderC = connect(mapStateToProps,mapDispatchToProps)(Header);

export default HeaderC;
