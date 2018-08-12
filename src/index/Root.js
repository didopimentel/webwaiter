import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import TextField from '@material-ui/core/TextField'
import { history } from '../helpers/history'
import '../styles/main.css'
import '../icons/dripicons-master/webfont/webfont.css'
import '../styles/material-dashboard-html-v2.1.0/assets/css/material-dashboard.css'
import * as Colors from '@material-ui/core/colors'
import { Router, Route, Link } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Application from '../containers/Application'
import { PrivateRoute } from '../components/PrivateRoute'
import HomePage from '../homepage/HomePage'
import Index from '../homepage/Index'
import Menu from '../dashboard/Menu'
import Home from '../dashboard/Home'
import Checkout from '../dashboard/Checkout'
import StaffHomePage from '../staff-homepage/StaffHomePage'
import StaffDashboard from '../staff-dashboard/StaffDashboard'
import StaffOrders from '../staff-dashboard/StaffOrders'
import StaffMenu from '../staff-dashboard/StaffMenu'
import StaffBackOfHouseDashboard from '../staff-dashboard/StaffBackOfHouseDashboard'
import Icon from '@material-ui/core/Icon'
import Permissions from 'react-redux-permissions'
import { DisabledRoute } from '../components/DisabledRoute'
import ActionReceipt from '@material-ui/core/SvgIcon/'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import WaiterHeaderIcon from './images/waiter-header.png'

const Root = () => {
  return (
    <Router history={history}>
      <div className="root-container">
        <Application />
        <Route exact path='/' component={Index} />
        <Route path='/staff/(dashboard|menu|orders)' render={(props) => (
          <div className="header">
            <img src="https://png.icons8.com/ios/50/000000/restaurant-table.png" width={50} className="header-icon" onClick={() => props.history.push('/staff/dashboard')}/>
            <div className="header-icon" onClick={() => props.history.push('/staff/menu')}>
              <Typography style={{fontSize:20}} >MENU</Typography>
            </div>
            <img src={WaiterHeaderIcon} className="header-icon" onClick={() => props.history.push('/staff/orders')}/>
          </div>
        )}/>
        <Route path='/staff/backofhouse' render={(props) => (
          <div className="header"></div>
        )}/>
        <Route exact path='/staff' component={StaffHomePage} />
          <Route path='/staff/dashboard' component={StaffDashboard} />
          <Route path='/staff/menu' component={StaffMenu} />
          <Route path='/staff/orders' component={StaffOrders} />
          <Route path='/staff/backofhouse' component={StaffBackOfHouseDashboard} />
        <Route path="/dashboard/(menu|checkout|home)" render={(props) => (
          <Card>
            <Tabs centered>
              <Tab label="Home" component={Link} to="/dashboard/home" />
              <Tab label="Menu" component={Link} to="/dashboard/menu" />
              <Tab label="Checkout" component={Link} to="/dashboard/checkout" />
            </Tabs>
          </Card>
        )}/>
        <Route path="/dashboard/checkout" history={history} component={Checkout}/>
        <Route path="/dashboard/home" history={history} component={Home}/>
        <Route path='/dashboard/menu' history={history} component={Menu} />
        <Route exact path='/dashboard' history={history} component={Dashboard}/>
      </div>
    </Router>
  )
}

export default connect()(Root)
