import React, { Component } from 'react'
import '../styles/webwaiter-styles.css'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const StatusModal = (props) => {
    const { anchorElement, handleClose, currentStatus } = props;
    let menuItems = [];

    switch (currentStatus) {
        case 'Queue':
            menuItems = ['Pipeline', 'Item Ready'];
            break;
        case 'Pipeline':
            menuItems = ['Item Ready'];
            break;
        case 'Item Ready':
        default:
            break;
    }

    return (
        <Menu
          id="simple-menu"
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          onClose={handleClose}
        >
            {
                menuItems.map((item) => (
                    <MenuItem
                        onClick={handleClose}
                    >
                    {item}
                    </MenuItem>
                ))
            }
        </Menu>
    )
}

const styles = theme => ({
    menuItem: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& $primary, & $icon': {
          color: theme.palette.common.white,
        },
      },
    },
    primary: {},
    icon: {},
  });

const generateKey = (date, item_id) => {
    return date + item_id;
}

class BackOfHouseTable extends Component {


    constructor(props) {
        super(props);
        this.state = {
            anchor: {
                element: null,
                key: null
            }
        }
        this.handleClose = this.handleClose.bind(this); 
    }

    handleClick = (event, key) => {
        this.setState({ anchor: {
            element: event.currentTarget,
            key: key
        } });
      };
    
    handleClose = () => {
    this.setState({ anchor: {
        element: null,
        key: null
    } });
    };

    render() {
        const { tableArray } = this.props
        return (
            <table className="table-backofhouse">
                <thead>
                    <tr>
                        <th>Mesa</th>
                        <th>Itens</th>
                        <th>Fila</th>
                        <th>Pipeline</th>
                        <th>Item Pronto</th>
                        <th>Pedido Pronto</th>
                        <th>Servido</th>
                    </tr>    
                </thead>
                <tbody>
                    {tableArray.map((table) => (
                        <tr>
                            <td>
                                <Typography variant="display1">
                                    {table.number}
                                </Typography>
                            </td>
                            <td className="no-side-border">
                                {table.orders.map(order => (
                                    <table className="innerTable-backofhouse" style={{height: calculateItemsFullHeight(order)}}>
                                        {order.item_list.map(item => (
                                            <tr>
                                                <td>
                                                    <Typography>{item.dish_name}</Typography>
                                                    <Typography style={{color: 'rgba(78, 78, 78)'}}>Quantidade: {item.quantity}</Typography>
                                                </td>
                                            </tr>
                                        ))}
                                    </table>
                                ))}
                            </td>
                            <td className="no-side-border">
                                {table.orders.map(order => (
                                    <table className="innerTable-backofhouse" style={{height: calculateItemsFullHeight(order)}}>
                                        {order.item_list.map(item => (
                                                <tr>
                                                {item.status == 'Queue' ? 
                                                    (
                                                        <td aria-owns={this.state.anchor.key == generateKey(item.start_time, item.item_id) ? 'simple-menu' : null}
                                                        onClick={(e) => this.handleClick(e, generateKey(item.start_time, item.item_id))}
                                                        className="hovering-table-item"
                                                        >
                                                            <StatusModal 
                                                                anchorElement={this.state.anchor.key == generateKey(item.start_time, item.item_id)  ? this.state.anchor.element : null} 
                                                                handleClose={this.handleClose} 
                                                                currentStatus={item.status}   
                                                            />
                                                                {item.status}
                                                        </td>
                                                    )
                                                    : (
                                                        <td>&nbsp;</td>
                                                    )
                                                }
                                                </tr>
                                        ))}
                                    </table>
                                ))}
                            </td>
                            <td className="no-side-border">
                                {table.orders.map(order => (
                                    <table className="innerTable-backofhouse" style={{height: calculateItemsFullHeight(order)}}>
                                        {order.item_list.map(item => (
                                            <tr>
                                                {item.status == 'Pipeline' ? 
                                                    (
                                                        <td aria-owns={this.state.anchor.key == generateKey(item.start_time, item.item_id) ? 'simple-menu' : null}
                                                        onClick={(e) => this.handleClick(e, generateKey(item.start_time, item.item_id))}
                                                        className="hovering-table-item"
                                                        >
                                                            <StatusModal 
                                                                anchorElement={this.state.anchor.key == generateKey(item.start_time, item.item_id)  ? this.state.anchor.element : null} 
                                                                handleClose={this.handleClose} 
                                                                currentStatus={item.status}   
                                                            />
                                                                {item.status}
                                                        </td>
                                                    )
                                                    : (
                                                        <td>&nbsp;</td>
                                                    )
                                                }
                                            </tr>
                                        ))}
                                    </table>
                                ))}
                            </td>
                            <td className="no-side-border">
                                {table.orders.map(order => (
                                    <table className="innerTable-backofhouse" style={{height: calculateItemsFullHeight(order)}}>
                                        {order.item_list.map(item => (
                                            <tr>
                                            {item.status == 'Item Ready' ? 
                                                (
                                                    <td className="item-ready">
                                                        {item.status}
                                                    </td>
                                                )
                                                : (
                                                    <td>&nbsp;</td>
                                                )
                                            }
                                        </tr>
                                        ))}
                                    </table>
                                ))}
                            </td>
                            <td className="no-side-border">
                                {table.orders.map(order => (
                                    <table className="innerTableOrders-backofhouse" style={{height: calculateItemsFullHeight(order)}}>
                                        <tr>
                                            <td>
                                                Ready
                                            </td>
                                        </tr>
                                    </table>
                                ))}
                            </td>
                            <td className="no-side-border">
                                {table.orders.map(order => (
                                    <table className="innerTableOrders-backofhouse" style={{height: calculateItemsFullHeight(order)}}>
                                        <tr>
                                            <td>
                                                Ready
                                            </td>
                                        </tr>
                                    </table>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}

function calculateItemsFullHeight (order) {
    return order.item_list.length * 120;
}

export function BackOfHouseOrderTable(data) {
    var rowSpanArray = []
    data.forEach(table => {
        var tableSpan = 0;
        var tableOrders = {
            number: table.number,
            orders: []
        }
        table.orders.forEach(order => {
            var thisOrder = {
                orderSpan: order.item_list.length,
                item_list: order.item_list
            }
            tableSpan = tableSpan + order.item_list.length
            tableOrders.orders.push(thisOrder); 
        })
        tableOrders = {
            ...tableOrders,
            tableSpan 
        }
        rowSpanArray.push(tableOrders);
    })
    return rowSpanArray
}

export default withStyles(styles)(BackOfHouseTable)