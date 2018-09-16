import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from '@material-ui/core/TextField';
import '../styles/establishment-register.css'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import { ListItem } from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Clear from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import { establishmentService } from '../services/establishmentService';

const styles = theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    button: {
      marginRight: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    },
    
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
      },
    menu: {
        width: 100
    },
  });

  
const steps = ['Basic Information', 'Billing Information', 'Categories', 'Menu', 'Employees']

class EstablishmentRegister extends Component {

    state = {
        activeStep: 0,
        establishmentName: '',
        establishmentLogo: '',
        establishmentAddress: '',
        establishmentEmail: '',
        establishmentContactPhone: '',
        establishmentContactClass: 'phone',
        establishmentBank: '',
        establishmentBankAccount: '',
        establishmentBankAgency: '',
        establishmentCategoryName: '',
        establishmentCategoryQueueTime: '',
        establishmentCategoryPipelineTime: '',
        establishmentCategoryServeTime: '',
        establishmentCategories: [],
        establishmentItemName: '',
        establishmentItemImage: '',
        establishmentItemPrice: '',
        establishmentItemQueueTime: '',
        establishmentItemPipelineTime: '',
        establishmentItemServeTime: '',
        establishmentMenu: [],
        establishmentEmployees: []

    }

    handleNext = () => {
        const { activeStep } = this.state;
        
        if (activeStep == steps.length - 1) {
            establishmentService.createEstablishment({
                establishmentName: this.state.establishmentName,
                establishmentLogo: this.state.establishmentLogo,
                establishmentAddress: this.state.establishmentAddress,
                establishmentEmail: this.state.establishmentEmail,
                establishmentContactPhone: this.state.establishmentContactPhone,
                establishmentContactClass: this.state.establishmentContactClass,
                establishmentBank: this.state.establishmentBank,
                establishmentBankAccount: this.state.establishmentBankAccount,
                establishmentBankAgency: this.state.establishmentBankAgency,
                establishmentCategories: this.state.establishmentCategories,
                establishmentMenu: this.state.establishmentMenu,
                establishmentEmployees: this.state.establishmentEmployees
            }).then((_) => console.log(_)) ;
        }
        else {
            this.setState({
                activeStep: activeStep + 1
            });
        }
    };
    
    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    createCategory = (e) => {
        e.preventDefault();
        const newCategory = {
            name: this.state.establishmentCategoryName,
            queue_default_time: this.state.establishmentCategoryQueueTime,
            pipeline_default_time: this.state.establishmentCategoryPipelineTime,
            serve_default_time: this.state.establishmentCategoryServeTime,
        };

        this.setState({
            establishmentCategories: [
                ...this.state.establishmentCategories,
                newCategory
            ]
        })
    }

    removeCategory = (name) => {
        const newCategories = this.state.establishmentCategories.filter((category) => category.name !== name)
        this.setState({
            establishmentCategories: newCategories
        })
    }

    createItem = (e) => {
        e.preventDefault();
        const newItem = {
            name: this.state.establishmentItemName,
            establishmentItemImage: this.state.establishmentItemImage,
            establishmentItemPrice: this.state.establishmentItemPrice,
            queue_default_time: this.state.establishmentItemQueueTime,
            pipeline_default_time: this.state.establishmentItemPipelineTime,
            serve_default_time: this.state.establishmentItemServeTime,
        };

        this.setState({
            establishmentMenu: [
                ...this.state.establishmentMenu,
                newItem
            ]
        })
    }

    removeItem = (name) => {
        const newItem = this.state.establishmentMenu.filter((item) => item.name !== name)
        this.setState({
            establishmentMenu: newItem
        })
    }

    render() {
        const { activeStep, establishmentCategories, establishmentMenu } = this.state;
        const { classes } = this.props;
        return (
            <div className="container-fluid" style={{marginTop:50}} >
                <div className="container-header text-center">
                    Establishment Information
                </div>
                <Stepper activeStep={activeStep} style={{backgroundColor: 'lightblue'}} >
                    {steps.map((label, index) => {
                        const props = {};
                        const labelProps = {};
                        return (
                        <Step key={label} {...props}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                        );
                    })}
                </Stepper>
                <div className="container-form alpha60 text-center">
                    {
                        activeStep === 0 && (
                            <form className={classes.container}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    className={classes.textField}
                                    value={this.state.establishmentName}
                                    onChange={this.handleChange('establishmentName')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Address"
                                    className={classes.textField}
                                    value={this.state.establishmentAddress}
                                    onChange={this.handleChange('establishmentAddress')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Email"
                                    className={classes.textField}
                                    value={this.state.establishmentEmail}
                                    onChange={this.handleChange('establishmentEmail')}
                                    margin="normal"
                                />
                                <div className="row">
                                    <div className="col">
                                    <FormControl className={classes.menu} style={{verticalAlign: 'bottom'}} >
                                        <InputLabel htmlFor="phone-class-helper">Type</InputLabel>
                                        <NativeSelect
                                            value={this.state.establishmentContactClass}
                                            onChange={this.handleChange('establishmentContactClass')}
                                            input={<Input name="phoneClass" id="phone-class-helper" />}
                                        >
                                            <option value='phone'>Phone</option>
                                            <option value='cellphone'>Cellphone</option>
                                            <option value='fax'>Fax</option>
                                        </NativeSelect>
                                    </FormControl>
                                    </div>
                                    <div className="col">
                                    <TextField
                                        id="name"
                                        label="Number"
                                        className={classes.textField}
                                        value={this.state.establishmentContactPhone}
                                        onChange={this.handleChange('establishmentContactPhone')}
                                        margin="normal"
                                    />
                                    </div>
                                </div>
                            </form>
                        )
                    }
                    {
                        activeStep === 1 && (
                            <form className={classes.container}>
                                <TextField
                                    id="name"
                                    label="Bank"
                                    className={classes.textField}
                                    value={this.state.establishmentBank}
                                    onChange={this.handleChange('establishmentBank')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Bank Account"
                                    className={classes.textField}
                                    value={this.state.establishmentBankAccount}
                                    onChange={this.handleChange('establishmentBankAccount')}
                                    margin="normal"
                                />
                                <TextField
                                    id="name"
                                    label="Bank Agency"
                                    className={classes.textField}
                                    value={this.state.establishmentBankAgency}
                                    onChange={this.handleChange('establishmentBankAgency')}
                                    margin="normal"
                                />
                            </form>
                        )   
                    }
                    {
                        activeStep === 2 && (
                            <div className="row">
                                <div className="col mr3">
                                    <form className={classes.container}>
                                        <TextField
                                            id="name"
                                            label="Name"
                                            className={classes.textField}
                                            value={this.state.establishmentCategoryName}
                                            onChange={this.handleChange('establishmentCategoryName')}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="name"
                                            label="Queue Time"
                                            className={classes.textField}
                                            value={this.state.establishmentCategoryQueueTime}
                                            onChange={this.handleChange('establishmentCategoryQueueTime')}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="name"
                                            label="Pipeline Time"
                                            className={classes.textField}
                                            value={this.state.establishmentCategoryPipelineTime}
                                            onChange={this.handleChange('establishmentCategoryPipelineTime')}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="name"
                                            label="Serve Time"
                                            className={classes.textField}
                                            value={this.state.establishmentCategoryServeTime}
                                            onChange={this.handleChange('establishmentCategoryServeTime')}
                                            margin="normal"
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={(e) => this.createCategory(e)}
                                            className={classes.button}
                                        >
                                            Create
                                        </Button>
                                    </form>
                                </div>
                                <div className="col" style={{marginLeft: '10px'}} >
                                    <div className={classes.container}>
                                        <List>
                                            {
                                                establishmentCategories.length > 0 &&
                                                establishmentCategories.map(category => (
                                                    <ListItem key={category.name}>
                                                        <ListItemText primary={category.name} />
                                                        <ListItemSecondaryAction>
                                                            <IconButton onClick={() => this.removeCategory(category.name)}>
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
                        )
                    }
                    {
                        activeStep === 3 && (
                            <div className="row">
                                <div className="col mr3">
                                    <form className={classes.container}>
                                        <TextField
                                            id="name"
                                            label="Name"
                                            className={classes.textField}
                                            value={this.state.establishmentItemName}
                                            onChange={this.handleChange('establishmentItemName')}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="name"
                                            label="Photo"
                                            className={classes.textField}
                                            value={this.state.establishmentItemImage}
                                            onChange={this.handleChange('establishmentItemImage')}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="name"
                                            label="Item Price"
                                            className={classes.textField}
                                            value={this.state.establishmentItemPrice}
                                            onChange={this.handleChange('establishmentItemPrice')}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="name"
                                            label="Pipeline Time"
                                            className={classes.textField}
                                            value={this.state.establishmentItemPipelineTime}
                                            onChange={this.handleChange('establishmentItemPipelineTime')}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="name"
                                            label="Serve Time"
                                            className={classes.textField}
                                            value={this.state.establishmentItemServeTime}
                                            onChange={this.handleChange('establishmentItemServeTime')}
                                            margin="normal"
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={(e) => this.createItem(e)}
                                            className={classes.button}
                                        >
                                            Create
                                        </Button>
                                    </form>
                                </div>
                                <div className="col" style={{marginLeft: '10px'}} >
                                    <div className={classes.container}>
                                        <List>
                                            {
                                                establishmentMenu.length > 0 &&
                                                establishmentMenu.map(item => (
                                                    <ListItem key={item.name}>
                                                        <ListItemText primary={item.name} />
                                                        <ListItemSecondaryAction>
                                                            <IconButton onClick={() => this.removeItem(item.name)}>
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
                        )
                    }
                    {
                        activeStep === 4 && (
                            <div className="row">
                                <div className="col mr3">
                                    <form className={classes.container}>
                                        <TextField
                                            id="name"
                                            label="Name"
                                            className={classes.textField}
                                            value={this.state.establishmentItemName}
                                            onChange={this.handleChange('establishmentItemName')}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="name"
                                            label="Photo"
                                            className={classes.textField}
                                            value={this.state.establishmentItemImage}
                                            onChange={this.handleChange('establishmentItemImage')}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="name"
                                            label="Item Price"
                                            className={classes.textField}
                                            value={this.state.establishmentItemPrice}
                                            onChange={this.handleChange('establishmentItemPrice')}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="name"
                                            label="Pipeline Time"
                                            className={classes.textField}
                                            value={this.state.establishmentItemPipelineTime}
                                            onChange={this.handleChange('establishmentItemPipelineTime')}
                                            margin="normal"
                                        />
                                        <TextField
                                            id="name"
                                            label="Serve Time"
                                            className={classes.textField}
                                            value={this.state.establishmentItemServeTime}
                                            onChange={this.handleChange('establishmentItemServeTime')}
                                            margin="normal"
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={(e) => this.createItem(e)}
                                            className={classes.button}
                                        >
                                            Create
                                        </Button>
                                    </form>
                                </div>
                                <div className="col" style={{marginLeft: '10px'}} >
                                    <div className={classes.container}>
                                        <List>
                                            {
                                                establishmentMenu.length > 0 &&
                                                establishmentMenu.map(item => (
                                                    <ListItem key={item.name}>
                                                        <ListItemText primary={item.name} />
                                                        <ListItemSecondaryAction>
                                                            <IconButton onClick={() => this.removeItem(item.name)}>
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
                        )
                    }
                    <div>
                        <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>
            </div>
      )
    }
}

export default withStyles(styles)(EstablishmentRegister)