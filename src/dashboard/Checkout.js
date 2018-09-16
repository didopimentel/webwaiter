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
  tableFooter: {
    fontSize: 20,
    margin: theme.spacing.unit,

  }
})

class Checkout extends Component {
  
  state = {
    paying: false    
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(orderActions.getBillPerCustomer())
  }

  async checkoutOnline(e) {
    const { billCustomer } = this.props;
    e.preventDefault();
    var amount = billCustomer.bill ? billCustomer.bill.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0)
                              : 0
    this.setState({
      paying: true
    })
    if (amount) {
      await orderService.checkoutOrder(amount)
        .then(response => {
          if (response) {
            this.setState({
              paying: false
            })
          }
        })
    }
  }

  render () {
    const { billCustomer, classes } = this.props
    const { paying } = this.state
    if (billCustomer.requesting) {
      return <div><Loading type="spin" color="lightblue" /> </div>
    }
    return(
      <div className="container mt-3">
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
        <div className="row pt mt-auto m-3 p-0">
          <div className="col-6 col-md-4 offset-md-2">
            {
              paying 
              ? 
              <SmallLoading type="spin" color="lightblue"/>
              : 
              <Button 
                className={classes.buttonSmall} 
                color="primary" 
                variant="contained"
                onClick={(e) => this.checkoutOnline(e)}>Pay Online!</Button>
            }
          </div>
          <div className="col-6 col-md-4 offset-md-2">
            {
              paying 
              ? 
              <SmallLoading type="spin" color="lightblue"/>
              : 
              <Button className={classes.buttonSmall} style={styles.buttonSmall} color="primary" variant="contained">Pay to Waiter</Button>
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
