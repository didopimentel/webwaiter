import React, { Component } from 'react'
import './styles/staff-orders.css'
import * as data from './test-data'
import ActionDone from 'material-ui/svg-icons/action/done'
import ActionDoneAll from 'material-ui/svg-icons/action/done-all'
import PlacesRoomService from 'material-ui/svg-icons/places/room-service'
import CommunicationChat from 'material-ui/svg-icons/communication/chat'
import Modal from 'react-modal'

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

class StaffOrders extends Component {

  state = {
    modalOpen: false,
    viewingMessage: {}
  }

  toggleModalClose() {
    this.setState({
      modalOpen: false
    })
  }

  toggleModalOpen() {
    this.setState({
      modalOpen: true
    })
  }

  showMessage(message) {
    this.setState({
      viewingMessage: message
    })
    this.toggleModalOpen()
  }

  render() {
    const { viewingMessage } = this.state ? this.state : {}
    return (
      <div>
        <div className="outer-container">
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={() => this.toggleModalClose()}
          style={modalStyle}
        > {viewingMessage.station + " sent: "}{viewingMessage.content}
        </Modal>
          <div className="centralize-container">
            <PlacesRoomService style={{width: 50, height: 50}}/>
          </div>
          <table>
            <tr>
              {data.titles.map((header) => (
                <th id={header}>{header}</th>
              ))}
            </tr>
            {data.tables.map((table) => (
              <tr>
                <td style={{backgroundColor: 'gray'}}>
                  {table.number}
                </td>
                <td>
                  <table className="child-table">
                    {table.items.map((item) => (
                      <tr>
                      </tr>
                    ))}
                  </table>
                </td>
                <td>
                  <table className="child-table">
                    {table.items.map((item) => (
                      <tr className="inside-data">
                        <td>
                          <div>
                          {item.name}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </table>
                </td>
                <td>
                  <table className="child-table">
                    {table.items.map((item) => (
                      <tr>
                        <td>
                          <div className={(item.status ? 'ready-item' : 'notready-item')}>
                          &nbsp;
                          </div>
                        </td>
                      </tr>
                    ))}
                  </table>
                </td>
                <td>
                  {(table.items
                              .filter((_) => _.status === false)
                              .length == 0)
                              ? <ActionDone />
                              : false
                  }
                </td>
                <td>
                  {(table.items
                              .filter((_) => _.status === false)
                              .length == 0)
                              ? <ActionDoneAll />
                              : false
                  }
                </td>
              </tr>
            ))}
          </table>
          <div className="centralize-container padding-top">
            <CommunicationChat style={{width: 50, height: 50}}/>
          </div>
          <table className="messages-table">
            <th>Message</th>
            <th>Station</th>
            <th>Content</th>
            <th>Status</th>
            {data.messages.map((message) => (
              <tr onClick={() => this.showMessage(message)}>
                <td>{message.direction}</td>
                <td>{message.station}</td>
                <td>{message.content}</td>
                <td>{message.status}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    )
  }
}

export default StaffOrders