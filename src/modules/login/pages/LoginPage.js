// @flow
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import * as actions from "../actions";
import LoginForm from "../components/LoginForm";

const styles = {
  root: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    left: 0,
    overflowY: "scroll",
    position: "absolute",
    top: "0",
    width: "100%"
  }
};

class Login extends React.Component {
  componentWillMount() {
    document.title = "Welcome | Login";
  }

  onLogin = async ({ email, password, setSubmitting, setErrors }) =>
    setTimeout(() => {
      const { setUser } = this.props;
      const user = { email, firstName: "James", lastName: "Testing" };
      setUser(user);
      setSubmitting(false);
      const { history: { push } } = this.props;
      push("/");
    }, 2000);

  render() {
    return (
      <div styles={styles.root}>
        <LoginForm handleSubmit={this.onLogin} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default compose(withRouter, connect(null, mapDispatchToProps))(Login);
