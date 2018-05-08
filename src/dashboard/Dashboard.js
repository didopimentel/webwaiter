import React, { Component } from 'react'
import { darkWhite } from 'material-ui/styles/colors'
import '../styles/dashboard.css'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import ActionAssignment from 'material-ui/svg-icons/action/assignment'
import ActionPayment from 'material-ui/svg-icons/action/payment'
import MapsLocalDining from 'material-ui/svg-icons/maps/local-dining'
import Avatar from 'material-ui/Avatar'
import ActionReceipt from 'material-ui/svg-icons/action/receipt'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {

  render(){

    return(
      <div className='container'>
        <div className='logo-container'>
          <Avatar
            src="dashboard/images/img_avatar.png"
            size={100}
          />
        </div>
        <div className='navigation-bar'>
          <IconButton>
            <ActionHome tooltip="Home"/>
          </IconButton>
          <IconButton>
            <ActionAssignment tooltip="Menu"/>
          </IconButton>
          <IconButton>
            <ActionPayment tooltip="Checkout"/>
          </IconButton>
        </div>
        <div className='body-container'>
          <div className='table-id-container'>
            <MapsLocalDining style={{marginRight: 10}}/>
            <div className="table-id-text">
              Table ID
            </div>
          </div>
          <div className='bill-container'>
            <div className='bill-header'>
              <p>Separate bill?</p>
            </div>
            <div className='bill-body'>
              <ActionReceipt style={{flex:1}} tooltip='Separate your bill'/>
            </div>
          </div>
          <div className='home-submit'>
          <FloatingActionButton
            mini={true}
            onClick={(e) => this.props.history.push('/dashboard/menu')}
          >
            OK
          </FloatingActionButton>
          </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  const { authentication } = this.state;
  return {
    authentication
  }
}


export default Dashboard
