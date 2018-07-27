import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button }  from '@material-ui/core/Button';
import MenuItem from './MenuItem';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';


export const MenuOfItems = (props) => {
  const { owner, category, categories, dishes, handleCategory, toggleModalOpen } = props
  return (
  <div>
    <div className="category-selection-container">
        <List>
          {categories && categories.map((_category) => (
            <ListItem
              button
              onClick={(e) => handleCategory(e, _category.name)}
            >
              <ListItemText
                style={{backgroundColor: (category == _category) ? 'black' : 'none'}}
                primary={_category.name} />
            </ListItem>
          ))}
        </List>
    </div>
    <div className="panel panel-default" style={{padding:5}}>
    <Table fixedHeader={false} style={{minWidth:300}}>
      <TableHead>
        <TableRow>
          <TableCell padding='none' className="col-xs-8">Name</TableCell>
          <TableCell style={{paddingRight:0}} className="col-xs-2">Price</TableCell>
          <TableCell padding='none' className="col-xs-1">Quantity</TableCell>
          <TableCell padding='default' className="col-xs-1">Order</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dishes && dishes.filter((dish) => dish.category === category)
             .map((dish) => {
               return (
                <MenuItem
                  key={dish.id}
                  owner={owner}
                  toggleModalOpen={toggleModalOpen}
                  name={dish.dish_name}
                  id={dish.id}
                  price={dish.price}
               />
             )
         })}
      </TableBody>
    </Table>
  </div>
  </div>
)
}
