import React, { Component } from 'react'
import { MenuOfItems } from '../components/MenuOfItems'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { ItemModal } from '../components/ItemModal'
import { Loading } from '../components/Loading'
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
    imageUrl: "https://tabledb.s3.amazonaws.com/hgwlandingpage/promotion/57eb38c3e4b04d135dfee153/morganfield_20170601_3840.jpg",
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
    imageUrl: "https://tabledb.s3.amazonaws.com/hgwlandingpage/promotion/57eb38c3e4b04d135dfee153/morganfield_20170601_3840.jpg",
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
      currentDishId: 0
    }
    this.handleCategory = this.handleCategory.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(menuActions.getAllDishes())
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
    const { currentDishId, modalOpen, category } = this.state
    const { isRequesting } = this.props
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

function mapStateToProps(state) {
  const { dishes, requesting } = state.dishes
  return {
    menu: dishes,
    isRequesting: requesting
  }
}

export default connect(mapStateToProps)(StaffMenu)
