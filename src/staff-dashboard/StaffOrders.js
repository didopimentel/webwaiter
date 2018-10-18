import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles/staff-orders.css'
import { orderActions } from '../actions/orderActions'
import { Loading } from '../components/Loading'
import Typography from '@material-ui/core/Typography';
import ItemWorkflowCard from './components/ItemWorkflowCard';
import OrderWorkflowCard from './components/OrderWorkflowCard';

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
    const { requesting, ordersPerTable } = this.props.orders
    if (requesting)
      return (
        <Loading type="spin" color="lightblue"/>
      )
    return (
      <div>
        <div className="outer-container">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <div className="row">
                {titles.map(title => (
                  <div className="col text-center">
                    <Typography>{title}</Typography>
                  </div>    
                ))}
              </div>
            </div>
            <div className="panel-body text-center align-text-middle">
                {ordersPerTable && ordersPerTable.map((_tableOrders, tableIndex) => (    
                    <div className="row" style={{marginBottom: 15}}>
                    <div className="col"style={{verticalAlign:'baselign'}}>
                        <div className="panel panel-default" style={{height:'100%'}}>
                            <div style={{verticalAlign:'middle', position:'relative', top:'45%'}}>
                                Table {_tableOrders.number}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        {_tableOrders.orders.map(orders => (
                            <div className="row"  style={{marginBottom: 10, marginTop: 5, borderRadius:'3px'}}>
                                <div className="col-12">
                                {orders.item_list.map((items) => (
                                      <div className="row" style={{marginBottom: 5}}>
                                          <div className="col-12">
                                              
                                              <ItemWorkflowCard />
                                                  
                                          </div>
                                      </div>
                                  ))}
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col">
                      {_tableOrders.orders.map((_orders) => (
                          <div className="row"  style={{marginBottom: 10, marginTop:5}}>
                              <div className="col-12">
                              {_orders.item_list.map(_order => (
                                  <div className="row"  style={{marginBottom: 5}}>
                                      <div className="col-12" style={{height:30, overflow:'hidden'}}>
                                          <span style={{verticalAlign:'middle'}}>
                                              {(_order.dish_name.length <= 20) ? _order.dish_name : _order.dish_name.substring(0, 20) + '...'}
                                          </span>
                                      </div>  
                                  </div>
                              ))}
                              </div>
                          </div>
                      ))}
                  </div>
                  <div className="col">
                      {_tableOrders.orders.map((orders) => (
                              <div className="row" style={{marginBottom: 10, marginTop:5}}>
                                  <div className="col-12">
                                      {orders.item_list.map((items) => (
                                          <div className="row" style={{marginBottom: 5}}>
                                              <div className="col-12  ">
                                              {items.status == 'Item Ready' ? 
                                              <ItemWorkflowCard tableIndex={tableIndex} orderId={orders._id} itemId={items.item_id} status={items.status} nextStatus='Item Ready' startTime={items.start_time} endTime={items.end_time} /> 
                                              : <ItemWorkflowCard/> }
                                              </div>
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          ))}
                  </div>
                  <div className="col" style={{backgroundColor:'#e6e6ff', borderRadius:5}}>
                      {_tableOrders.orders.map((orders) => (
                              <div className="row" style={{marginBottom: 15, marginTop:5}}>
                                  <div className="col-12">
                                      <OrderWorkflowCard height={(35)*orders.item_list.length - 5} order={orders}/>
                                  </div>
                              </div>
                          ))}
                  </div>
                  <div className="col" style={{backgroundColor:'#e6e6ff', borderRadius:5}}>
                      {_tableOrders.orders.map((orders) => (
                              <div className="row" style={{marginBottom: 15, marginTop:5}}>
                                  <div className="col-12">
                                      <OrderWorkflowCard height={(35)*orders.item_list.length - 5} order={orders}/>
                                  </div>
                              </div>
                          ))}
                  </div>
                </div>
                ))}
            </div>
            <div className="panel panel-primary">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col">
                      Message
                    </div>
                    <div className="col">
                      Station
                    </div>
                    <div className="col">
                      Content
                    </div>
                    <div className="col">
                      Status
                    </div>
                  </div>
                </div>
                <div className="panel-body">
                </div>
            </div>
          </div>
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
