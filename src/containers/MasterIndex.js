import React, { Component } from 'react'
import '../styles/master-index.css'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class MasterIndex extends Component {

  state = {
    username: '',
    password: ''
  }

  handleUsername(e) {
    this.setState({
      ...this.state,
      username: e.target.value
    })
  }

  handlePassword(e) {
    this.setState({
      ...this.state,
      password: e.target.value
    })
  }

  login() {

  }

  render(){

    return(
      <div className="container-fluid">
        <div className="container-login">
          <TextField
            hintText="Username"
            className="text-field"
            onChange={(e) => this.handleUsername(e)}
          />
          <TextField
            hintText="Password"
            className="text-field"
            onChange={(e) => this.handlePassword(e)}
          />
          <RaisedButton
            label="Login"
            onClick={() => this.login()}
          />
        </div>
      </div>
    )
  }
}


export default MasterIndex
