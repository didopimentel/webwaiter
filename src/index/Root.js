import React, { Component } from 'react'
import { connect } from 'react-redux'
import { history } from '../helpers/history'
import '../styles/main.css'
import '../icons/dripicons-master/webfont/webfont.css'
import '../styles/webwaiter-styles.css'
import '../styles/material-dashboard-html-v2.1.0/assets/css/material-dashboard.css'
import { Router, Route, Link } from 'react-router-dom'
import { Alert } from '../components/Alert'
import Dashboard from '../dashboard/Dashboard'
import Application from '../containers/Application'
import { PrivateRoute } from '../components/PrivateRoute'
import { establishmentActions } from '../actions/establishmentActions'
import { tableActions } from '../actions/tableActions'
import Index from '../homepage/Home'
import Login from '../homepage/Login'
import Menu from '../dashboard/Menu'
import Home from '../dashboard/Home'
import CategoryMenu from '../dashboard/CategoryMenu'
import Checkout from '../dashboard/Checkout'
import StaffHomePage from '../staff-homepage/StaffHomePage'
import StaffDashboard from '../staff-dashboard/StaffDashboard'
import StaffOrders from '../staff-dashboard/StaffOrders'
import StaffMenu from '../staff-dashboard/StaffMenu'
import StaffBackOfHouseDashboard from '../staff-dashboard/StaffBackOfHouseDashboard'
import Typography from '@material-ui/core/Typography'
import WaiterHeaderIcon from './images/waiter-header.png'
import AdminIndex from '../admin-dashboard/AdminIndex'
import EstablishmentRegister from '../register/EstablishmentRegister'
import { Helmet } from 'react-helmet'
import Button from '@material-ui/core/Button';
import TopBar from '../components/TopBar';
import CustomerHeader from '../components/CustomerHeader'

const User = PrivateRoute(['user'], ['anonymous'])
const Employee = PrivateRoute(['employee', 'admin'])
const Backofhouse = PrivateRoute(['backofhouse', 'admin'])
const Admin = PrivateRoute(['admin']) 

class Root extends Component {

  componentDidMount() {
    
  }

  render () {
    const role = localStorage.getItem('role');
    const { loggedInTable, loggedInDashboard, alert } = this.props
    return (
      <Router history={history}>
        
        <div className="root-container">
          <TopBar/>
          <Helmet>
            <style>{'body { background: white; font-family: Roboto, sans-serif;}'}</style>
  
          </Helmet>
    
          { loggedInDashboard && loggedInTable && history.location.pathname === '/' && history.push('/dashboard/menu')}
          { !localStorage.getItem('token') 
            && history.location.pathname !== '/' 
            && history.location.pathname !== '/staff'  
            && history.location.pathname !== '/admin'
            && history.push('/')}
  
          <Route exact path='/' component={Index} />
          <Route path='/login/' component={Login} />
          <Route path='/establishmentRegister' component={EstablishmentRegister} />
          <Route path='/admin/' component={Admin(AdminIndex)} />
          <Route path='/staff/(dashboard|menu|orders|category)' render={(props) => (
            <div className="header">
              <img src="https://png.icons8.com/ios/50/000000/restaurant-table.png" alt="Dashboard" width={50} className="header-icon" onClick={() => props.history.push('/staff/dashboard')}/>
              <div className="header-icon" onClick={() => props.history.push('/staff/menu')}>
                <Typography style={{fontSize:20}} >MENU</Typography>
              </div>
              <img src={WaiterHeaderIcon} alt="Orders" className="header-icon" onClick={() => props.history.push('/staff/orders')}/>
            </div>
          )}/>
          <Route exact path='/staff' component={StaffHomePage} />
            <Route path='/staff/dashboard' component={StaffDashboard} />
            <Route path='/staff/menu' component={StaffMenu} />
            <Route path='/staff/orders' component={StaffOrders} />
            <Route path='/staff/backofhouse' component={StaffBackOfHouseDashboard} />
          <Route path="/dashboard/(menu|checkout|home)" render={(props) => (
            <CustomerHeader/>
          )}/>
          <Route path="/dashboard/checkout" history={history} component={Checkout}/>
          <Route path="/dashboard/home" history={history} component={Home}/>
          <Route path='/dashboard/menu' history={history} component={Menu} />
          <Route path='/dashboard/category' history={history} component={CategoryMenu} />
          <Route exact path='/dashboard' history={history} component={Dashboard}/>
        </div>
      </Router>
    )
  }
}

function mapStateToProps(state) {
  const { tableAuthentication, authentication, alert } = state;
  const { loggedInTable } = tableAuthentication;
  const { loggedInDashboard } = authentication;

  return {
    loggedInTable,
    loggedInDashboard,
    alert
  }
}

export default connect(mapStateToProps)(Root)
