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
import Button from '@material-ui/core/Button';
import Wifi from '@material-ui/icons/Wifi'
import Person from '@material-ui/icons/Person'
import { orderService } from '../services/orderService'
import { Loading, SmallLoading } from '../components/Loading'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  buttonSmall: {
    fontSize: 12,
    height: 50
  },
  iconSmall: {
    fontSize: 20,
    marginRight: theme.spacing.unit
  },
  tableFooter: {
    fontSize: 20,
    margin: theme.spacing.unit,

  }
})

class Checkout extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(orderActions.getBillPerCustomer())
  }

  checkoutOnline(e) {
    const { billCustomer } = this.props;
    e.preventDefault();
    var amount = billCustomer.bill ? billCustomer.bill.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0)
                                   : 0
    if (amount) {
      orderActions.postOrderPayment(amount);
    }
  }

  render () {
    const { billCustomer, classes } = this.props
    if (billCustomer.requesting) {
      return <div><Loading type="spin" color="lightblue" /> </div>
    }
    return(
      <div className="container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{padding:0, margin:0}} component="th" scope="row"> Item </TableCell>
              <TableCell style={{padding:0, margin:0}} className="text-center"> Quantity </TableCell>
              <TableCell style={{padding:0, margin:0}} className="text-right"> Unit Price </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { billCustomer.bill && billCustomer.bill.map((_item) => (
              <TableRow>
                <TableCell style={{padding:0, margin:0}}>{_item.dish_name}</TableCell>
                <TableCell className="text-center" style={{padding:0, margin:0}}>{_item.quantity}</TableCell>
                <TableCell className="text-right" style={{padding:0, margin:0}}>R${_item.price}</TableCell>
              </TableRow>
            )) }
          </TableBody>
          <TableFooter>
            <TableRow className="">
              <TableCell style={{width: '100%'}}></TableCell>
              <TableCell>
                <h5>Total:</h5>
              </TableCell>
              <TableCell>
                <h5>{billCustomer.bill && billCustomer.bill.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0) }</h5>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <div className="row">
          <div className="col-6 col-md-2 offset-md-4">
            {
              billCustomer && billCustomer.requestingPayment 
              ? 
              <SmallLoading type="spin" color="lightblue"/>
              : 
              <Button 
                className={classes.buttonSmall} 
                color="primary" 
                variant="contained"
                onClick={(e) => this.checkoutOnline(e)}>
                  <Wifi className={classes.iconSmall}/>
                Pagar Online!
              </Button>
            }
          </div>
          <div className="col-6 col-md-2">
            {
              billCustomer && billCustomer.requestingPayment 
              ? 
              <SmallLoading type="spin" color="lightblue"/>
              : 
              <Button className={classes.buttonSmall} style={styles.buttonSmall} color="primary" variant="contained">
                <Person className={classes.iconSmall}/>
                Pagar ao garçom
              </Button>
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {

  return {
    billCustomer: state.billCustomer
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Checkout))
