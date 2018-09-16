import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import { connect } from 'react-redux'
import InputLabel from '@material-ui/core/InputLabel';
import Clear from '@material-ui/icons/Clear';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { adminActions } from '../actions/adminActions';
import { adminService } from '../services/adminService';

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

class Employees extends Component {

    state = {
        username: '',
        password: '',
        email: '',
        role: '',
        employees: '',
        showPassword: false,
        station: ''
    }
    
    componentDidMount() {
        this.props.dispatch(adminActions.getStations())
        adminService.getEmployees().then(response => {
            this.setState({
                employees: response
            })
        }).catch(err => console.log(err))
    }

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    createUser = (e) => {
        e.preventDefault();
        const {username, password, station, email, role} = this.state;
        adminService.createEmployee(username, password, station, email, role)
            .then((response) => {
                
            })
            .catch((err) => console.log(err))
    }

    removeUser = (e, id) => {
        e.preventDefault();
        adminService.removeEmployee(id)
            .then((response) => {
                window.location.reload();
            })
            .catch((err) => console.log(err))
    } 

    render() {
        const { classes, stations } = this.props
        const { employees } = this.state 
        return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className={classes.container}>
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <Typography>Sign an employee for your establishment</Typography>
                            </div>
                            <div className="panel-body">
                                <form className={classes.container}>  
                                    <TextField
                                        label="Username"
                                        placeholder="The employee username to be used for login."
                                        onChange={(e) => this.handleChange('username')(e)}
                                        className={classNames(classes.textField, classes.margin)}
                                    />
                                    <FormControl className={classNames(classes.margin, classes.textField)}>
                                        <InputLabel htmlFor="adornment-password">Password</InputLabel>
                                        <Input
                                            id="adornment-password"
                                            placeholder="The employee password to be used for login."
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            onChange={(e) => this.handleChange('password')(e)}
                                            endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                                >
                                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    <TextField
                                        label="Email"
                                        onChange={(e) => this.handleChange('email')(e)}
                                        placeholder="exemplo@exemplo.com.br"
                                        className={classNames(classes.margin, classes.textField)}
                                    />
                                    <FormControl className={classNames(classes.margin, classes.textField)}>
                                        <InputLabel shrink htmlFor="select-role">Role</InputLabel>
                                        <Select
                                            value={this.state.role}
                                            onChange={(e) => this.handleChange('role')(e)}
                                        >
                                            <MenuItem value=""></MenuItem>
                                            <MenuItem value="admin">Admin</MenuItem>
                                            <MenuItem value="backofhouse">Back of House</MenuItem>
                                            <MenuItem value="employee">Waiter</MenuItem>
                                        </Select>
                                        <FormHelperText>Please select the role for the employee</FormHelperText>
                                    </FormControl>
                                    <FormControl className={classNames(classes.margin, classes.textField)}>
                                        <InputLabel shrink htmlFor="select-station">Station</InputLabel>
                                        <Select
                                            value={this.state.station}
                                            onChange={(e) => this.handleChange('station')(e)}
                                            inputProps={{
                                            name: 'station',
                                            id: 'select-station',
                                            }}
                                        >
                                            {stations && stations.map(station => (
                                                <MenuItem value={station.id}>{station.name}</MenuItem>
                                            )) }
                                        </Select>
                                        <FormHelperText>Please select the station for the employee</FormHelperText>
                                    </FormControl>
                                    <Button 
                                        className={classes.margin}
                                        variant="contained"
                                        color="primary"
                                        onClick={(e) => this.createUser(e)}
                                        style={{width:100}}>
                                        Register
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <Typography>Manage your employees.</Typography>
                        </div>
                        <div className="panel-body">
                            <List>
                                {   employees &&
                                    employees.map((employee) => (
                                        <ListItem>
                                            <ListItemText primary={employee.username} />
                                            <ListItemText primary={employee.role} />
                                            <ListItemSecondaryAction>
                                                <IconButton onClick={(e) => this.removeUser(e, employee._id)}>
                                                    <Clear/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </div>
                    </div>                         
                </div>
            </div>    
        </div>
        )
    }
}

function mapStateToProps(state) {
    const { stations } = state.stations
    return {
        stations
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Employees))