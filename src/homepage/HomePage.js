import React, { Component } from 'react'
import { establishmentActions } from '../actions/establishmentActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import '../styles/main.css'
import * as Colors from '@material-ui/core/colors'
import { connect } from 'react-redux'


class HomePage extends Component {

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
    e.preventDefault()
    const { dispatch } = this.props
    const code  = this.state.establishmentCode
    dispatch(establishmentActions.login(code))

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
    const { customerAccess, establishmentCode } = this.state

    return(
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
              <Button
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
            <Button
              className="button"
              label="Login"
              primary="true"
              onClick={this.loginCustomer()}
              />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  }
}

export default connect(mapStateToProps)(HomePage)
