import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import '../styles/main.css'
import * as Colors from 'material-ui/styles/colors'



class Application extends Component {


  render(){
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
                    hintText="Establishment access code"/>
                  <RaisedButton className="button" label="Access" primary="true"/>
              </div>
            </div>

            <div className="container-fluid text-center">
              <h5>
                Customer Access
              </h5>
              <div className="card-block">
                <TextField
                    style={{maxWidth: '20em', minWidth: '5em'}}
                    hintText="Customer ID"/>
                <TextField
                    style={{maxWidth: '20em', minWidth: '5em'}}
                    hintText="Password"/>
                <RaisedButton className="button" label="Login" primary="true"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Application
