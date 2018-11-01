import React, { Component } from 'react';
import ItemWorkflowCard from './components/ItemWorkflowCard';
import OrderWorkflowCard from './components/OrderWorkflowCard';
import { orderActions } from '../actions/orderActions'
import { connect } from 'react-redux'
import { Loading } from '../components/Loading'
import '../styles/webwaiter-styles.css'
import BackOfHouseTable from '../helpers/TableGenerator'
import { PageTitle } from '../components/PageTitle'

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
            <div className="container-fluid" style={{backgroundColor: '#ddf5ff'}}>
                <PageTitle content="Acompanhamento de Pedidos"/>
                {ordersPerTable && 
                <BackOfHouseTable tableArray={ordersPerTable} />
                }
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