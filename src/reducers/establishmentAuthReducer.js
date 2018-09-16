import { establishmentConstants } from '../constants/establishmentConstants';

let establishmentCode = localStorage.getItem('establishmentCode');
let initialState = {}
if (establishmentCode) {
  initialState = {
    loggedInDashboard: true,
    establishmentCode
  }
}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case establishmentConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        establishmentCode: action.establishmentCode
      };
    case establishmentConstants.LOGIN_SUCCESS:
      return {
        loggedInDashboard: true,
        establishmentCode: action.establishmentCode
      };
    case establishmentConstants.LOGIN_FAILURE:
      return {};
    case establishmentConstants.STAFF_LOGIN_REQUEST:
      return {
        loggingIn: true
      };
    case establishmentConstants.STAFF_LOGIN_SUCCESS:
      return {
        loggedIn: true,
        token: action.token
      }
    case establishmentConstants.STAFF_LOGIN_FAILURE:
      return {}
    case establishmentConstants.LOGOUT:
      return {};
    default:
      return state
  }
}
