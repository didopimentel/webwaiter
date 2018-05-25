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
import MasterIndex from './MasterIndex'

class Application extends Component {

  constructor(props) {
    super(props);
  }

  loginMaster() {
    history.push('/staff');
  }

  render(){
    return(
      <div>
        <AppBar zDepth="2" title="WebWaiter"
          onLeftIconButtonClick={() => this.loginMaster()}
        />
        <div className="container-main">
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
