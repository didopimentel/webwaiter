import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/menu.css'
import { menuService } from '../services/menuService'
import { orderActions } from '../actions/orderActions'
import { menuActions } from '../actions/menuActions'
import { Loading } from '../components/Loading'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Slider from "react-slick";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import queryString from 'query-string'

const quantityArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

class CategoryMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category: '',
      menu: [],
      order: undefined
    }
  }


  componentDidMount() {
      const queryParams = queryString.parse(this.props.location.search)
      menuService.getDishesOfCategory(queryParams.categoryId).then((dishes) => {
          this.setState({
              menu: dishes
          });
      })
    if (!this.props.categories.categories) this.props.dispatch(menuActions.getAllCategories())
  }
  

  toggleModalOpen = (id) => {
    this.setState({
      modalOpen: true,
      currentDishId: id
    })
  }

  toggleModalClose = () => {
    this.setState({
      modalOpen: false
    })
  }

  addItem = (itemId) => {
    const { dispatch } = this.props
    const itemQuantity = this.state.order[itemId].quantity;
    const itemPrice = this.state.order[itemId].price;
    if (itemQuantity !== 0) 
      dispatch(menuActions.requestDish(itemId, itemQuantity, itemPrice))
  }

  orderItems = () => {
    const { dispatch, order } = this.props;
    if (order) {
      dispatch(orderActions.orderItemsCustomer(order))
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleQuantityItem = (item, price, quantity) => {
    this.setState({
      order: {
        ...this.state.order,
        [item]: {
          quantity,
          price
        }
      }
    })
  }

  render(){
    const { menu, expanded, categoryId, order } = this.state
    const orderRedux = this.props.order
    const { categories } = this.props.categories
    const queryParams = queryString.parse(this.props.location.search)
    const orderTotalAmount = (!orderRedux || orderRedux.length == 0) ? 0 : orderRedux.reduce((total, currentOrder) => {return total + currentOrder.price * currentOrder.quantity }, 0)
    const settings = {
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      vertical: true,
      verticalSwiping: true,
      beforeChange: function(currentSlide, nextSlide) {
        
      },
      afterChange: function(currentSlide) {
        // var quantityDiv = document.getElementById(`quantity-${currentSlide}`);
        // quantityDiv.parentNode.className = "highlight";
      }
    };
    

    const categoryName = categories ? categories.filter((category) => category._id == queryParams.categoryId)[0].name : '';
    return (
      <div className="container-fluid">
        <div className="body-container">
          <div className="webwaiter-history-control-header">
            <Button onClick={() => this.props.history.push('/dashboard/home')} >
                <ChevronLeft  />
                Voltar
            </Button >
          </div>
          <p className="category-name">{categoryName}</p>
          <div className="webwaiter-horizontal-container">
            <div className="item-container">
              <div className="item-unit">
                { menu.length > 0 && menu.map((item) => (
                  <ExpansionPanel key={item._id}>
                    <ExpansionPanelSummary>
                      <Typography>{item.dish_name}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{paddingLeft: '30px'}} >
                      <div style={{display: 'flex', flexDirection: 'column', width: '100%'}} >
                        <h4>{item.description}</h4>
                        <p className="text-gray"> Quantidade </p>
                        <div>
                          <TextField
                            id="outlined-number"
                            label="Number"
                            value={this.state.number}
                            onChange={(e) => this.handleQuantityItem(item._id, item.price, e.target.value)}
                            type="number"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                          />
                          <span style={{paddingLeft: 10}}>
                            R$
                            {(this.state.order && this.state.order[item._id]) ? 
                              (item.price * this.state.order[item._id].quantity)
                              : item.price
                            } 
                          </span>    
                        </div>
                        <Button
                          color="primary"
                          variant="contained"
                          style={{marginTop: '15px'}}
                          onClick={() => this.addItem(item._id)}
                        >
                          ACRESCENTAR AO PEDIDO
                        </Button>
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )) }
              </div>
            </div>
          </div>
        </div>
        <div className="webwaiter-footer" style={{borderTop: '1px solid rgba(78, 78, 78, 0.37);'}}>
          <div className="text-right pb-4" >
            <span className="text-gray">TOTAL</span> 
            <span className="highlight-price" style={{paddingLeft: '5px'}}>R${orderTotalAmount}</span>
          </div>
          <Button 
              color="primary"
              variant="contained"
              onClick={() => this.orderItems()}
            > FAZER PEDIDO
          </Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { dishes, categories, order } = state
  return {
    categories,
    dishes,
    order
  }
}

export default connect(mapStateToProps)(CategoryMenu)
