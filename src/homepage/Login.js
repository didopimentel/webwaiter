import React, { Component } from 'react'
import './css/home.css'
import '../styles/webwaiter-styles.css'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import { establishmentActions } from '../actions/establishmentActions'
import { Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
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
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    wrapper:{
      margin: '0 auto',
      maxWidth: 400
    }
  });

class Login extends Component {
    state = {
        username: '',
        password: '',
        establishmentCode: ''
    }

    submit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        const { username, password, establishmentCode} = this.state;
        if (username && password) {

        }
        else {
            if (establishmentCode)
                dispatch(establishmentActions.login(establishmentCode));
        }
    
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className="webwaiter-history-control-header">
                    <Button className={classes.buttonSmall} onClick={() => this.props.history.push('/')} >
                        <ChevronLeft className={classes.leftIcon} />
                        Voltar
                    </Button >
                </div>
                <div className="webwaiter-login-title" style={{textAlign: 'center'}}>
                    <Typography
                      variant="headline" 
                      color="inherit"
                    >
                      Login
                    </Typography>
                </div>
              <div className={classes.wrapper}>
                <div className="webwaiter-login-body">
                    <TextField 
                        label="Usuário"
                        onChange={(e) => this.handleChange('username')(e)}
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField 
                        label="Senha"
                        onChange={(e) => this.handleChange('password')(e)}
                        className={classes.textField}
                        margin="normal"
                    />
                    <h5 className="text-left pt3">Ou</h5>
                    <TextField 
                        label="Código do estabelecimento"
                        onChange={(e) => this.handleChange('establishmentCode')(e)}
                        className={classes.textField}
                        margin="normal"
                    />
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={(e) => this.submit(e)} 
                        className={classes.button}>
                        Confirmar
                    </Button>
                </div>
              </div>
                <div className="webwaiter-login-footer">
                </div>  
            </div>
      )
    }
}

export default connect()(withStyles(styles)(Login))