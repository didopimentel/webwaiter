import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia  from '@material-ui/core/CardMedia'

const dayMedia = [
  {
    src: require('./images/dish1.jpg'),
    content: "This is an image!"
  },
  {
    src: require('./images/dish2.jpg'),
    content: "This is an image2!"
  },
  {
    src: require('./images/dish3.jpg'),
    content: "This is an image2!"
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


  nextMedia = () => {
    const index = (this.state.index === (dayMedia.length-1)) ? 0 : this.state.index + 1
    const media = {
      src: dayMedia[index].src,
      content: dayMedia[index].content
    }
    this.setState({
      media,
      index
    })
  }

  prevMedia = () => {
    const index = (this.state.index === 0) ? dayMedia.length-1 : this.state.index - 1
    const media = {
      src: dayMedia[index].src,
      content: dayMedia[index].content
    }
    this.setState({
      media,
      index
    })
  }

  render() {
    return (
      <div className="container pt-3">
        <div className="row">
          <div className="col-12">
            <div className="panel panel-info">
              <div className="panel-heading">
                Today:
              </div>
              <div className="panel-body">
                <Card>
                  <CardMedia
                    className="m-auto"
                    image={this.state.media.src}
                    style={{width:300, height:300}}
                  />
                  <div className="row pt-1">
                    <div className="col-12 text-center">
                      <span onClick={this.prevMedia} className="btn btn-info glyphicon glyphicon-menu-left" />
                      <span onClick={this.nextMedia} className="btn btn-info glyphicon glyphicon-menu-right" />
                    </div>
                  </div>
                  <CardContent>
                    { this.state.media.content }
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
