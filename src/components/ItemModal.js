import React from 'react'
import Modal from 'react-modal'
import propTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'

const style = {
  content: {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: '500px',
    backgroundColor: 'lightblue'
  }
}

const modalData = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px'
  },
  header: {
    fontSize: '2em'
  },
  body: {
    fontSize: '1em'
  }
}

export const ItemModal = (props) => {
  const { currentDish, modalOpen, toggleModalClose } = props
  return(
  <Modal
    isOpen={modalOpen}
    onRequestClose={toggleModalClose}
    style={style}
  >
    <div style={modalData.content}>
      <div style={modalData.header}>
        {currentDish.dishName}
      </div>
      <Divider/>
      <div style={modalData.body}>
        {currentDish.description}
      </div>
      <Divider/>
      <div style={modalData.footer}>
        <List>
          <ListItem leftCheckbox={<Checkbox/>}>Rare</ListItem>
          <ListItem leftCheckbox={<Checkbox/>}>Medium</ListItem>
          <ListItem leftCheckbox={<Checkbox/>}>Well Done</ListItem>
        </List>
      </div>
    </div>
  </Modal>)
}

ItemModal.propTypes = {
  currentDish: propTypes.object.isRequired
}
