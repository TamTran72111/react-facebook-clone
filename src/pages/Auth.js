import React from "react";
import { connect } from "react-redux";

import Login from "../components/auth/Login";
import Loading from "../components/ui/Loading";
import { getLoadingStatus } from "../redux/selectors/loading";

const Auth = ({ isLoading }) => {
  return (
    <>
      {isLoading && <Loading />}
      <Login />
    </>
  );
};

const mapStateToProps = (state) => {
  return { isLoading: getLoadingStatus(state) };
};
export default connect(mapStateToProps)(Auth);
