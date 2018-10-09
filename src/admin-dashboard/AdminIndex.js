import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox'
import AdminEmployees from './Employees'
import AdminCategories from './Categories'
import AdminMenu from './Menu'
import AdminTable from './Tables'
import AdminStations from './Stations'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const AdminDrawer = ({props}) => (
    <Drawer
        variant="permanent"
        style={{position:'relative', width:240}}
    >
        <List>
            <ListItem button >
                <ListItemIcon><InboxIcon/></ListItemIcon>
                <ListItemText>Index</ListItemText>
            </ListItem>
            <Link to={`${props.match.url}/employees`} style={{ textDecoration: 'none' }}>
                <ListItem>
                    <ListItemIcon><InboxIcon/></ListItemIcon>
                    <ListItemText>Employees</ListItemText>
                </ListItem>
            </Link>
            <Link to={`${props.match.url}/tables`} style={{ textDecoration: 'none' }} >
                <ListItem button>
                    <ListItemIcon><InboxIcon/></ListItemIcon>
                    <ListItemText>Tables</ListItemText>
                </ListItem>
            </Link>
            <Link to={`${props.match.url}/menu`} style={{ textDecoration: 'none' }} >
                <ListItem button>
                    <ListItemIcon><InboxIcon/></ListItemIcon>
                    <ListItemText>Item Menu</ListItemText>
                </ListItem>
            </Link>
            <Link to={`${props.match.url}/categories`} style={{ textDecoration: 'none' }} >
                <ListItem button>
                    <ListItemIcon><InboxIcon/></ListItemIcon>
                    <ListItemText>Categories</ListItemText>
                </ListItem> 
            </Link>
            <Link to={`${props.match.url}/stations`} style={{ textDecoration: 'none' }} >
                <ListItem button>
                    <ListItemIcon><InboxIcon/></ListItemIcon>
                    <ListItemText>Stations</ListItemText>
                </ListItem> 
            </Link>
        </List>
    </Drawer>
)

class AdminIndex extends Component {


    render () {
        const { pathname } = this.props.history.location
        return (
            <div 
            style={{paddingLeft: 240, paddingTop:100}}>
                <AdminDrawer props={this.props} />
                { pathname == '/admin/employees' ? <AdminEmployees /> : <div></div> }
                { pathname == '/admin/categories' ? <AdminCategories /> : <div></div> }
                { pathname == '/admin/menu' ? <AdminMenu /> : <div></div> }
                { pathname == '/admin/tables' ? <AdminTable /> : <div></div> }
                { pathname == '/admin/stations' ? <AdminStations /> : <div></div> }
            </div>
        )
    }
}

export default connect()(AdminIndex)