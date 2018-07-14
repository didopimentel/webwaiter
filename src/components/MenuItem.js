import React, { Component } from 'react'
import Add from 'material-ui/svg-icons/content/add'
import Remove from 'material-ui/svg-icons/content/remove'
import './styles/menu-item.css'
import { connect } from 'react-redux'
import { menuActions } from '../actions/menuActions'
import { TableRowColumn, TableRow } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import ActionDescription from 'material-ui/svg-icons/action/description'
import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton'

const styles = {
  iconButton: {
    width: 15,
    height: 15,
  },
  iconButtonRoot: {
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
        onClick={() => this.test()} className="hover-effect" >
        <TableRowColumn className="expand-column">
          {this.props.name}
        </TableRowColumn>
        <TableRowColumn>
          R${this.props.price}
        </TableRowColumn>
        <TableRowColumn className="fixed-width">
          {quantity}
        </TableRowColumn>
        <TableRowColumn>
          <IconButton
            style={styles.iconButtonRoot}
            iconStyle={styles.iconButton}
            onClick={() => this.addItem(quantity)}>
            <Add/>
          </IconButton>
          <IconButton
            style={styles.iconButtonRoot}
            iconStyle={styles.iconButton}
            onClick={() => this.removeItem(quantity)}>
            <Remove/>
          </IconButton>
        </TableRowColumn>
      </TableRow>
    )
  }
}

<TableRowColumn>
  <IconButton
    mini={true}
    onClick={() => this.toggleModalFromChild()}
  >
    <ActionDescription className="muidocs-icon-action-home"/>
  </IconButton>
</TableRowColumn>

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
