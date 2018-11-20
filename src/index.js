import React from 'react';
import ReactDOM from 'react-dom';
import Root from './index/Root';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import AlertTemplate from "react-alert-template-basic";
import { Provider } from 'react-redux'
import { Provider as AlertProvider } from "react-alert";
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

const alertSettings = {
  timeout: 5000,
  position: "bottom center"
}

const App = () => (
    <MuiThemeProvider theme={muiTheme}>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...alertSettings}>
            <Root/>
          </AlertProvider>
        </Provider>
    </MuiThemeProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
