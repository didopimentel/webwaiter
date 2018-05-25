import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import { history } from '../helpers/history'
import '../styles/main.css'
import * as Colors from 'material-ui/styles/colors'
import { Router, Route } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Application from '../containers/Application'
import { PrivateRoute } from '../components/PrivateRoute'
import HomePage from '../homepage/HomePage'
import Menu from '../dashboard/Menu'
import StaffHomePage from '../staff-homepage/StaffHomePage'
import StaffDashboard from '../staff-dashboard/StaffDashboard'

const Root = () => {
  return (
    <Router history={history}>
      <div>
        <Application />
        <Route exact path='/' component={HomePage} />
        <Route exact path='/staff' component={StaffDashboard} />
        <Route exact path='/staff/dashboard' component={StaffHomePage} />
        <PrivateRoute path='/dashboard/menu' history={history} component={Menu} />
        <PrivateRoute exact path='/dashboard' history={history} component={Dashboard}/>
      </div>
    </Router>
  )
}

export default Root
