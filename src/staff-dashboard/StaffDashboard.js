import React, { Component } from 'react'
import './styles/staff-dashboard.css'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'

const tables = [
  {
    id: 2
  },
  {
    id: 4
  },
  {
    id: 7
  },
  {
    id: 9
  },
  {
    id: 11
  },
  {
    id: 13
  }
]

class StaffDashboard extends Component {

  render() {

    return (
      <div className="container">
        <div className="header">
          <IconButton>
            <FontIcon className='table-icon'/>
          </IconButton>
        </div>
        <div className="tables-container">
          {tables.map((table) => (
            <div className="table-icon-container">
              <IconButton>
                <FontIcon className='table-icon'/>
              </IconButton>
              <span style={{padding:20}}>{table.id}</span>
            </div>
          ))}

        </div>
      </div>
    )
  }
}


export default StaffDashboard
