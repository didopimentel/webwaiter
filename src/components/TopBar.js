import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { establishmentActions } from '../actions/establishmentActions'
import { tableActions } from '../actions/tableActions'
import { withRouter } from "react-router";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function TopBar(props) {
  const logout = () => {
    props.dispatch(establishmentActions.logout())
    props.dispatch(tableActions.logout())  
  }
  const { classes, loggedIn } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.grow}>
            WebWaiter
          </Typography> 
          {
              loggedIn ? 
                <Button color="inherit" onClick={() => logout()}>Logout</Button>
              :
                <div>
                    <Button color="inherit" onClick={() => props.history.push('/staff/')}>Funcionários</Button>
                    <Button color="inherit">Login</Button>
                </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

function mapStateToProps(state) {
    const { authentication } = state;
    return {
        loggedIn: (authentication.loggedIn || authentication.loggedInDashboard) ? true : false
    }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(withRouter(TopBar)));