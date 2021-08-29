import { connect } from "react-redux";
import MainDashBoard from "../MainDashBoard";
import { AppState } from "../../Redux/store";
import { WrapperDash } from './../../Redux/interfaces';





let mapStateToProps = (state: AppState) : WrapperDash => {
  console.log(state);
  return {
    mainDash: state.reducerDashBoard.mainDash,
  };
};

const DashBoardC = connect(mapStateToProps,{})(MainDashBoard);

export default DashBoardC;
