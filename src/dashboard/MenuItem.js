import React, { Component } from 'react'
import Add from 'material-ui/svg-icons/content/add'
import Remove from 'material-ui/svg-icons/content/remove'
import connect from 'react-redux'
import styles from '../styles/menu-item.css'
import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton'

class MenuItem extends Component {

  state = {
    quantity: 0
  }

  addItem = () => {
    this.setState({
      quantity: quantity+1
    })
  }

  removeItem = () => {
    var newQuantity = this.state.quantity == 0
                      ? this.state.quantity : this.state.quantity-1
    this.setState({
      quantity: quantity == 0 ? quantity : quantity--
    })
  }

  render(){
    return (
      <Paper className="item-container">
        <div className="description-container">
          {this.props.name}
        </div>
        <div className="price-container">
          R${this.props.price}
        </div>
        <div className="quantity-container">
          {this.state.quantity}
        </div>
        <div className="auxiliar-container">
          <Add/>
          <Remove/>
        </div>
        <FloatingActionButton
          onClick={this.props.toggleModalOpen}
        >GO
        </FloatingActionButton>
      </Paper>
    )
  }
}

export default connect()(MenuItem)
