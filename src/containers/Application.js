import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import '../styles/main.css'
import * as Colors from 'material-ui/styles/colors'
import { BrowserRouter, Router, Link } from 'react-router-dom'
import { signIn } from '../controllers/EstablishmentController'


class Application extends Component {

  state = {
    establishmentCode : '',
    customerAccess: {
      customerId: '',
      password: ''
    }
  }

  establishmentCodeHandler(e){
    this.setState({
      establishmentCode: e.target.value
    })
  }

  submitEstablishmentCode(e){
    signIn(this.state.establishmentCode).then((res) => console.log(res))
  }

  loginCustomer(){

  }

  customerIdHandler(e){
    this.setState({
      customerAccess: {
        customerId: e.target.value
      }
    })
  }

  customerPasswordHandler(e){
    this.setState({
      customerAccess: {
        password: e.target.value
      }
    })
  }


  render(){
    const { establishmentCode, customerAccess } = this.state
    return(
      <div>
        <AppBar zDepth="2" title="WebWaiter"/>
        <div className="container-main">
          <div className="container-fluid">
            <div className="container-fluid text-center">
              <h5>
                Establishment
              </h5>
              <div className="card-block">
                <TextField
                    style={{maxWidth: '20em', minWidth: '5em'}}
                    hintText="Establishment access code"
                    onChange={(e) => this.establishmentCodeHandler(e)}
                    value={establishmentCode}
                    />
                  <RaisedButton
                    className="button"
                    label="Access"
                    primary="true"
                    onClick={(e) => this.submitEstablishmentCode(e)}
                    />
              </div>
            </div>

            <div className="container-fluid text-center">
              <h5>
                Customer Access
              </h5>
              <div className="card-block">
                <TextField
                    style={{maxWidth: '20em', minWidth: '5em'}}
                    hintText="Customer ID"
                    onChange={(e) => this.customerIdHandler(e)}
                    value={customerAccess.customerId}
                    />
                <TextField
                    style={{maxWidth: '20em', minWidth: '5em'}}
                    hintText="Password"
                    onChange={(e) => this.customerPasswordHandler(e)}
                    value={customerAccess.password}
                    />
                <RaisedButton
                  className="button"
                  label="Login"
                  primary="true"
                  onClick={this.loginCustomer()}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Application
