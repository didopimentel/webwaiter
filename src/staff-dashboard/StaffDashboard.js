import React, { Component } from 'react'
import Person from '@material-ui/icons/Person';
import { withStyles } from '@material-ui/core/styles'; 
import Restaurant from '@material-ui/icons/Restaurant';
import Description from '@material-ui/icons/Description';
import './styles/staff-dashboard.css'
import { connect } from 'react-redux'
import { staffActions } from '../actions/staffActions'
import blue from '@material-ui/core/colors/blue';
import { Loading } from '../components/Loading'
import Typography from '@material-ui/core/Typography'
import RestaurantTable from './images/RestaurantTable.svg'

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: blue[800],
    },
  }
})

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
        <div className="row">
          {tables && tables.map((table) => (
            <div key={table.number} className="col">
              <div className="row mr-0" style={{width: '140px'}}>
                <div className="col pr-2" style={{padding: 0, margin: 0, textAlign:'right'}}>
                  <Person className={table.status.call_waiter ? "service-called" : ""} style={{fontSize:'25px'}} style={{border:'2px solid'+blue[300]}} />
                </div>
                <div className="col p-1" style={{padding: 0, margin: 0, backgroundColor: blue[300], borderRadius: '2px'}}>
                  <img src="https://png.icons8.com/ios/50/000000/restaurant-table.png" width={70}/>
                </div>
                <div className="col pl-2" style={{padding: 0, margin: 0}}>
                  <Description className={table.status.ask_for_check ? "service-called" : ""} style={{fontSize:'25px'}} style={{border:'2px solid'+blue[300]}} />
                </div>
              </div>
              <div className="row text-center" style={{width:'140px'}} >
                <div className="col text-center">
                  <Typography variant="title" color="secondary">{table.number}</Typography>
                </div>
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

export default connect(mapStateToProps)(withStyles(styles)(StaffDashboard))
