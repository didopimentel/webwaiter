import React from 'react';
import ReactDOM from 'react-dom';
import Root from './index/Root';
import registerServiceWorker from './registerServiceWorker';
import * as Colors from '@material-ui/core/colors'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { store } from './helpers/store'

const muiTheme = createMuiTheme({
  typography: {
    htmlFontSize: 10
  },
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
})

const App = () => (
    <MuiThemeProvider theme={muiTheme}>
        <Provider store={store}>
          <Root/>
        </Provider>
    </MuiThemeProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
