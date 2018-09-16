import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { tableActions } from '../actions/tableActions'
import InputAdornment from '@material-ui/core/InputAdornment';
import TableAndChair from './images/tableandchairs.svg'

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
      <div className="container mw-25" style={{marginTop:100}} >
        <div className="panel panel-info">
          <div className="panel-heading">
            Please, insert your table number:
          </div>
          <div className="panel-body">
            <div className="row text-center">
              <div className="col-12 col-sm-6">
                <TextField
                  onChange={(e) => this.handleTableID(e)}
                  style={{width: '20%'}}
                  margin='dense'
                  /*InputProps={{
                    startAdornment: (
                      <InputAdornment style={{padding:10}} >
                        <img src={TableAndChair}/>
                      </InputAdornment>
                    )
                  }}*/
                />
                </div>
                <div className="col-12 col-sm-6 pt-3">
                  <Button
                    mini={true}
                    className="btn btn-info"
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
