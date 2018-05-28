import React from "react";
import { Formik } from "formik";
import { Grid } from "@material-ui/core";

import SignUpLink from "./SignUpLink";

const Label = ({ children }) => (
  <label style={{ width: "125px" }}>{children}</label>
);

class LoginForm extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(
          { email, password },
          { setSubmitting, setErrors /* setValues and other goodies */ }
        ) => {
          this.props.handleSubmit({
            email,
            password,
            setSubmitting,
            setErrors
          });
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit} style={{ display: "flex" }}>
            <Grid container>
              <Grid item>
                <Label>Email</Label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  style={{ display: "flex" }}
                />
                {touched.email && errors.email && <div>{errors.email}</div>}
              </Grid>
              <Grid>
                <Label>Password</Label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  style={{ display: "flex" }}
                />
                {touched.password &&
                  errors.password && <div>{errors.password}</div>}
              </Grid>
              <Grid item>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ display: "flex" }}
                >
                  Submit
                </button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    );
  }
}

export default props => (
  <div>
    <div>
      <h1>Login</h1>
    </div>
    <div>
      <LoginForm {...props} />
    </div>
    <div>
      <SignUpLink />
    </div>
  </div>
);
