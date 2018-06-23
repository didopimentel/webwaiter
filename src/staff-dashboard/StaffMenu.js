import React, { Component } from 'react'
import { MenuOfItems } from '../components/MenuOfItems'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { ItemModal } from '../components/ItemModal'
import { Loading } from '../components/Loading'

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


const categories = [
  {
    name: "Main Food"
  },
  {
    name: "Breakfast"
  }
]
const dishes = [
  {
    id: 0,
    dishName: "Bread",
    price: 50,
    category: "Main Food",
    description: "This is a bread",
    ingredients: [
      "Bread",
      "Butter",
      "Plate"
    ]
  },
  {
    id: 1,
    dishName: "Pasta",
    price: 25,
    category: "Main Food",
    description: "This is pasta",
    ingredients: [
      "Pasta",
      "Butter",
      "Olive Oil",
      "Red Sauce"
    ]
  }
]


class StaffMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category: 'Main Food',
      modalOpen: false,
      currentDishId: 0,
      isRequesting: false
    }
    this.handleCategory = this.handleCategory.bind(this)
  }

  handleCategory (e, category) {
    this.setState({
      category
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

  render() {
    const { currentDishId, modalOpen, category, isRequesting } = this.state
    const currentDish = modalOpen ?
                          dishes.filter((_) => _.id == currentDishId)
                                .reduce((obj, item) => {
                                  return item
                                }, {})
                          : {}

    if (isRequesting)
      return (
        <Loading type="spin" color="lightblue"/>
      )

    return (
      <div>
        <ItemModal
          modalOpen={this.state.modalOpen}
          toggleModalClose={this.toggleModalClose}
          currentDish={currentDish}
        />
        <MenuOfItems
          category={category}
          handleCategory={this.handleCategory}
          toggleModalOpen={this.toggleModalOpen}
          owner="employee"
          categories={categories}
          dishes={dishes}
        />
      </div>
    )
  }
}

export default connect()(StaffMenu)
