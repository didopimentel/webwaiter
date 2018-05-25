import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from './MenuItem'
import Modal from 'react-modal'
import '../styles/menu.css'
import { menuActions } from '../actions/menuActions'

const modalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
}

class Menu extends Component {

  state = {
    category: '',
    modalOpen: false,
    currentDishId: 0
  }


  componentDidMount() {
    const { categories } = this.props
    const { dispatch } = this.props
    dispatch(menuActions.getAllDishes())
    dispatch(menuActions.getAllCategories())
    this.setState({
      category: categories[0]
    })
  }

  toggleModalOpen = (id) => {
    this.setState({
      modalOpen: true,
      currentDishId: id
    })
  }

  toggleModalClose = () => {
    this.setState({
      modalOpen: false
    })
  }

  handleCategory(e, category) {
    this.setState({
      category
    })
  }

  render(){
    const { dishes } = this.props.dishes
    const { categories } = this.props.categories
    const { category, currentDishId } = this.state
    const currentDish = this.state.modalOpen ?
                          dishes.filter((_) => _.id == currentDishId)
                          : {}
    //const dishOnModal = dishes.filter((_) => _.id == this.state.dishID)
    return(
      <div className="container">
      <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.toggleModalClose}
        style={modalStyle}
      >
        Description of the item
        <h2>{currentDish.dishName}</h2>
          <h4>{currentDish.description}</h4>
      </Modal>
        <div className="category-selection-container">
          <div>
            <List>
              {categories && categories.map((category) => (
                <ListItem
                  onClick={(e) => this.handleCategory(e, category.name)}
                  primaryText={category.name}
                />
              ))}
            </List>
          </div>
        </div>
        <div className="item-selection-container">
          <List className="item-selection-container-list">
            {dishes && dishes.filter((dish) => dish.category === category)
                   .map((dish) => {
                     return (
                      <MenuItem
                        key={dish.id}
                        toggleModalOpen={this.toggleModalOpen}
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
}

const ItemModal = (name, description, price) => (
  <div>
    {name}
    {description}
    {price}
  </div>
)

function mapStateToProps(state) {
  const { tableAuthentication, dishes, categories } = state
  return {
    loggedInTable: tableAuthentication.loggedInTable,
    categories,
    dishes
  }
}

export default connect(mapStateToProps)(Menu)
