import React, { Component } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from "react-slick";
import { menuActions } from '../actions/menuActions'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux'
import { Loading } from '../components/Loading'
import { Route, Redirect } from 'react-router'


const styles = theme => ({
  root: {
    width: '100%',
    paddingTop: 2 * theme.spacing.unit,
    backgroundColor: theme.palette.background.paper,
  },
  typography: {
    margin: theme.spacing.unit
  }
});


const dayMedia = [
  {
    src: require('./images/dish1.jpg'),
    name: "This is an image!",
    description: "Esse é um prato muito apreciado por todos."
  },
  {
    src: require('./images/dish2.jpg'),
    name: "This is an image2!",
    description: "Esse é um prato muito apreciado por todos."
  },
  {
    src: require('./images/dish3.jpg'),
    name: "This is an image2!",
    description: "Esse é um prato muito apreciado por todos."
  }
]

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}


class Home extends Component {

  state = {
    media: {
      src: dayMedia[0].src,
      content: dayMedia[0].content
    },
    index: 0
  }


  componentDidMount() {
    this.props.dispatch(menuActions.getAllCategories())
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 3000,
      cssEase: "linear"
    };
    const { categories, classes } = this.props
    if (categories.requesting) 
      return (
        <div className="container"><Loading type="spin" color="lightblue"/></div>
      )

    return (
      <div className="container-fluid" style={{padding: '0 0 0 0'}}>
        <div className="body-container">
          <div className="carousel-container">
            {/* <Slider {...settings}>
              {
                dayMedia.map((dayOffer) => (
                  <div>
                    <div className="carousel-container-header">
                      <Typography variant="headline" className="text-danger">NOVIDADE!</Typography>
                      <Typography variant="body"> {dayOffer.name} </Typography>
                      <Typography variant="body"> {dayOffer.description} </Typography>
                    </div>
                    <img src={dayOffer.src} className="carousel-image"/>
                  </div>
                ))
              }  
            </Slider> */}
          </div>
            <div className={classes.root}>
              <List component="nav">
                {categories.categories && categories.categories.map((category) => (
                  <ListItemLink 
                    onClick={() => {this.props.history.push('/dashboard/category/?categoryId=' + category._id)} }
                  >
                    <ListItemText primary={category.name}/>
                  </ListItemLink>
                ))}
              </List>
            </div>
        </div>  
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { categories } = state
  return {
    categories
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Home))
