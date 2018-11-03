import React, { Component } from 'react'
import Logo from './images/logo.png'
import './css/home.css'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: `${theme.spacing.unit * 2}px`,
  },
  button: {
    margin: theme.spacing.unit,
    width: '250px'
  },
  input: {
    display: 'none',
  },
});

class Home extends Component {
    state = {

    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className="webwaiter-homepage-header">
                    <img className="webwaiter-avatar" src={Logo}/>
                </div>
                <div className="webwaiter-homepage-body">
                </div>
                <div className="webwaiter-homepage-footer">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onClick={() => this.props.history.push('/login')}
                    >
                        Login
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Register
                    </Button>
                </div>  
            </div>
      )
    }
}

export default withStyles(styles)(Home)