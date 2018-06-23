import React from 'react'
import { List, ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from './MenuItem'

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
    <div className="item-selection-container">
      <List className="item-selection-container-list">
        {dishes && dishes.filter((dish) => dish.category === category)
               .map((dish) => {
                 return (
                  <MenuItem
                    key={dish.id}
                    owner={owner}
                    toggleModalOpen={toggleModalOpen}
                    name={dish.dishName}
                    id={dish.id}
                    price={dish.price}
                 />)
               })}
      </List>
    </div>
    <RaisedButton
      label="Order"
      primary={true}
    />
  </div>
)
}
