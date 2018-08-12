import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles/staff-orders.css'
import SvgIcon from '@material-ui/core/SvgIcon'
import * as data from './test-data'
import Modal from 'react-modal'
import { orderActions } from '../actions/orderActions'
import { Loading } from '../components/Loading'

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

const titles = [
  'Table',
  'Order',
  'Items',
  'Item Status',
  'Pick-up Ready',
  'Served',
]

class StaffOrders extends Component {

  state = {
    modalOpen: false,
    viewingMessage: {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(orderActions.getOrdersPerTable())
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
    const { requesting, ordersPerTable } = this.props.orders
    if (requesting)
      return (
        <Loading type="spin" color="lightblue"/>
      )
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
            <SvgIcon style={{width: 50, height: 50}}/>
          </div>
          <table className="order-table">
            <tbody>
            <tr>
              {titles.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
            {ordersPerTable && ordersPerTable.map((table) => (
              <tr>
                <td style={{backgroundColor: 'gray'}}>
                  {table.number}
                </td>
                <td>
                  <table className="child-table">
                    <tbody>
                    {table.items.map((item) => (
                      <tr>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </td>
                <td>
                  <table className="order-table child-table">
                    <tbody>
                    {table.items.map((item) => (
                      <tr className="inside-data">
                        <td>
                          <div>
                          {item.name}
                          </div>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </td>
                <td>
                  <table className="order-table child-table">
                    <tbody>
                    {table.items.map((item) => (
                      <tr>
                        <td>
                          <div className={((item.status !== 'Queue') ? 'ready-item' : 'notready-item')}>
                          &nbsp;
                          </div>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </td>
                <td>
                  {(table.items
                              .filter((_) => _.status === false)
                              .length == 0)
                              ? <SvgIcon />
                              : false
                  }
                </td>
                <td>
                  {(table.items
                              .filter((_) => _.status === false)
                              .length == 0)
                              ? <SvgIcon />
                              : false
                  }
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          <div className="centralize-container padding-top">
            <SvgIcon style={{width: 50, height: 50}}/>
          </div>
          <table className="order-table messages-table">
            <thead>
              <tr>
                <th>Message</th>
                <th>Station</th>
                <th>Content</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.messages.map((message) => (
                <tr onClick={() => this.showMessage(message)}>
                  <td>{message.direction}</td>
                  <td>{message.station}</td>
                  <td>{message.content}</td>
                  <td>{message.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    orders: state.orders
  }
}

export default connect(mapStateToProps)(StaffOrders)
