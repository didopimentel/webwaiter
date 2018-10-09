import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import { adminService } from '../services/adminService';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 300,
    },
    menu: {
      width: 200,
    },
    icon: {
        margin: theme.spacing.unit * 2,
        fontSize: 40
      },
    iconHover: {
        margin: theme.spacing.unit * 2,
        '&:hover': {
            color: 'red',
            cursor: 'pointer'
        },
    },
    margin: {
      margin: theme.spacing.unit,
    },
    formControl: {
      margin: theme.spacing.unit,
    },
    withoutLabel: {
      marginTop: theme.spacing.unit * 3,
    },
  });

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Stations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stations: []
        }
        
    }

    
    componentDidMount() {
        adminService.getStations()
            .then((stations) => {
                this.setState({
                    stations
                })
            })
    }

    
    createStation = () => {
        adminService.createStation(this.state.station)
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };


    render() {
        
        const { classes } = this.props;
        return (
        <div className="container">
            
        </div>
        )
    }
}


export default withStyles(styles)(Stations)