import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import * as Colors from '@material-ui/core/colors'
import { Route, Router, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { history } from '../helpers/history'
import { PrivateRoute } from '../components/PrivateRoute'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

class Application extends Component {

  constructor(props) {
    super(props);
  }

  goToStaffLogin = () => {
    history.push('/staff');
  }

  render(){
    return(
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="title" color="inherit">
            WebWaiter
          </Typography>
          <Button color="inherit" onClick={this.goToStaffLogin}>Staff</Button>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
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
