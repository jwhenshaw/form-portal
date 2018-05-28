import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const SignUpLink = () => (
  <Link to="/signup">
    <p>Not got an account? Sign up here</p>
  </Link>
);

export default withRouter(SignUpLink);
