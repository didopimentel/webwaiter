import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import '../styles/main.css'
import * as Colors from 'material-ui/styles/colors'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Application from '../containers/Application'
import { PrivateRoute } from '../components/PrivateRoute'

const Root = () => {
  return (
    <BrowserRouter>
      <div>
          <Route exact path="/" component={Application}/>
          <PrivateRoute path="/dashboard" component={Dashboard}/>
      </div>
    </BrowserRouter>
  )
}

export default Root
