import React from 'react';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from './MenuItem';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { ListItemIcon } from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons'
import './styles/components.css'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 20,
  },
  table: {
    minWidth: 700,
    fontSize: 14,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const MenuOfItems = (props) => {
  const { owner, category, categories, dishes, handleCategory, toggleModalOpen } = props
  const { classes } = props;
  return (
  <div>
    <div className="category-selection-container">
        <List>
          {categories && categories.map((_category) => (
            <ListItem
              key= {_category._id}
              button
              onClick={(e) => handleCategory(e, _category._id)}
            >
              <ListItemIcon>
                <KeyboardArrowRight />
              </ListItemIcon>
              <ListItemText
                style={{backgroundColor: (category === _category) ? 'black' : 'none'}}
                primary={_category.name} />
            </ListItem>
          ))}
        </List>
    </div>
    <Table className='table-container' fixedheader={false}>
      <TableHead className='table-header'>
        <TableRow className="table-row">
          <TableCell style={{padding:'0 0 0 5px'}} className="col-8 table-cell">Name</TableCell>
          <TableCell style={{paddingRight:0}} className="col-2 table-cell ">Price</TableCell>
          <TableCell padding='none' className="col-1 table-cell ">Quantity</TableCell>
          <TableCell padding='default' className="col-1 table-cell ">Order</TableCell>
        </TableRow>
      </TableHead>
      <TableBody className='table-body'>
        {dishes && dishes.filter((dish) => dish.category === category)
             .map((dish) => {
               return (
                <MenuItem
                  key={dish.id}
                  owner={owner}
                  toggleModalOpen={toggleModalOpen}
                  name={dish.dish_name}
                  id={dish._id}
                  price={dish.price}
               />
             )
         })}
      </TableBody>
    </Table>
  </div>
)
}


export default withStyles(styles)(MenuOfItems);
