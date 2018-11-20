import { sessionInformationConstants } from '../constants/sessionInformationConstants'
import { sessionInformationService } from '../services/sessionInformationService'
import { alertActions } from './alertActions';

export const sessionInformationActions = {
  getBillNumber,
  getTableNumber
}

function getBillNumber() {
  return dispatch => {
    dispatch(request());
    sessionInformationService.getBillNumber()
      .then(
        response => {
          dispatch(success(response.billNumber));
        }, 
        error => {
          dispatch(failure(error))
        } )
  }
  function request() {
    return {
      type: sessionInformationConstants.GET_BILL_NUMBER_REQUEST,
    }
  }
  function success(billNumber) {
    return {
      type: sessionInformationConstants.GET_BILL_NUMBER_SUCCESS,
      billNumber
    }
  }
  function failure(error) {
    return {
      type: sessionInformationConstants.GET_BILL_NUMBER_FAILURE,
      error
    }
  }
}


function getTableNumber() {
  return dispatch => {
    dispatch(request());
    sessionInformationService.getTableNumber()
      .then(
        response => {
          dispatch(success(response.tableNumber));
        }, 
        error => {
          dispatch(failure(error))
        } )
  }
  function request() {
    return {
      type: sessionInformationConstants.GET_TABLE_NUMBER_REQUEST,
    }
  }
  function success(tableNumber) {
    return {
      type: sessionInformationConstants.GET_TABLE_NUMBER_SUCCESS,
      tableNumber
    }
  }
  function failure(error) {
    return {
      type: sessionInformationConstants.GET_TABLE_NUMBER_FAILURE,
      error
    }
  }
}
