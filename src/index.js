import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './index/Root';
import registerServiceWorker from './registerServiceWorker';
import * as Colors from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { store } from './helpers/store'

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: Colors.blue600,
    accent1Color: Colors.blue50,
    pickerHeaderColor: Colors.darkBlack,
    alternateTextColor: Colors.fullWhite
  },
  appBar: {
    height: 60,
  },
})

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Root />
    </Provider>
  </MuiThemeProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
