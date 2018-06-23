import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import StaffOrders from '../staff-dashboard/StaffOrders'
import StaffMenu from '../staff-dashboard/StaffMenu'
import FontIcon from 'material-ui/FontIcon'
import Permissions from 'react-redux-permissions'
import { DisabledRoute } from '../components/DisabledRoute'

const Root = () => {
  return (
    <Router history={history}>
      <div>
        <Application />
        <Route exact path='/' component={HomePage} />
        <Route path='/staff' render={(props) => (
          <div className="header">
            <FontIcon className="table-icon header-icon" onClick={() => props.history.push('/staff/dashboard/')}/>
            <div className="header-icon" onClick={() => props.history.push('/staff/menu')}>MENU</div>
            <FontIcon className="waiter-icon header-icon" onClick={() => props.history.push('/staff/orders/')}/>
          </div>
        )}/>
        <Route exact path='/staff' component={StaffHomePage} />
          <Route path='/staff/dashboard' component={StaffDashboard} />
          <Route path='/staff/menu' component={StaffMenu} />
          <Route path='/staff/orders' component={StaffOrders} />
        <PrivateRoute path='/dashboard/menu' history={history} component={Menu} />
        <PrivateRoute exact path='/dashboard' history={history} component={Dashboard}/>
      </div>
    </Router>
  )
}

export default connect()(Root)
