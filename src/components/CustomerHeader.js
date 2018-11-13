import React from 'react';
import { withStyles } from '@material-ui/core/styles'; 
import Receipt from '@material-ui/icons/Receipt'
import RecordVoiceOver from '@material-ui/icons/RecordVoiceOver'
import Home from '@material-ui/icons/Home'
import Menu from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import AppBar from '@material-ui/core/AppBar'
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs'
import Logo from '../dashboard/images/logo.png'
import Tab from '@material-ui/core/Tab'
import { Link } from 'react-router-dom'
import blue from '@material-ui/core/colors/blue';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    root: {
      width: '100%',
      paddingTop: 2 * theme.spacing.unit
    },
    icon: {
      margin: theme.spacing.unit,
      fontSize: 18,
      width: '18px'
    },
    logo: {
      width: '70px'
    },
    iconRight: {
      fontSize: 40,
      border: `1px solid ${blue[200]}`,
      '&:hover': {
        color: blue[500],
        cursor: 'pointer'
      },
      marginRight: theme.spacing.unit
    }
  })

const CustomerHeader = (props) => {
    const { classes } = props;
    return (
    <div className={classes.root}>
      <div className="row">
        <div className="col-4">
          <div className="col-12">
            <Tooltip title="Número de pessoas">
              <img src="https://png.icons8.com/ios/50/000000/restaurant-table.png" className={classes.icon}/>
            </Tooltip>
              2
          </div>
          <div className="col-12">
            <Tooltip title="Número de contas">
              <Receipt className={classes.icon} />
            </Tooltip>
          </div>
        </div>
        <div className="col-4" style={{textAlign:'center', paddingTop: 10}}>
          <img src={Logo} className={classes.logo}/>
        </div>
        <div className="col-4" style={{textAlign:'right', paddingTop: 10}}>
          <Tooltip title="Chamar garçom">
            <RecordVoiceOver className={classes.iconRight}/>
          </Tooltip>
        </div>
      </div>
      <AppBar
        position="static" color="default"
        style={{boxShadow: 'none'}}
      >
      <Tabs 
        centered
        indicatorColor="secondary"
        textColor="primary"
      >
        <Tab label="Home" icon={<Home/>} component={Link} style={{textDecoration:'none'}}  to="/dashboard/home"/>
        <Tab label="Menu" icon={<Menu/>} component={Link} style={{textDecoration:'none'}} to="/dashboard/menu" />
        <Tab label="Checkout" icon={<Receipt/>} component={Link} style={{textDecoration:'none'}} to="/dashboard/checkout" />
      </Tabs>
      </AppBar>
    </div>
    )
}
  
export default connect()(withStyles(styles)(CustomerHeader))