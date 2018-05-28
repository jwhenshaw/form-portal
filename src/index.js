import 'normalize.css';

import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import muiTheme from './modules/ui/muiTheme';

import reducers from './state/reducers';
import AppRouter from './AppRouter';
import registerServiceWorker from './registerServiceWorker';

require('./modules/ui/resets.css');

export const store = createStore(reducers);

render(
  <MuiThemeProvider theme={muiTheme}>
    <CssBaseline />
    <AppRouter store={store} />
  </MuiThemeProvider>,
  document.getElementById('root'),
);

registerServiceWorker();
