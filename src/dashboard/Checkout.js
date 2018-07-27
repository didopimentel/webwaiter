import React, { Component } from 'react'
import { connect } from 'react-redux'
import { orderActions } from '../actions/orderActions'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  buttonSmall: {
    fontSize: 12
  }
})

class Checkout extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(orderActions.getBillPerCustomer())
  }

  render () {
    const { billCustomer, classes } = this.props
    return(
      <div className="container mt-3">
        <ul className="pagination justify-content-center">
          <li className="page-item"><a className="page-link">1</a></li>
          <li className="page-item"><a className="page-link">2</a></li>
          <li className="page-item"><a className="page-link">3</a></li>
        </ul>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{padding:0, margin:0}} component="th" scope="row"> Item </TableCell>
              <TableCell style={{padding:0, margin:0}} className="text-center"> Quantity </TableCell>
              <TableCell style={{padding:0, margin:0}} className="text-right"> Unit Price </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { billCustomer && billCustomer.map((_item) => (
              <TableRow>
                <TableCell style={{padding:0, margin:0}}>{_item.dish_name}</TableCell>
                <TableCell className="text-center" style={{padding:0, margin:0}}>{_item.quantity}</TableCell>
                <TableCell className="text-right" style={{padding:0, margin:0}}>R${_item.price}</TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
        <div className="container-fluid">
          <div className="row">
            <div className="col-4 pull-right">
              Total:
            </div>
            <div className="col-4 pull-right">
              {billCustomer && billCustomer.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0) }
            </div>
          </div>
        </div>
        <div className="row pt mt-auto m-3 p-0">
          <div className="col-6 col-md-4 offset-md-2">
            <Button className={classes.buttonSmall} color="primary" variant="contained">Pay Online!</Button>
          </div>
          <div className="col-6 col-md-4 offset-md-2">
            <Button className={classes.buttonSmall} style={styles.buttonSmall} color="primary" variant="contained">Pay to Waiter</Button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    billCustomer: state.billCustomer.bill
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Checkout))
