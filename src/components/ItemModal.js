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
    transform             : 'translate(-50%, -50%)',
    backgroundColor: 'lightblue',
    borderColor: 'black',
    borderWidth: '1px'
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
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: '1px'
  },
  footerItems: {
    padding: '15%'
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
        <Divider/>
        <img src={currentDish.imageUrl} height={300} width={350} style={{padding:10}}/>
      </div>
      <Divider/>
      <div style={modalData.body}>
        {currentDish.description}
      </div>
      <Divider/>
      <div style={modalData.footer}>
        <div style={modalData.footerItems}>Options: </div>
        <List style={modalData.footerItems}>
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
