import React, { Component } from 'react'
import Add from 'material-ui/svg-icons/content/add'
import Remove from 'material-ui/svg-icons/content/remove'
import { connect } from 'react-redux'
import requestDish from '../actions/menuActions'
import styles from '../styles/menu-item.css'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton'

class MenuItem extends Component {

  state = {
    quantity: 0
  }

  addItem = () => {
    const { dispatch, id, quantity } = this.props
    dispatch(requestDish(id, quantity+1))
  }

  removeItem = () => {
    const { dispatch, id, quantity } = this.props
    var newQuantity = quantity == 0
                      ? quantity : quantity-1
    dispatch(requestDish(id, newQuantity))
  }

  render(){
    const quantity = this.props.quantity ?
                      this.props.quantity
                      : 0
    return (
      <Paper className="item-container">
        <div className="description-container">
          {this.props.name}
        </div>
        <div className="price-container">
          R${this.props.price}
        </div>
        <div className="quantity-container">
          {quantity}
        </div>
        <div className="auxiliar-container">
          <IconButton
            onClick={() => this.addItem()}>
            <Add/>
          </IconButton>
          <IconButton
            onClick={() => this.removeItem()}>
            <Remove/>
          </IconButton>
        </div>
        <FloatingActionButton
          onClick={this.props.toggleModalOpen}
        >GO
        </FloatingActionButton>
      </Paper>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { order } = state
  return order ? {
    quantity: order[ownProps.id]
  } : false
}

export default connect(mapStateToProps)(MenuItem)
