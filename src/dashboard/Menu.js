import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from './MenuItem'
import Modal from 'react-modal'
import styles from '../styles/menu.css'

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

const categories = ['Starters', 'Main Dishes']
const dishes = [
  {
    id: 0,
    name: 'Bread',
    price: 10.0,
    category: 'Starters',
    description: 'A delicious bread to start off',
    image: '',
    options: ''
  },
  {
    id: 1,
    name: 'Pasta',
    price: 15.0,
    category: 'Main Dishes',
    description: 'This is pasta',
    image: '',
    options: ''
  },
  {
    id: 2,
    name: 'Pizza',
    price: 30.0,
    category: 'Main Dishes',
    description: 'This is a pizza',
    image: '',
    options: ''
  }
]

class Menu extends Component {

  state = {
    category: 'Starters',
    modalOpen: false
  }

  toggleModalOpen = () => {
    this.setState({
      modalOpen: true
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
    //const { loggedIn, establishment } = this.props
    console.log(this.props)
    const { category } = this.state
    return(
      <div className="container">
      <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.toggleModalClose}
        style={modalStyle}
      >
      <h2>Dish name</h2>

      </Modal>
        <div className="category-selection-container">
          <div>
            <List>
              {categories.map((category) => (
                <ListItem
                  onClick={(e) => this.handleCategory(e, category)}
                  primaryText={category}
                />
              ))}
            </List>
          </div>
        </div>
        <div className="item-selection-container">
          <List>
            {dishes.filter((dish) => dish.category === category)
                   .map((dish) => {
                     return (
                      <MenuItem
                        key={dish.id}
                        toggleModalOpen={() => this.toggleModalOpen()}
                        name={dish.name}
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
  const { loggedIn, authentication } = state
  const { establishment } = authentication.establishmentAccess
  return {
    loggedIn,
    establishment
  }

}

export default connect(mapStateToProps)(Menu)
