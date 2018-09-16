import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import ItemModal from '../components/ItemModal'
import '../styles/menu.css'
import MenuOfItems from '../components/MenuOfItems'
import { menuActions } from '../actions/menuActions'
import { orderActions } from '../actions/orderActions'
import { Loading } from '../components/Loading'


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
    const { dispatch } = this.props

    dispatch(menuActions.getAllDishes())

    dispatch(menuActions.getAllCategories())
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
                          dishes.filter((_) => _.id === currentDishId)
                          : {}

    if ( this.props.dishes.requesting || this.props.categories.requesting ) {
      return   <div className="container"><Loading type="spin" color="lightblue"/></div>
    }

    if (category === '' && categories) {
      this.setState({
        category: categories[0].name
      })
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
        <div className='row mt-3'>
          <div className="col-12 text-center">
            <Button
              color="secondary"
              variant="contained"
              onClick={this.orderItems}
            > Order
            </Button>
          </div>
        </div>
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
