import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { orderActions } from '../../actions/orderActions'
import { menuService } from '../../services/menuService'
import './styles.css'
import { alertActions } from '../../actions/alertActions'
import Typography  from '@material-ui/core/Typography'


const styles = {
    itemOk: {
        backgroundColor: '#10a357',
        boxShadow: '1px 2px #888888',
        border: '1px',
        borderColor: 'blue',
        borderRadius: '3px',
        borderStyle: 'solid',
        height: '30px',
    },
    itemDelayed: {
        backgroundColor: 'yellow',
        boxShadow: '1px 2px #888888',
        border: '1px',
        borderColor: 'blue',
        borderRadius: '3px',
        borderStyle: 'solid',
        height: '30px',
    },
    itemVeryDelayed: {
        backgroundColor: 'red',
        boxShadow: '1px 2px #888888',
        border: '1px',
        borderRadius: '3px',
        borderStyle: 'solid',
        height: '30px',
    },
    noItem: {
        backgroundColor: 'white',
        boxShadow: '1px 2px #888888',
        border: '1px',
        borderRadius: '3px',
        borderStyle: 'solid',
        height: '30px',
    }
}

function differenceInMinutes(startDate) {
    var today = Date.now();
    var beginDate = Date.parse(startDate);
    var diffMs = (today - beginDate); // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    return diffMins
}
class ItemWorkflowCard extends Component {
 
    state = {
        delay: 'Ok',
        elapsedTime: ''
    }

    componentDidMount() {
        if (this.props.startTime && this.props.itemId, this.props.status){
            const elapsedTime = differenceInMinutes(this.props.startTime);
            menuService.getSpecificItem(this.props.itemId, this.props.status)
                .then((response) => {
                    if (response) {
                        var delay = ''
                        if (response.maxTime > elapsedTime) delay = 'Ok'
                        if (response.maxTime < elapsedTime) delay = 'Delayed'
                        if (response.maxTime + 10 < elapsedTime) delay = 'VeryDelayed'
                        this.setState({
                            delay: delay,
                            elapsedTime: elapsedTime
                        })
                    }
                })
                .catch((error) => {
                    if (error) this.props.dispatch(alertActions(error.message))
                })
        }
    }


    handleItemStatusChange(e) {
        e.preventDefault();
        const { orderId, itemId, tableIndex, status, nextStatus, dispatch } = this.props
        dispatch(orderActions.changeOrderItemStatus(orderId, itemId, tableIndex, status, nextStatus))
    }

    render() {
        const { elapsedTime } = this.state
        var delayStyle = styles.itemOk;
        if (this.state.delay == 'Delayed') delayStyle = styles.itemDelayed;
        if (this.state.delay == 'VeryDelayed') delayStyle = styles.itemVeryDelayed; 
        const { status, height } = this.props
        const timeToShow = (status != 'Item Ready') ? elapsedTime+' Minutes' : ''

        return status ? (
            <div className="hoverable" onClick={(e) => this.handleItemStatusChange(e)} style={delayStyle} height={height}>
                <Typography>
                     {timeToShow}
                </Typography>
            </div>
        )
            :
        (   
            <div style={styles.noItem} height={height}>
            </div>
        )

    }
}

ItemWorkflowCard.propTypes = {
    status: PropTypes.string
}

function mapStateToProps(state) {
}

export default connect(mapStateToProps)(ItemWorkflowCard)

