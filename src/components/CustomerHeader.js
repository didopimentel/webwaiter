import React from 'react';
import { withStyles } from '@material-ui/core/styles'; 
import Receipt from '@material-ui/icons/Receipt'
import RecordVoiceOver from '@material-ui/icons/RecordVoiceOver'
import Home from '@material-ui/icons/Home'
import Menu from '@material-ui/icons/Menu'
import AppBar from '@material-ui/core/AppBar'
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs'
import Logo from '../dashboard/images/logo.png'
import Tab from '@material-ui/core/Tab'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import blue from '@material-ui/core/colors/blue';
import Tooltip from '@material-ui/core/Tooltip';
import { tableService } from '../services/tableService';

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
      '&:hover': {
        color: blue[500],
        cursor: 'pointer'
      },
      marginRight: theme.spacing.unit
    },
    waiterTooltip: {
      position: 'absolute',
      maxWidth: '100px',
      borderRadius: '5px',
      textAlign: 'center',
      borderTopRightRadius: 0,
      backgroundColor: blue[500],
      opacity: 1,
      zIndex: 9999,
      padding: theme.spacing.unit,
      right: '40%',
      [theme.breakpoints.up('md')]: {
        right: '15%',
      },
    }
  })

const callWaiter = () => {
  tableService.callWaiter(); 
  document.getElementById('tooltip-callwaiter').style.display = 'block';
  setTimeout(function(){
    document.getElementById('tooltip-callwaiter').style.display = 'none';
  }, 3000)
}

const CustomerHeader = (props) => {
    const { classes, tableNumber, billNumber } = props;
    return (
    <div className={classes.root}>
      <div className="row">
        <div className="col-4">
          <div className="col-12">
            <Tooltip title="Número da mesa">
              <img src="https://png.icons8.com/ios/50/000000/restaurant-table.png" className={classes.icon}/>
            </Tooltip>
              {tableNumber}
          </div>
          <div className="col-12">
            <Tooltip title="Número da conta">
              <Receipt className={classes.icon} />
            </Tooltip>
              <span style={{position:'relative', bottom:'10px'}}>{billNumber}</span>
          </div>
        </div>
        <div className="col-4" style={{textAlign:'center', paddingTop: 10}}>
          <img src={Logo} className={classes.logo}/>
        </div>
        <div className="col-4" style={{textAlign:'right', paddingTop: 10}}>
          <Tooltip title="Chamar garçom">
            <RecordVoiceOver className={classes.iconRight} onClick={callWaiter}/>
          </Tooltip>
          <div id="tooltip-callwaiter" style={{display:'none'}} className={classes.waiterTooltip}>
            <Typography style={{color: 'white'}}>Garçom a caminho!</Typography>
          </div>
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