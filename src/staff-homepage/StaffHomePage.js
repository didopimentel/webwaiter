import React, { Component } from 'react'
import { connect } from 'react-redux'
import './css/main.css'
import { establishmentActions } from '../actions/establishmentActions'

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
    return(
      <div className="container">
        <div className="login-page">
           <div className="form">
                <div className="form-title">Staff Access</div>
                <form className="login-form">
                  <input
                    type="text"
                    placeholder="username"
                    onChange={(e) => this.staffIdHandler(e)}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => this.staffPasswordHandler(e)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={(e) => this.loginStaff(e)}
                  >login</button>
                </form>
              </div>
        </div>
      </div>
    )
  }
  }

export default connect()(StaffHomePage)
