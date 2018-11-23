import { tableConstants } from '../constants/tableConstants';
import { establishmentService } from '../services/establishmentService';
import { alertActions } from './alertActions';
import { history } from '../helpers/history'

export const tableActions = {
  login,
  logout
}

function login(establishmentCode, table, bill_id) {
    return dispatch => {
      dispatch(request(table))
      establishmentService.loginTable(establishmentCode, table, bill_id)
        .then(
          response => {
            dispatch(success(response));
            history.push('/dashboard/menu');
          },
          error => {
            dispatch(failure(error));
            dispatch(alertActions.error(error));
          }
        )
    }
    function request(table) {
      return {
        type: tableConstants.LOGIN_REQUEST,
        table
      }
    }
    function success(token) {
      return {
        type: tableConstants.LOGIN_SUCCESS,
        token
      }
    }
    function failure(error) {
      return {
        type: tableConstants.LOGIN_FAILURE,
        error
      }
    }

}

function logout() {
  establishmentService.logout()
  return {
    type: tableConstants.LOGOUT
  }
}
