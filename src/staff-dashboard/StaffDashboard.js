import React, { Component } from 'react'
import './styles/staff-dashboard.css'
import Button from '@material-ui/core/Button'
import SvgIcon from '@material-ui/core/SvgIcon'
import Icon from '@material-ui/core/Icon'
import { connect } from 'react-redux'
import { staffActions } from '../actions/staffActions'
import { Loading } from '../components/Loading'
import { deactivateCall } from '../services/staffService'

class StaffDashboard extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(staffActions.getAllTables())
  }

  deactivateCall() {
    //deactivate table call
  }

  render() {
    const { history, isRequesting } = this.props
    const { tables } = this.props.tables
    if (isRequesting)
      return (
          <Loading type="spin" color="lightblue"/>
      )
    return (
      <div className="container">
        <div className="tables-container">
          {tables && tables.map((table) => (
            <div key={table.number} className="table-icon-container">
              <div className='table-icon-inside-flex'>
                  <Icon
                    onClick={() => this.deactivateCall}
                    className={"table-icon " + (table.status.callWaiter ? 'table-icon-called' : '')}/>
                <div>{table.number}</div>
              </div>
              <div className="table-icon-inside">
                {table.status.askForCheck && <SvgIcon /> }
              </div>
            </div>
          ))}

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tables: state.tables,
    isRequesting: state.tables.requesting
  }
}

export default connect(mapStateToProps)(StaffDashboard)
