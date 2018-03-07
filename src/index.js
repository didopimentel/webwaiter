import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './containers/Application';
import registerServiceWorker from './registerServiceWorker';
import * as Colors from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import 'bootstrap/dist/css/bootstrap.min.css';

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: Colors.red600,
    accent1Color: Colors.red50,
    pickerHeaderColor: Colors.darkBlack,
    alternateTextColor: Colors.fullWhite
  },
  appBar: {
    height: 60,
  },
})


const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Application/>
  </MuiThemeProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
