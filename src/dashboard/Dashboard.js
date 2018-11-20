import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { tableActions } from '../actions/tableActions'
import { establishmentService } from '../services/establishmentService'
import '../styles/webwaiter-styles.css'
import Card from '@material-ui/core/Card'
import Description from '@material-ui/icons/Description'
import CardContent from '@material-ui/core/CardContent'
import Badge from '@material-ui/core/Badge';
import CardMedia  from '@material-ui/core/CardMedia'


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: '250px'
  },
  icon: {
    fontSize: 20
  }
});

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tableID: '',
      tableNumber: '',
      imageUrl: '',
      tableArray: [],
      index: 0
    }
  }


  nextMedia = () => {
    const { tableArray } = this.state
    const index = (this.state.index === (tableArray.length-1)) ? 0 : this.state.index + 1;
    this.setState({
      tableID: tableArray[index]._id,
      tableNumber: tableArray[index].number,
      index
    })
  }

  prevMedia = () => {
    const { tableArray } = this.state;
    const index = (this.state.index === 0) ? tableArray.length-1 : this.state.index - 1
    this.setState({
      tableID: tableArray[index]._id,
      tableNumber: tableArray[index].number,
      index
    })
  }

  handleTableID(e) {
    this.setState({
      tableID: e.target.value,
      imageUrl: ''
    })
  }

  componentDidMount() {
    const { tableAuthentication, authentication } = this.props
    if (tableAuthentication) {
      if (tableAuthentication.tableAccess)
      this.props.history.push('/dashboard/menu')
    }
    const code = authentication.establishmentCode.replace("\"", "").replace("\"", "");

    establishmentService.getImageUrl(code)
                        .then((url) => {
                          this.setState({
                            imageUrl: url,
                          })
                        })
    establishmentService.getEstablishmentTables(code)
                        .then((tables) => {
                          this.setState({
                            tableNumber: tables[0].number,
                            tableID: tables[0]._id,
                            tableArray: tables  
                          })
                        })

  }

  submitTable(e) {
    e.preventDefault()
    const { tableID } = this.state
    const { dispatch, authentication } = this.props
    if (tableID !== ''){
      dispatch(tableActions.login(authentication.establishmentCode, this.state.tableID))
    }
  }

  render(){
    const { classes } = this.props;
    const { imageUrl, tableArray } = this.state
    
    if (tableArray.length == 0) return <div></div>

    return(
      <div className="container">
        <div className="text-center">
          <img className="webwaiter-avatar" src={imageUrl} />
        </div>
        <div className="text-center">
          Escolha a mesa:
        </div>
        <div className="body-container">
          <Card style={{boxShadow:'none'}}>
            <CardMedia
              className="m-auto"
              image="https://png.icons8.com/ios/50/000000/restaurant-table.png"
              style={{width:50, height:50}}
            />
            <CardContent className="text-center">
              { this.state.tableNumber }
            </CardContent>
            <div className="row pt-1 pb-5">
              <div className="col-12 text-center">
                <span onClick={this.prevMedia} className="btn btn-info glyphicon glyphicon-menu-left" />
                <span onClick={this.nextMedia} className="btn btn-info glyphicon glyphicon-menu-right" />
              </div>
            </div>
          </Card>
          <div className="row">
            <div className="col-12">
              <Typography>
                Separar as contas?
              </Typography>
            </div>
            <div className="col-3">
              <Description className={classes.icon} />
            </div>
            <div className="col-8">
              
            </div>
          </div>
          <div className="webwaiter-footer webwaiter-vertical-container">
            <Button 
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={(e) => this.submitTable(e)}
            >
              Entrar
            </Button>
          </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  const { authentication, tableAuthentication }  = state;
  return {
    authentication,
    tableAuthentication
  }
}


export default connect(mapStateToProps)(withStyles(styles)(Dashboard))
