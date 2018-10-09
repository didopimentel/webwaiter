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
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { adminService } from '../services/adminService';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import { FilePicker } from 'react-file-picker';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

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

class Menu extends Component {

    state = {
        name: '',
        queue_max_time: '',
        pipeline_max_time: '',
        estimated_time: '',
        categories: [],
        category: '',
        price: '',
        description: '',
        items: '',
        image: null
    }
    
    componentDidMount() {
        adminService.getCategories()
            .then((categories) => {
                this.setState({
                    categories,
                    category: categories[0].name
                })
            })
        adminService.getItems()
            .then((items) => {
                this.setState({
                    items
                })
            })
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    onPickImage = (image) => {
        this.setState({
            image
        })
    }

    createItem = (e) => {
        const categoryId = this.state.categories.filter(category => category.name == this.state.category)[0]._id;
        const itemToCreate = {
            dish_name: this.state.name,
            queue_max_time: this.state.queue_max_time,
            pipeline_max_time: this.state.pipeline_max_time,
            estimated_time: this.state.estimated_time,
            category: categoryId,
            description: this.state.description,
            price: this.state.price,
            station_id: 1
        };

        adminService.createItem(itemToCreate)
            .then(() => {
                window.location.reload();
            })
    }

    removeItem = (e, id) => {
        e.preventDefault();
        adminService.removeItem(id)
            .then(() => {
                window.location.reload();
            })
    }
      
    render() {
        const { classes } = this.props
        const { items, categories } = this.state
        console.log(categories)
        return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className={classes.container}>
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <Typography>Create a new item for your menu</Typography>
                            </div>
                            <div className="panel-body">
                                <form className={classes.container}>
                                    <FilePicker
                                        extensions={['jpg', 'jpeg', 'png']}
                                        dims={{minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500}}
                                        onChange={FileObject => (this.setState({image: FileObject}))}
                                    >
                                        <button>
                                            Upload an image
                                        </button>
                                    </FilePicker>
                                    <TextField
                                        label="Name"
                                        placeholder="Dish name for your customers."
                                        onChange={(e) => this.handleChange('name')(e)}
                                        className={classNames(classes.textField, classes.margin)}
                                    />
                                    <TextField
                                        label="Description"
                                        placeholder="A description of the item."
                                        onChange={(e) => this.handleChange('description')(e)}
                                        className={classNames(classes.textField, classes.margin)}
                                    />
                                    <TextField
                                        label="Price"
                                        placeholder="Price of the dish."
                                        onChange={(e) => this.handleChange('price')(e)}
                                        className={classNames(classes.textField, classes.margin)}
                                    />
                                    <FormControl className={classNames(classes.margin, classes.textField)}>
                                        <InputLabel shrink htmlFor="select-category">Category</InputLabel>
                                        <NativeSelect
                                            value={this.state.category}
                                            onChange={this.handleChange('category')}
                                            inputProps={<Input name="category" id="category-native-helper" />}
                                        >
                                            {categories && categories.map((category) => (
                                                <option key={category._id} value={category.name}>{category.name}</option>
                                            ))}
                                        </NativeSelect>
                                        <FormHelperText>Please select the category for the item</FormHelperText>
                                    </FormControl>
                                    <TextField
                                        label="Default queue time"
                                        placeholder="The default queue time."
                                        onChange={(e) => this.handleChange('queue_max_time')(e)}
                                        className={classNames(classes.textField, classes.margin)}
                                    />
                                    <TextField
                                        label="Default pipeline time"
                                        placeholder="The default pipeline time."
                                        onChange={(e) => this.handleChange('pipeline_max_time')(e)}
                                        className={classNames(classes.textField, classes.margin)}
                                    />
                                    <TextField
                                        label="Estimated serve time"
                                        placeholder="The default estimated time to serve."
                                        onChange={(e) => this.handleChange('estimated_time')(e)}
                                        className={classNames(classes.textField, classes.margin)}
                                    />
                                    <Button 
                                        className={classes.margin}
                                        variant="contained"
                                        color="primary"
                                        onClick={(e) => this.createItem(e)}
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
                        <Typography>Manage your items.</Typography>
                    </div>
                        <div className="panel-body">
                            <List>
                                {   items &&
                                    items.map((item) => (
                                        <ListItem>
                                            <ListItemText primary={item.dish_name} />
                                            <ListItemSecondaryAction>
                                                <IconButton onClick={(e) => this.removeItem(e, item._id)}>
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

}

export default withStyles(styles)(connect(mapStateToProps)(Menu))