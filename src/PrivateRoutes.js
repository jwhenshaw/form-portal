import React from 'react';
import { Route } from 'react-router-dom';

import withBasicAuth from '../src/modules/auth/components/withBasicAuth';
import OrderPage from '../src/modules/orders/pages';

const privateRoutes = {
  '/': OrderPage,
  '/orders': OrderPage,
};

const privateRouteKeys = Object.keys(privateRoutes);

const Routes = () => (
  <div>
    {privateRouteKeys.map((route, i) => (
      <Route exact path={route} component={privateRoutes[route]} key={i} />
    ))}
  </div>
);

export default Routes;
