import React, { Component } from 'react'
import { connect } from 'react-redux'
import './css/main.css'
import { establishmentActions } from '../actions/establishmentActions'


class Index extends Component {

  state = {
    establishmentCode : '',
    customerAccess: {
      customerId: '',
      password: ''
    },
    loginType: 'anonymous'
  }

  handleLoginType = (e) => {
    e.preventDefault(e);
    const { loginType } = this.state;
    
    if (loginType === 'anonymous') {
      this.setState({
        ...this.state,
        loginType: 'costumer-access'
      })
    }
    else {
      this.setState({
        ...this.state,
        loginType: 'anonymous'
      })
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
    const { loginType } = this.state

    return(
      <div className="container">
        <div className="login-page">
          { 
            (loginType === 'anonymous') 
            ? <div className="form">
                <button className="btn-info" onClick={(e) => this.handleLoginType(e)}>
                  Are you a registered costumer?
                </button>
                <div className="form-title">Establishment Access</div>
                <form className="login-form">
                  <input
                    type="text"
                    placeholder="Code"
                    onChange={(e) => this.establishmentCodeHandler(e)}/>
                  <button
                    className="btn btn-info"
                    onClick={(e) => this.submitEstablishmentCode(e)}
                  >login</button>
                  <p className="message">Not registered? <a>Create an account</a></p>
                </form>
              </div>
            : <div className="form">
                <button className="btn-info" onClick={(e) => this.handleLoginType(e)}>
                  Login Anonymously
                </button>
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
                    className="btn btn-info"
                  >login</button>
                  <p className="message">Not registered? <a>Create an account</a></p>
                </form>
              </div>
          }
        </div>
      </div>
    )
  }
}

export default connect()(Index)
