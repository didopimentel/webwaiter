import React, { Component } from 'react'
import MenuOfItems from '../components/MenuOfItems'
import { connect } from 'react-redux'
import ItemModal from '../components/ItemModal'
import { Loading } from '../components/Loading'
import { menuActions } from '../actions/menuActions'
import { orderActions } from '../actions/orderActions'
import { staffActions } from '../actions/staffActions'
import Button  from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import TextField  from '@material-ui/core/TextField'

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

class StaffMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category: '',
      modalOpen: false,
      currentDishId: '',
      popoverOpen: false,
      tableNumber: ''
    }
    this.handleCategory = this.handleCategory.bind(this)
    this.handleOrderButton = this.handleOrderButton.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(menuActions.getAllDishes())
    dispatch(staffActions.getAllTables())
    dispatch(menuActions.getAllCategories())
  }


  handleCategory (e, category) {
    this.setState({
      category
    })
  }

  handleOrderButton = (event) => {
    event.preventDefault();
    this.setState({
      popoverOpen: true,
      anchorEl: event.currentTarget
    })
  }

  togglePopoverClose = (event) => {
    this.setState({
      popoverOpen: false
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

  handleTableText = (event) => {
    event.preventDefault()
    this.setState({
      tableNumber: event.target.value
    })
  }

  orderItems = (event) => {
    event.preventDefault()
    const { dispatch, order, tables } = this.props
    const tableID = tables.filter((table) => table.number === this.state.tableNumber)[0]._id
    if (order) {
      dispatch(orderActions.orderItems(order, tableID))
    }
    this.setState({
      popoverOpen: false
    })
  }

  render() {
    const { currentDishId, modalOpen, category } = this.state
    const { requesting } = this.props;
    const { categories } = this.props.categories;
    const { dishes } = this.props.dishes;
    const currentDish = modalOpen ?
                          dishes.filter((_) => _.id === currentDishId)
                                .reduce((obj, item) => {
                                  return item
                                }, {})
                          : {}
                              
    if (category == '' && categories) {
      this.setState({
        category: categories[0].name
      })
    }

    if (requesting)
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
        <div style={{margin:'0 50%'}}>
        <Popover
          open={this.state.popoverOpen}
          anchorEl={this.state.anchorEl}
          canAutoPosition={true}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.togglePopoverClose}
        >
          <div style={[{width: 150}, {padding:20}]}>
            <TextField
              onChange={(e) => this.handleTableText(e)}
              style={{width: 150}}
              fullWidth= {false}
              hintText="Table Number" />
            <Button
              label="Order Now!"
              onClick={this.orderItems}
            />
          </div>
        </Popover>
        <Button
          label="Order"
          onClick={this.handleOrderButton}
        />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { order, tables, orders, categories, dishes } = state
  const requesting = (tables.requesting || dishes.requesting || categories.requesting) ? true : false
  return {
    orders: orders,
    tables: tables.tables,
    order: order,
    dishes: dishes,
    requesting: requesting,
    categories: categories
  }
}

export default connect(mapStateToProps)(StaffMenu)
