import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { history } from '../helpers/history'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles'; 

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  }
});

class Application extends Component {

  constructor(props) {
    super(props);
  }

  goToStaffLogin = () => {
    history.push('/staff');
  }

  logout = () => {
  }

  render(){
    const { classes } = this.props
    return(
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar variant="dense">
          <Typography variant="title" color="inherit">
            WebWaiter
          </Typography>
          <Button color="inherit" onClick={this.goToStaffLogin}>Staff</Button>
          <Button color="inherit">Login</Button>
          <Button color="inherit" onClick={this.logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    )
  }

}
function mapStateToProps(state) {
  const { alert, authentication, tableAuthentication } = state;
  return {
    alert,
    authentication,
    tableAuthentication
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Application))
