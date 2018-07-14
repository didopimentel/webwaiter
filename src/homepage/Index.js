import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import './css/main.css'
import { establishmentActions } from '../actions/establishmentActions'

class Index extends Component {

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

  staffIdHandler(e){
    this.setState({
        staffId: e.target.value
    })
  }

  staffPasswordHandler(e){
    this.setState({
        password: e.target.value
    })
  }
  render(){
    const { staffId, password } = this.state

    return(
      <div className="container">
      <div className="login-page">
        <div className="form">
          <div className="form-title">Establishment Access</div>
          <form className="login-form">
            <input type="text" placeholder="Code"/>
            <button>login</button>
            <p className="message">Not registered? <a href="#">Create an account</a></p>
          </form>
        </div>
        <div className="form">
          <div className="form-title">Customer Access</div>
          <form className="login-form">
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <button>login</button>
            <p className="message">Not registered? <a href="#">Create an account</a></p>
          </form>
        </div>
      </div>
      </div>
    )
  }
}

export default connect()(Index)
