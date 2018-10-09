import React, { Component } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from "react-slick";
import { menuActions } from '../actions/menuActions'
import { connect } from 'react-redux'
import { Loading } from '../components/Loading'
import { Route, Redirect } from 'react-router'

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
    const { categories } = this.props
    if (categories.requesting) 
      return (
        <div className="container"><Loading type="spin" color="lightblue"/></div>
      )

    return (
      <div className="container-fluid" style={{padding: '0 0 0 0'}}>
        <div className="body-container">
            <p className="establishment-name">Carvão e Lenha</p>
          <div className="carousel-container">
            <Slider {...settings}>
              {
                dayMedia.map((dayOffer) => (
                  <div>
                    <div className="carousel-container-header">
                      <h5 className="text-danger">NOVIDADE!</h5>
                      <h4> {dayOffer.name} </h4>
                      <p className="small"> {dayOffer.description} </p>
                    </div>
                    <img src={dayOffer.src} className="carousel-image"/>
                  </div>
                ))
              }  
            </Slider>
          </div>
            <div className="category-container">
              {categories.categories && categories.categories.map((category) => (
                <div 
                  className="category-item"
                  onClick={() => {this.props.history.push('/dashboard/category/?categoryId=' + category._id)} }
                >
                  {category.name}
                </div>
              ))}
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

export default connect(mapStateToProps)(Home)
