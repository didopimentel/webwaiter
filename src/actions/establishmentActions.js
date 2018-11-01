import { establishmentConstants } from '../constants/establishmentConstants';
import { establishmentService } from '../services/establishmentService';
import { alertActions } from './alertActions';
import { history } from '../helpers/history'
import { add } from 'react-redux-permissions'

export const establishmentActions = {
  loginStaff,
  login,
  logout
}

function loginStaff(username, password) {
  return dispatch => {
    dispatch(request());
    establishmentService.loginStaff(username, password)
      .then(
        response => {
          dispatch(success(response.token, response.role));
          dispatch(add(response.role))
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          if (response.role == 'backofhouse') history.push('/staff/backofhouse');
          if (response.role == 'admin') history.push('/admin/');
          if (response.role == 'employee') history.push('/staff/dashboard');
        },
        error => {
          let message;
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
      type: establishmentConstants.STAFF_LOGIN_REQUEST,
    }
  }
  function success(token, role) {
    return {
      type: establishmentConstants.STAFF_LOGIN_SUCCESS,
      token
    }
  }
  function failure(error) {
    return {
      type: establishmentConstants.STAFF_LOGIN_FAILURE,
      error
    }
  }
}

function login(establishmentCode) {
    return dispatch => {
      dispatch(request(establishmentCode))
      establishmentService.login(establishmentCode)
        .then(
          response => {
            dispatch(success(response.code));
            history.push('/dashboard');
          },
          error => {
            dispatch(failure(error));
            dispatch(alertActions.error(error));
          }
        )
    }
    function request(establishmentCode) {
      return {
        type: establishmentConstants.LOGIN_REQUEST,
        establishmentCode
      }
    }
    function success(establishmentCode) {
      return {
        type: establishmentConstants.LOGIN_SUCCESS,
        establishmentCode
      }
    }
    function failure(error) {
      return {
        type: establishmentConstants.LOGIN_FAILURE,
        error
      }
    }

}

function logout() {
  establishmentService.logout()
  return {
    type: establishmentConstants.LOGOUT
  }
}
