import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import '../styles/main.css'
import * as Colors from 'material-ui/styles/colors'
import { Route, Router, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { history } from '../helpers/history'
import { PrivateRoute } from '../components/PrivateRoute'
import HomePage from '../homepage/HomePage'
import Dashboard from '../dashboard/Dashboard'
import Menu from '../dashboard/Menu'

class Application extends Component {

  constructor(props) {
    super(props);
    history.push('/');

  }

  render(){
    return(
      <div>
        <AppBar zDepth="2" title="WebWaiter"/>
        <div className="container-main">
          <Router history={history}>
            <div>
            <PrivateRoute path='/dashboard/menu' component={Menu} />
            <PrivateRoute exact path='/dashboard' history={history} component={Dashboard}/>
            <Route exact path='/' component={HomePage} />
            </div>
          </Router>
        </div>
      </div>
    )
  }

}
function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  }
}

export default connect(mapStateToProps)(Application)
