import { adminConstants } from '../constants/adminConstants';
import { adminService } from '../services/adminService';
import { alertActions } from './alertActions';


export const adminActions = {
    getStations
  }

function getStations() {
  return dispatch => {
    dispatch(request());
    adminService.getStations()
      .then(
        response => {
          dispatch(success(response.stations));
        },
        error => {
          var message;
          if(error === 500) {
            message = 'Could not reach the server'
          }
          else {
            message = error
          }
          dispatch(failure(message))
          dispatch(alertActions.error(message));
        }
      )
  }
  function request() {
    return {
      type: adminConstants.GET_ALL_STATIONS_REQUEST,
      requesting: true
    }
  }
  function success(stations) {
    return {
      type: adminConstants.GET_ALL_STATIONS_SUCCESS,
      stations
    }
  }
  function failure(error) {
    return {
      type: adminConstants.GET_ALL_STATIONS_FAILURE,
      error
    }
  }
}
