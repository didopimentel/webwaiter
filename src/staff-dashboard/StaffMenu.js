import React, { Component } from 'react'
import { MenuOfItems } from '../components/MenuOfItems'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { ItemModal } from '../components/ItemModal'
import { Loading } from '../components/Loading'
import { menuActions } from '../actions/menuActions'
import { orderActions } from '../actions/orderActions'
import { staffActions } from '../actions/staffActions'
import Button  from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import { Menu, MenuItem } from '@material-ui/core/Menu'
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
    const tableID = tables.filter((table) => table.number == this.state.tableNumber)[0]._id
    if (order) {
      dispatch(orderActions.orderItems(order, tableID))
    }
    this.setState({
      popoverOpen: false
    })
  }

  render() {
    const { currentDishId, modalOpen, category } = this.state
    const { isRequesting, orders } = this.props
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
  console.log(state)
  const { dishes, requesting } = state.dishes
  const { order, tables, orders } = state
  return {
    orders: orders,
    tables: tables.tables,
    order: order,
    menu: dishes,
    isRequesting: requesting
  }
}

export default connect(mapStateToProps)(StaffMenu)
