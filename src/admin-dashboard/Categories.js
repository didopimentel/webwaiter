import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux'
import Clear from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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

class Categories extends Component {

    state = {
        name: '',
        queueDefaultTime: '',
        pipelineDefaultTime: '',
        serveDefaultTime: '',
        categories: ''
    }
    
    componentDidMount() {
        adminService.getCategories()
            .then((categories) => {
                this.setState({
                    categories
                })
            })
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    createCategory = (e) => {
        const { name, queueDefaultTime, pipelineDefaultTime, serveDefaultTime } = this.state
        adminService.createCategory({
            name: name,
            queue_default_time: queueDefaultTime,
            pipeline_default_time: pipelineDefaultTime,
            serve_default_time: serveDefaultTime 
        }).then(() => {
            window.location.reload();
        }).catch((error) => console.log(error))   
    }

    removeCategory = (e, id) => {
        adminService.removeCategory(id)
            .then(() => {
                window.location.reload();
            })
    }

    render() {
        const { classes } = this.props
        const { categories } = this.state
        return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className={classes.container}>
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <Typography>Create a new category for your menu</Typography>
                            </div>
                            <div className="panel-body">
                                <form className={classes.container}>
                                    <TextField
                                        label="Name"
                                        placeholder="The name of the category."
                                        onChange={(e) => this.handleChange('name')(e)}
                                        className={classNames(classes.textField, classes.margin)}
                                    />
                                    <TextField
                                        label="Queue Default Time"
                                        placeholder="The default queue time."
                                        onChange={(e) => this.handleChange('queueDefaultTime')(e)}
                                        className={classNames(classes.textField, classes.margin)}
                                    />
                                    <TextField
                                        label="Pipeline Default Time"
                                        placeholder="The default pipeline time."
                                        onChange={(e) => this.handleChange('pipelineDefaultTime')(e)}
                                        className={classNames(classes.textField, classes.margin)}
                                    />
                                    <TextField
                                        label="Serve Default Time"
                                        placeholder="The default serve time."
                                        onChange={(e) => this.handleChange('serveDefaultTime')(e)}
                                        className={classNames(classes.textField, classes.margin)}
                                    />
                                    <Button 
                                        className={classes.margin}
                                        variant="contained"
                                        color="primary"
                                        onClick={(e) => this.createCategory(e)}
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
                        <Typography>Manage your categories.</Typography>
                    </div>
                        <div className="panel-body">
                            <List>
                                {   categories &&
                                    categories.map((category) => (
                                        <ListItem>
                                            <ListItemText primary={category.name} />
                                            <ListItemSecondaryAction>
                                                <IconButton onClick={(e) => this.removeCategory(e, category._id)}>
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

export default withStyles(styles)(connect(mapStateToProps)(Categories))