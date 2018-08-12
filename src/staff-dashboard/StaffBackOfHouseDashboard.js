import React, { Component } from 'react';
import ItemWorkflowCard from './components/ItemWorkflowCard';
import OrderWorkflowCard from './components/OrderWorkflowCard';
import { orderActions } from '../actions/orderActions'
import { connect } from 'react-redux'
import { Loading } from '../components/Loading'

const styles = {
    PipelineRow: {
        border: '1px',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'black'
    }
}

class StaffBackofHouseDashboard extends Component {
    
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(orderActions.getOrdersPerTable('backofhouse'))
            
    }

    render() {
        const { ordersPerTable, requesting } = this.props
        if (requesting) {
            return (
                <Loading type="spin" color="blue" />
            )
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        <div className="panel panel-success">
                            <div className="panel-heading text-center">
                                <div className="row">
                                    <div className="col-4">
                                        TABLE
                                    </div>
                                    <div className="col-8">
                                        ORDER ITEMS
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body text-center align-text-middle">
                                {ordersPerTable && ordersPerTable.map(_tableOrders => (    
                                    <div className="row" style={{marginBottom: 15}}>
                                        <div className="col-4"style={{verticalAlign:'baselign'}}>
                                            <div className="panel panel-default" style={{height:'100%'}}>
                                                <div style={{verticalAlign:'middle', position:'relative', top:'45%'}}>
                                                    Table {_tableOrders.number}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            {_tableOrders.orders.map(_orders => (
                                                <div className="row"  style={{marginBottom: 10, marginTop: 5, marginRight:'1px', backgroundColor: 'rgba(210,212,216,0.3)', borderRadius:'3px'}}>
                                                    <div className="col-12">
                                                        {_orders.item_list.map(_order => (
                                                            <div className="row"  style={{marginBottom: 5}}>
                                                                <div className="col-12" style={{height:30}}>
                                                                    <span style={{verticalAlign:'middle'}}>
                                                                        {_order.dish_name}
                                                                    </span>
                                                                </div>  
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading text-center">
                                <div className="row">
                                    <div className="col">
                                        QUEUE
                                    </div>
                                    <div className="col">
                                        PIPELINE
                                    </div>
                                    <div className="col">
                                        ITEM READY
                                    </div>
                                    <div className="col">
                                        PICKUP READY
                                    </div>
                                    <div className="col">
                                        SERVED
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                {ordersPerTable && ordersPerTable.map((tableOrders, tableIndex) => (
                                    <div className="row text-center" style={{marginBottom: 15}}>
                                        <div className="col">
                                            {tableOrders.orders.map((orders) => (
                                                <div className="row"  style={{marginBottom: 10, marginTop:5}}>
                                                    <div className="col-12">
                                                        {orders.item_list.map((items) => (
                                                            <div className="row" style={{marginBottom: 5}}>
                                                                <div className="col-12">
                                                                    {items.status == 'Queue' ?
                                                                        <ItemWorkflowCard tableIndex={tableIndex} orderId={orders._id} itemId={items.item_id} status={items.status} nextStatus='Pipeline' startTime={items.start_time} endTime={items.end_time}/> 
                                                                        : <ItemWorkflowCard />
                                                                    } 
                                                                        
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="col">
                                            {tableOrders.orders.map((orders) => (
                                                    <div className="row" style={{marginBottom: 10, marginTop:5}}>
                                                        <div className="col-12">
                                                            {orders.item_list.map((items) => (
                                                                <div className="row" style={{marginBottom: 5}}>
                                                                    <div className="col-12">
                                                                    {items.status == 'Pipeline' ? 
                                                                        <ItemWorkflowCard tableIndex={tableIndex} orderId={orders._id} itemId={items.item_id} status={items.status} nextStatus='Item Ready' startTime={items.start_time} endTime={items.end_time}/> 
                                                                        : <ItemWorkflowCard />}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                        <div className="col">
                                            {tableOrders.orders.map((orders) => (
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
                                            {tableOrders.orders.map((orders) => (
                                                    <div className="row" style={{marginBottom: 15, marginTop:5}}>
                                                        <div className="col-12">
                                                            <OrderWorkflowCard height={(35)*orders.item_list.length - 5} order={orders}/>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                        <div className="col" style={{backgroundColor:'#e6e6ff', borderRadius:5}}>
                                            {tableOrders.orders.map((orders) => (
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
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-2">
                        <div className="panel panel-success">
                            <div className="panel-heading text-center">
                                <div className="row">
                                    <div className="col">
                                        <h5>COMMUNICATION</h5>
                                        <h5>WITH WAITER</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body text-center align-text-middle">
                                <div className="row">
                                    <div className="col">
                                        <div className="row">
                                            <div className="col">
                                                <div className="panel" style={{height:'100%'}}>
                                                    <button className="btn btn-success">Message In</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="panel" style={{height:'100%'}}>
                                                    <button className="btn btn-success">Message Out</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { ordersPerTable, requesting } = state.orders;
    return {
        ordersPerTable,
        requesting
    }
}

export default connect(mapStateToProps)(StaffBackofHouseDashboard)