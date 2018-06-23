import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
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
    const { staffId, password } = this.state

    return(
      <div className="container-fluid">
        <div className="container-fluid text-center">
          <h5>
            Staff Access
          </h5>
          <div className="card-block">
            <TextField
                style={{maxWidth: '20em', minWidth: '5em', margin: 5}}
                hintText="Staff ID"
                onChange={(e) => this.staffIdHandler(e)}
                value={staffId}
                />
            <TextField
                style={{maxWidth: '20em', minWidth: '5em', margin: 5}}
                hintText="Password"
                onChange={(e) => this.staffPasswordHandler(e)}
                value={password}
                />
            <RaisedButton
              className="button"
              label="Login"
              primary="true"
              onClick={(e) => this.loginStaff(e)}
              />
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(StaffHomePage)
