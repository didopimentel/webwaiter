import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SvgIcon from '@material-ui/core/SvgIcon/'
import Avatar from '@material-ui/core/Avatar'
import { Redirect } from 'react-router-dom'
import { tableActions } from '../actions/tableActions'
import img_avatar from './images/img_avatar.png'
import Badge from '@material-ui/core/Badge'

class Dashboard extends Component {

  state = {
    tableID: ''
  }

  handleTableID(e) {
    this.setState({
      tableID: e.target.value
    })
  }

  componentDidMount() {
    const { tableAuthentication } = this.props
    if (tableAuthentication) {
      if (tableAuthentication.tableAccess)
      this.props.history.push('/dashboard/menu')
    }
  }

  submitTable(e) {
    e.preventDefault()
    const { tableID } = this.state
    const { dispatch, authentication } = this.props
    if (tableID !== ''){
      dispatch(tableActions.login(authentication.establishmentCode, this.state.tableID))
    }
  }

  render(){
    return(
      <div className="container mt-3 mw-25">
        <div className="panel panel-info">
          <div className="panel-heading">
            Please, insert your table number:
          </div>
          <div className="panel-body">
            <div className="row text-center">
              <div className="col-12">
                <TextField
                  onChange={(e) => this.handleTableID(e)}
                  hintText="Table ID"
                />
                <Button
                  mini={true}
                  onClick={(e) => this.submitTable(e)}
                  >
                    OK
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="panel panel-info">
            <div className="panel-heading">
              Separate bill?
            </div>
            <div className="panel-body">
              <div className="row text-center">
                <div className="col-4">
                  <span className="glyphicon glyphicon-list display-2"></span>
                </div>
                <div className="col-8">
                  <div className="row">
                    <div className="col-3">Used:</div>
                    <div className="col">
                      <button className="btn btn-secondary badge" disabled>1</button>
                      <button className="btn btn-secondary badge" disabled>2</button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">New:</div>
                    <div className="col">
                      <button className="btn btn-success badge">3</button>
                      <button className="btn btn-success badge">4</button>
                      <button className="btn btn-success badge">5</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  const { authentication, tableAuthentication }  = state;
  return {
    authentication,
    tableAuthentication
  }
}


export default connect(mapStateToProps)(Dashboard)
