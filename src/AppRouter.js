import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginPage } from './modules/login/pages';
import PrivateRoutes from './PrivateRoutes';

export default ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoutes />
      </div>
    </Router>
  </Provider>
);
