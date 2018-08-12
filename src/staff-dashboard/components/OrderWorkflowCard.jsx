import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


const OrderWorkflowCard = ({ height, order }) => {

    this.styles = {
        itemsOk: {
            backgroundColor: 'green',
            border: '1px',
            borderRadius: '3px',
            borderStyle: 'solid',
            height: height,
            boxShadow: '1px 2px #888888',
        },
        itemsNotReady: {
            backgroundColor: 'white',
            border: '1px',
            borderRadius: '3px',
            borderStyle: 'solid' ,
            height: height,
            boxShadow: '1px 2px #888888',
        },
        textSpan: {
            position:'relative',
            top:'35%',
            color: '#FFFFFF',
        }
    }


    const itemsNotReady = order.item_list.filter(_item => _item.status != 'Item Ready');

    return (itemsNotReady.length == 0) ?
    (
        <div style={this.styles.itemsOk}>
            <span style={this.styles.textSpan}>Ready!</span>
        </div>
    )
    :
    (
        <div style={this.styles.itemsNotReady}>
        </div>
    )
}

OrderWorkflowCard.propTypes = {
    height: PropTypes.number,
    order: PropTypes.object
}


export default connect()(OrderWorkflowCard)

