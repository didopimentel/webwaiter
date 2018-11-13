import React, { Component } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../styles/webwaiter-styles.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { establishmentActions } from '../actions/establishmentActions'

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: `${theme.spacing.unit * 2}px`,
  },
  button: {
    margin: theme.spacing.unit,
    width: '100%'
  },
  buttonSmall: {
    width: '100px' 
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  typography: {
    color: theme.palette.text.primary,
    padding: theme.spacing.unit * 2
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  wrapper:{
    margin: '0 auto',
    maxWidth: 400
  }
});

class StaffHomePage extends Component {

  state = {
    staffId: '',
    password: ''
  }

  loginStaff(e) {
    e.preventDefault()
    const { dispatch } = this.props
    const { staffId, password } = this.state
    dispatch(establishmentActions.loginStaff(
      staffId,
      password
    ))
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  render(){
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Grid container spacing={24} className={classes.centralizedGrid}>
            <Grid item xs={12}>
              <Typography
                className={classes.typography}
                variant="headline" 
                color="inherit"
              >
                Área do Colaborador
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label="Usuário"
                onChange={(e) => this.handleChange('staffId')(e)}
                className={classes.textField}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Senha"
                onChange={(e) => this.handleChange('password')(e)}
                className={classes.textField}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => this.loginStaff(e)}
                className={classes.button}>
                Confirmar
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
  }

export default connect()(withStyles(styles)(StaffHomePage))
