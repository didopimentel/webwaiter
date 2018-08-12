import React, { Component } from 'react'
import './styles/menu-item.css'
import { connect } from 'react-redux'
import { menuActions } from '../actions/menuActions'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Icon from '@material-ui/core/Icon'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

const styles = {
  Icon: {
    width: 15,
    height: 15,
  },
  IconRoot: {
    width: 30,
    height: 30,
    padding: 5
  },
}

class MenuItem extends Component {

  constructor(props) {
    super(props);
    this.toggleModalFromChild = this.toggleModalFromChild.bind(this);
    this.state = {
      quantity: 0,
      id: props.id,
      owner: props.owner
    }
  }


  toggleModalFromChild () {
    this.props.toggleModalOpen(this.state.id)
  }

  addItem = (quantity) => {
    const { dispatch, id } = this.props
    dispatch(menuActions.requestDish(id, quantity+1))
  }

  removeItem = (quantity) => {
    const { dispatch, id } = this.props
    var newQuantity = quantity == 0
                      ? quantity : quantity-1
    dispatch(menuActions.requestDish(id, newQuantity))
  }

  test() {
    console.log('teste')
  }

  render(){
    const { order } = this.props
    const quantity =  order ?
                      order.quantity
                      : 0
    return (
      <TableRow
        onClick={() => this.test()}>
        <TableCell padding='none' className="col-6">
          {this.props.name}
        </TableCell>
        <TableCell style={{paddingRight:20, paddingLeft:20}} numeric className="col-2">
          R${this.props.price}
        </TableCell>
        <TableCell>
          {quantity}
        </TableCell>
        <TableCell>
        <div className="row">
            <button onClick={() => this.addItem(quantity)} className="btn btn-info btn-sm col-md-12 hover-effect">
              +
            </button>
            <button onClick={() => this.removeItem(quantity)} className="btn btn-danger btn-sm col-md-12 hover-effect">
              -
            </button>
        </div>
        </TableCell>
      </TableRow>
    )
  }
}

<TableCell>
  <Icon
    mini={true}
    onClick={() => this.toggleModalFromChild()}
  >
    <Icon className="muidocs-icon-action-home"/>
  </Icon>
</TableCell>

function mapStateToProps(state, ownProps) {
  const { order } = state
  const thisOrder = order.filter((order) => order.item_id == ownProps.id)
  return (thisOrder.length > 0) ? {
    order: thisOrder.reduce((obj, item) => {
                             return item
                           })
  } : false
}

export default connect(mapStateToProps)(MenuItem)
