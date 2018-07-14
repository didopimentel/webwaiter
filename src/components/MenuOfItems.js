import React from 'react'
import { List, ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from './MenuItem'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export const MenuOfItems = (props) => {
  const { owner, category, categories, dishes, handleCategory, toggleModalOpen } = props
  return (
  <div>
    <div className="category-selection-container">
        <List>
          {categories && categories.map((category) => (
            <ListItem
              onClick={(e) => handleCategory(e, category.name)}
              primaryText={category.name}
            />
          ))}
        </List>
    </div>
    <Table>
      <TableHeader
          displaySelectAll={false}  adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Price</TableHeaderColumn>
            <TableHeaderColumn>Quantity</TableHeaderColumn>
          <TableHeaderColumn>Order</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
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
)
}
