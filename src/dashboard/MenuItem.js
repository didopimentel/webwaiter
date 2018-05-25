import React, { Component } from 'react'
import Add from 'material-ui/svg-icons/content/add'
import Remove from 'material-ui/svg-icons/content/remove'
import { connect } from 'react-redux'
import { menuActions } from '../actions/menuActions'
import '../styles/menu-item.css'
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
      id: props.id
    }
  }


  toggleModalFromChild () {
    console.log('state id ',this.state.id)
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
        </div>
        <IconButton
          mini={true}
          onClick={() => this.toggleModalFromChild()}
        >
        <ActionDescription className="muidocs-icon-action-home"/>
        </IconButton>
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
