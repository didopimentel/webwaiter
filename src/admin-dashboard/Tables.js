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

class Tables extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            number: '',
            tables: []
        }
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    
    componentDidMount() {
        adminService.getTables()
            .then((tables) => {
                this.setState({
                    tables
                })
            })
    }

    handleOpenDialog = () => {
        this.setState({ dialogOpen: true });
    };

    handleCloseDialog = () => {
        this.setState({ dialogOpen: false });
    };
    
    createTable = () => {
        adminService.createTable(this.state.number)
        this.handleCloseDialog();
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };


    render() {
        const { dialogOpen, tables } = this.state;
        const { classes } = this.props;
        return (
        <div className="container">
            <div className="">
                {tables && tables.map((table) => (
                    <div key={table._id} className="col-xs-6 col-md-4">
                        <img src="https://png.icons8.com/ios/50/000000/restaurant-table.png" alt="Table" width={70}/>
                    </div>
                ))}
                <div className="col-xs-6 col-md-4">
                    <AddCircle 
                        className={classNames(classes.icon, classes.iconHover)}
                        color="primary"
                        onClick={this.handleOpenDialog}
                    >
                    </AddCircle>
                </div>
            </div>      
            { dialogOpen && <Dialog
                open={true}
                TransitionComponent={Transition}
                onClose={this.handleCloseDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                >
                <DialogTitle id="alert-dialog-slide-title">
                    {"Add another table to your restaurant!"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="number"
                        onChange={(e) => this.handleChange("number")(e)}
                        label="Number"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.createTable} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog> }
            
        </div>
        )
    }
}


export default withStyles(styles)(Tables)