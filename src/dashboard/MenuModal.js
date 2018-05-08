import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'

class MenuModal extends Component {

  state = {
    open: false
  }

  render() {
    return (
      <Dialog
        title="Dialog With Actions"
        modal={false}
        open={this.props.handleModalOpen}
        onRequestClose={this.props.handleModalClose}
      > Test
      </Dialog>
    )
  }
}

export default MenuModal
