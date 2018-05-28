import React from "react";
import { Redirect } from "react-router-dom";

import { store } from "../../../index";
import { userSelector } from "../../../state/reducers";

const withBasicAuth = (Component: Function) => (props: Props) => {
  const user = userSelector(store.getState());
  if (!user || !user.email) {
    // extra check to see if already at '/login'
    return <Redirect to="/login" />;
  }
  return <Component {...props} />;
};

export default withBasicAuth;
