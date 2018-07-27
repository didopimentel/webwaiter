import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import './css/main.css'
import { establishmentActions } from '../actions/establishmentActions'

class Index extends Component {

  state = {
    establishmentCode : '',
    customerAccess: {
      customerId: '',
      password: ''
    }
  }

  establishmentCodeHandler = (e) => {
    this.setState({
      establishmentCode: e.target.value
    })
  }

  submitEstablishmentCode = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    const code  = this.state.establishmentCode
    dispatch(establishmentActions.login(code))

  }

  loginCustomer(){

  }

  customerIdHandler = (e) => {
    this.setState({
      customerAccess: {
        customerId: e.target.value
      }
    })
  }

  customerPasswordHandler = (e) => {
    this.setState({
      customerAccess: {
        password: e.target.value
      }
    })
  }
  render(){
    const { customerAccess, establishmentCode } = this.state

    return(
      <div className="container">
      <div className="login-page">
        <div className="form">
          <div className="form-title">Establishment Access</div>
          <form className="login-form">
            <input
              type="text"
              placeholder="Code"
              onChange={(e) => this.establishmentCodeHandler(e)}/>
            <button
              className="btn btn-primary"
              onClick={(e) => this.submitEstablishmentCode(e)}
            >login</button>
            <p className="message">Not registered? <a href="#">Create an account</a></p>
          </form>
        </div>
        <div className="form">
          <div className="form-title">Customer Access</div>
          <form className="login-form">
            <input
              type="text"
              placeholder="username"
              onChange={(e) => this.customerIdHandler(e)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => this.customerPasswordHandler(e)}
            />
            <button
              className="btn btn-primary"
            >login</button>
            <p className="message">Not registered? <a href="#">Create an account</a></p>
          </form>
        </div>
      </div>
      </div>
    )
  }
}

export default connect()(Index)
