import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import { ItemModal } from '../components/ItemModal'
import Modal from 'react-modal'
import '../styles/menu.css'
import { MenuOfItems } from '../components/MenuOfItems'
import { menuActions } from '../actions/menuActions'
import { orderActions } from '../actions/orderActions'
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

class Menu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category: '',
      modalOpen: false,
      currentDishId: ''
    }
    this.handleCategory = this.handleCategory.bind(this)
  }


  componentDidMount() {
    const { categories } = this.props
    const { dispatch } = this.props
    dispatch(menuActions.getAllDishes())
    dispatch(menuActions.getAllCategories())
    this.setState({
      category: categories ? categories.categories : ''
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

  orderItems = () => {
    const { dispatch, order } = this.props;
    if (order) {
      dispatch(orderActions.orderItems(order, ''))
    }
  }

  render(){
    const { dishes } = this.props.dishes
    const { categories } = this.props.categories
    const { category, currentDishId } = this.state
    const currentDish = this.state.modalOpen ?
                          dishes.filter((_) => _.id == currentDishId)
                          : {}

    if ( this.props.dishes.requesting || this.props.categories.requesting ) {
      return   <Loading type="spin" color="lightblue"/>
    }

    return (
      <div className="container">
        <ItemModal
          modalOpen={this.state.modalOpen}
          toggleModalClose={this.toggleModalClose}
          currentDish={currentDish}
        />
        <MenuOfItems
          category={category}
          handleCategory={this.handleCategory}
          toggleModalOpen={this.toggleModalOpen}
          owner="customer"
          categories={categories}
          dishes={dishes}
        />
        <RaisedButton
          label="Order"
          primary={true}
          onClick={this.orderItems}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { tableAuthentication, dishes, categories, order } = state
  return {
    loggedInTable: tableAuthentication.loggedInTable,
    categories,
    dishes,
    order
  }
}

export default connect(mapStateToProps)(Menu)
