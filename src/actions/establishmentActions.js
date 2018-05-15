import { establishmentConstants } from '../constants/establishmentConstants';
import { establishmentService } from '../services/establishmentService';
import { alertActions } from './alertActions';
import { history } from '../helpers/history'

export const establishmentActions = {
  login,
  logout
}

function login(establishmentCode) {
    return dispatch => {
      dispatch(request(establishmentCode))
      establishmentService.login(establishmentCode)
        .then(
          response => {
            dispatch(success(response));
            history.push('/dashboard');
          },
          error => {
            console.log('error')
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
    function success(establishmentAccess) {
      return {
        type: establishmentConstants.LOGIN_SUCCESS,
        establishmentAccess
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
